import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const HERO_IMG = "https://cdn.poehali.dev/files/cdb6ddb4-d05a-40bf-a80c-45fbe4ee4b8a.jpg";

const STATS = [
  { val: "2 500+", label: "ИЗВЕСТНЫХ ДОЛЬМЕНОВ", gold: false },
  { val: "5 000", label: "ЛЕТ ИСТОРИИ", gold: false },
  { val: "3", label: "АВТОРСКИХ МАРШРУТА", gold: false },
  { val: "IV–II", label: "ТЫС. ДО Н.Э.", gold: true },
];

const DOLMEN_TYPES = [
  {
    icon: "Square", name: "Плиточные",
    desc: "Самый распространённый тип на Западном Кавказе.",
    img: "https://cdn.poehali.dev/files/effdd49d-8b24-41e7-b5d1-f63ebfe01d12.jpg",
    detail: "Собраны из 5 каменных плит: пол, крыша и три стены. Передняя плита (портал) имеет круглое или овальное входное отверстие диаметром 30–50 см, которое закрывалось каменной пробкой-втулкой. Плиты подогнаны друг к другу в пазы без раствора — это обеспечивало конструкции устойчивость на тысячелетия. Вес крышевой плиты нередко превышает 5 тонн.",
  },
  {
    icon: "Circle", name: "Монолитные",
    desc: "Высечены целиком в скальном массиве. Редчайший вариант.",
    img: "https://cdn.poehali.dev/files/cdb6ddb4-d05a-40bf-a80c-45fbe4ee4b8a.jpg",
    detail: "Вырублены целиком в одном скальном выходе породы. Камера, стены и свод — единый монолит, в котором древние мастера выдолбили внутреннее пространство. На весь Западный Кавказ насчитывается лишь несколько подобных объектов. Свидетельствуют о высочайшем уровне камнеобработки Майкопской культуры.",
  },
  {
    icon: "Layers", name: "Составные",
    desc: "Стены сложены из нескольких блоков. Сложная инженерия без цемента.",
    img: "https://cdn.poehali.dev/files/46a14fc5-6b52-4dc0-85b7-92a5d9ef8012.jpg",
    detail: "Каждая стена составлена из двух и более каменных блоков, уложенных без связующего раствора. Горизонтальные швы пролегают строго по плоскостям, вертикальные — вразбежку. Составные дольмены характерны для районов, где отсутствовали крупные монолиты нужных размеров.",
  },
  {
    icon: "Droplets", name: "Корытообразные",
    desc: "Полость выдолблена в монолитном блоке. Верхняя плита — съёмная.",
    img: "https://cdn.poehali.dev/files/6e8251e2-3f4d-45bf-810a-a96c25bb9564.jpg",
    detail: "Основание и стены высечены из единого каменного блока в форме корыта. Верхняя плита — отдельная и съёмная, что отличает этот тип от монолитного. Входное отверстие либо отсутствует, либо пробито сбоку. Внутренние поверхности нередко тщательно отшлифованы.",
  },
];

const ANATOMY_ITEMS = [
  {
    icon: "LayoutGrid", name: "Плиты дольмена", desc: "Из каких частей состоит конструкция?",
    content: `Портальные плиты — передние плиты с входным отверстием. Часто имеют утолщение к середине (цилиндрическая линза) или утоньшение (в полумонолитах).\n\nФасадные плиты — лицевая часть дольмена, которая может быть украшена или иметь архитектурные детали.\n\nЗадние плиты — задняя стена камеры, которая вместе с боковыми плитами формирует внутреннее пространство.\n\nБоковые плиты — стены, поддерживающие конструкцию и отделяющие камеру от внешнего пространства. Плиты часто соединяются в паз, что обеспечивает прочность и минимизирует зазоры.\n\nПокрывные (верхние) плиты — крыша дольмена, перекрывающая камеру. Иногда их вес превышает вес остальных частей сооружения.`,
  },
  {
    icon: "Circle", name: "Входные отверстия", desc: "Форма, назначение и способ закрытия.",
    content: `Входные отверстия в дольменах могут иметь разную форму:\n\n• Круглые — наиболее распространённый вариант.\n• Овальные — чуть менее частый вариант.\n• Трапециевидные — встречаются реже.\n• Арочные или подтреугольные формы.\n\nОтверстия обычно закрывались каменными пробками (втулками) с расширяющимися шляпками, напоминающими гриб. В некоторых случаях дольмены бывают ложнопортальными — без входного отверстия спереди; в таком случае отверстие располагается сзади или сбоку.`,
  },
  {
    icon: "Box", name: "Камеры", desc: "Внутреннее пространство и его формы.",
    content: `Камеры дольменов могут быть:\n\n• Прямоугольными — наиболее распространённая форма.\n• Трапециевидными — встречаются реже.\n\nВнутренние поверхности плит часто выравнивались или шлифовались. В некоторых случаях камеры могли иметь дополнительные элементы — например, вырезанные каменные полусферы, выступающие из стен.`,
  },
  {
    icon: "Landmark", name: "Коридоры, кромлехи, рвы", desc: "Сопутствующие архитектурные элементы.",
    content: `Погребальные камеры — основное внутреннее пространство дольмена, где размещались захоронения. Могли быть простыми или более сложными.\n\nКоридоры (галереи) — в некоторых дольменах к камере вела входная галерея из стоящих плит. Иногда дольмен превращался в ряд продольных камер.\n\nКромлехи — кольцевые каменные ограды или ряды камней вокруг дольменов. Могли выполнять ритуальную или защитную функцию.\n\nРвы — вокруг дольменов или вблизи них могли рыть рвы с практическим (защита) или символическим значением.`,
  },
];

const GUIDE_ACCORDION = [
  {
    title: "Ключевые объекты",
    img: "https://cdn.poehali.dev/files/b49455d3-6098-4e4e-8437-595e539be8b8.jpg",
    imgs: [
      "https://cdn.poehali.dev/files/effdd49d-8b24-41e7-b5d1-f63ebfe01d12.jpg",
      "https://cdn.poehali.dev/files/6e8251e2-3f4d-45bf-810a-a96c25bb9564.jpg",
    ],
    points: [
      { name: "Волконский дольмен-монолит", desc: "Единственный монолитный дольмен Краснодарского края, высечен в скальном выходе. Лазаревский район." },
      { name: "Гузерипльский дольмен", desc: "Высота 2.5 м, один из крупнейших в регионе. Расположен в Майкопском районе Адыгеи." },
      { name: "Дольменное поле на р. Жане", desc: "Более 20 составных дольменов на небольшой площади. Геленджикский район." },
      { name: "Богатырская поляна", desc: "Более 400 сооружений — крупнейшее дольменное поле Адыгеи, окрестности Хаджоха." },
    ],
  },
  {
    title: "Исторический контекст",
    img: "https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/251d9bd8-0d3d-4a0d-8b14-12acd40b8775.jpg",
    imgs: [
      "https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/6711891e-d4bc-4f3c-99ad-7ee3f568900a.jpg",
      "https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/f40ad786-6f0b-4acf-8492-ed453905c790.jpg",
    ],
    points: [
      { name: "Майкопская культура", desc: "III тысячелетие до н.э. — создатели большинства дольменов Западного Кавказа. Высокий уровень металлообработки и строительства." },
      { name: "Связь с торговыми путями", desc: "Дольмены расположены вдоль древних перевальных троп, служивших прообразом Шёлкового пути." },
      { name: "Майкопский курган", desc: "Эталонный памятник эпохи ранней бронзы, раскопан в 1897 г. Хранится в Эрмитаже." },
      { name: "Программа охраны 1999 г.", desc: "Государственная программа сохранения мегалитов. Объекты включены в реестр культурного наследия РФ." },
    ],
  },
];

const ROUTES = [
  {
    num: "01", level: "НАЧИНАЮЩИЙ", icon: "Compass",
    name: "Душа Каменного Леса",
    location: "Хаджох (Каменномостский)",
    desc: "Идеальный первый маршрут. Лесная тропа, доступность для всей семьи, прямой контакт с 5000-летней историей.",
    points: ["Хаджох-1 «Одинокий Воин» — легенда о молнии", "Круглое отверстие-лаз диаметром 40 см", "Хаджох-3/4 — руинированные дольмены"],
  },
  {
    num: "02", level: "МИСТИЧЕСКИЙ", icon: "Sparkles",
    name: "Тайна Горного Духа",
    location: "Хамышки",
    desc: "Энергетические места силы. Для тех, кто ищет глубину — исторический, духовный и археологический опыт.",
    points: ["Корытообразный полумонолит", "Петроглифы: круги, спирали, линии", "Менгиры и кромлех", "Культ бога Тлепша (адыгская мифология)"],
  },
  {
    num: "03", level: "ЭКСПЕРТНЫЙ", icon: "Shield",
    name: "В Сердце Заповедника",
    location: "Гузерипль",
    desc: "Флагманский маршрут. Заповедная природа, масштаб мегалитической архитектуры и нетронутый горный ландшафт.",
    points: ["Гузерипльский дольмен — высота 2.5 м", "Самый крупный известный объект региона", "Территория Кавказского заповедника", "Панорамные виды на горный хребет"],
  },
];

const MAP_POINTS = [
  { id: "01", x: 30, y: 38, label: "Хаджох", route: "Маршрут №1 · Начинающий" },
  { id: "02", x: 52, y: 55, label: "Хамышки", route: "Маршрут №2 · Мистический" },
  { id: "03", x: 68, y: 34, label: "Гузерипль", route: "Маршрут №3 · Экспертный" },
];

const GALLERY = [
  { src: "https://cdn.poehali.dev/files/effdd49d-8b24-41e7-b5d1-f63ebfe01d12.jpg", location: "Хаджох, Адыгея" },
  { src: "https://cdn.poehali.dev/files/cdb6ddb4-d05a-40bf-a80c-45fbe4ee4b8a.jpg", location: "Жане, Геленджикский район" },
  { src: "https://cdn.poehali.dev/files/46a14fc5-6b52-4dc0-85b7-92a5d9ef8012.jpg", location: "Хамышки, Адыгея" },
  { src: "https://cdn.poehali.dev/files/6e8251e2-3f4d-45bf-810a-a96c25bb9564.jpg", location: "Богатырская поляна, Адыгея" },
  { src: "https://cdn.poehali.dev/files/b49455d3-6098-4e4e-8437-595e539be8b8.jpg", location: "Гузерипль, Адыгея" },
  { src: "https://cdn.poehali.dev/files/c8ae0d19-4fcd-4bf7-959d-dadf29eee996.jpg", location: "Лазаревский район, Краснодарский край" },
];

const ARTICLES = [
  { num: "01", author: "Дунаевская Е. А.", title: "Исследование перспектив развития цивилизационного туризма в Республике Адыгея и Краснодарском крае", href: "https://psv4.userapi.com/s/v1/d2/4Jq6XH3335vkYMbqUULPJth5XJ4w1smFJnfBy-XBlPKEDk8e9G9gE2waivJFHoYbmcddBkNUDgKzN2mu3l9TbRxJGTSs31WsVc2fikuEsaZn2V_BPcXEXtoa7S7x-mhdEfkltbJeScoD/elibrary_28845191_29093911.pdf?dl=1" },
  { num: "02", author: "Джанджугазова Е. А.", title: "Дольмены Западного Кавказа: загадки, мифы, легенды", href: "https://vk.com/doc832294119_697084350?hash=Z7SoVcUDz2RViOnRkEwH5CfZJxdybNzrrNX34yC5jUD&dl=wdhzzOemHc8H9XxYQPHlRy5c9xzqLTPkRVRfcz4nBdw&from_module=vkmsg_desktop" },
  { num: "03", author: "Дмитриев А. В.", title: "Дольмены. Заблуждения исследователей и выход из тупика (логический анализ выводов)", href: "https://vk.com/doc832294119_697084355?hash=st7pYQwImn9XJs2u1UzBn3AqZZd3b6zlul1J3X04AMc&dl=ZaJ3Yhh9RPL1Kju6DPZXjZyoYFv5V4Ga1Vh0ZCEU5ek&from_module=vkmsg_desktop" },
  { num: "04", author: "Трифонов В. А.", title: "Происхождение керамического комплекса «дольменной» культуры эпохи бронзы", href: "https://vk.com/doc832294119_697084357?hash=okvlRnV6gSTzQSDcTtn24trnXt6WKUPhcBIUewS3cgs&dl=9GEQi3klMEQeMvWMfvE4fZiWaYdBzkzDYsS79DnbdTL&from_module=vkmsg_desktop" },
];

// ─── Palette ──────────────────────────────────────────────────────────────────
const C = {
  bg: "#1a1208",
  bgDark: "#110d05",
  bgCard: "#221a09",
  bgCardHover: "#2c2210",
  gold: "#c8a84b",
  goldLight: "#d9bb63",
  goldDim: "rgba(200,168,75,0.18)",
  white: "#fdf8ef",
  w85: "rgba(253,248,239,0.85)",
  w65: "rgba(253,248,239,0.65)",
  w40: "rgba(253,248,239,0.40)",
  w12: "rgba(253,248,239,0.12)",
  border: "rgba(200,168,75,0.22)",
  borderLight: "rgba(253,248,239,0.08)",
  nav: "rgba(17,13,5,0.90)",
};

// ─── Shared styles ────────────────────────────────────────────────────────────
const label: React.CSSProperties = { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 };
const lline: React.CSSProperties = { width: 36, height: 1, background: C.gold };
const ltxt: React.CSSProperties = { color: C.gold, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500 };
const h2s: React.CSSProperties = { fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "clamp(2rem,4vw,3rem)", color: C.white, margin: 0, lineHeight: 1.1 };
const goldI: React.CSSProperties = { fontFamily: "'Cormorant', serif", fontWeight: 700, fontStyle: "italic", color: C.gold };
const card: React.CSSProperties = { background: C.bgCard, border: `1px solid ${C.border}`, padding: 28, transition: "background 0.3s, border-color 0.3s" };
const btn = (variant: "gold" | "outline"): React.CSSProperties => variant === "gold"
  ? { background: C.gold, color: C.bgDark, border: "none", padding: "14px 32px", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em", transition: "background 0.2s" }
  : { background: "transparent", color: C.white, border: `1.5px solid ${C.w40}`, padding: "14px 32px", fontSize: 14, cursor: "pointer", transition: "all 0.2s" };

// ─── RevealBlock wrapper ──────────────────────────────────────────────────────
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function Index() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [openAnatomy, setOpenAnatomy] = useState<number | null>(null);
  const [hoveredType, setHoveredType] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navLinks = ["О нас", "Справочник гида", "Маршруты", "Галерея", "Статьи"];
  const navIds =   ["o-nas", "spravochnik-gida", "marshruty", "galereya", "stati"];

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  }, []);

  return (
    <div style={{ fontFamily: "'Golos Text', sans-serif", background: C.bg, color: C.white, overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 56, background: C.nav, backdropFilter: "blur(14px)", borderBottom: `1px solid ${C.borderLight}` }}>
        <button onClick={() => scrollTo("hero")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ width: 32, height: 32, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: C.bgDark, fontSize: 13, fontWeight: 900 }}>◆</span>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: 16, color: C.white, letterSpacing: "0.12em", lineHeight: 1 }}>DOLMEN</div>
            <div style={{ fontSize: 9, color: C.gold, letterSpacing: "0.2em" }}>ADYGEA</div>
          </div>
        </button>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {navLinks.map((item, i) => (
            <button key={item} onClick={() => scrollTo(navIds[i])} style={{ background: "none", border: "none", color: C.w85, fontSize: 14, cursor: "pointer", letterSpacing: "0.01em", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
              onMouseLeave={e => (e.currentTarget.style.color = C.w85)}
            >{item}</button>
          ))}
          <button onClick={() => scrollTo("marshruty")} style={{ ...btn("outline"), border: `1.5px solid ${C.gold}`, color: C.gold, padding: "7px 18px", fontSize: 13 }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.gold; (e.currentTarget as HTMLButtonElement).style.color = C.bgDark; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = C.gold; }}
          >Выбрать маршрут</button>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setMobileMenu(m => !m)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: C.gold }} className="hide-mobile" aria-label="Меню">
          <Icon name={mobileMenu ? "X" : "Menu"} size={24} />
        </button>
        <button onClick={() => setMobileMenu(m => !m)} style={{ background: "none", border: "none", cursor: "pointer", color: C.gold, padding: 4 }} aria-label="Меню">
          <Icon name={mobileMenu ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenu && (
        <div style={{ position: "fixed", top: 56, left: 0, right: 0, zIndex: 99, background: C.bgDark, borderBottom: `1px solid ${C.border}`, padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map((item, i) => (
            <button key={item} onClick={() => scrollTo(navIds[i])} style={{ background: "none", border: "none", color: C.w85, fontSize: 16, cursor: "pointer", padding: "12px 0", textAlign: "left", borderBottom: `1px solid ${C.borderLight}` }}>{item}</button>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={HERO_IMG} alt="Дольмен Адыгеи" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, rgba(17,13,5,0.45) 0%, rgba(17,13,5,0.25) 35%, rgba(17,13,5,0.72) 70%, rgba(17,13,5,0.96) 100%)` }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "80px 5vw 90px" }}>
          <div className="reveal visible" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div style={lline} /><span style={ltxt}>Цивилизационный туризм · Адыгея</span>
          </div>
          <h1 className="reveal visible delay-1" style={{ margin: "0 0 16px", lineHeight: 1.0 }}>
            <span style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "clamp(3.5rem,8vw,7rem)", color: C.white, display: "block" }}>Культура</span>
            <span style={{ ...goldI, fontSize: "clamp(3.5rem,8vw,7rem)", display: "block" }}>дольменов</span>
          </h1>
          <p className="reveal visible delay-2" style={{ color: C.white, fontSize: "clamp(15px,2vw,18px)", fontWeight: 500, margin: "0 0 8px" }}>Дольмены Адыгеи</p>
          <p className="reveal visible delay-2" style={{ color: C.w65, fontSize: "clamp(13px,1.5vw,15px)", fontStyle: "italic", maxWidth: 480, lineHeight: 1.65, margin: "0 0 36px" }}>
            «Мегалитические памятники — такая же тайна планеты, как пирамиды или Стоунхендж»
          </p>
          <div className="reveal visible delay-3" style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
            <button style={btn("gold")} onMouseEnter={e => (e.currentTarget.style.background = C.goldLight)} onMouseLeave={e => (e.currentTarget.style.background = C.gold)} onClick={() => scrollTo("marshruty")}>Выбрать маршрут</button>
            <button style={{ ...btn("outline"), borderLeft: "none" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.gold; (e.currentTarget as HTMLButtonElement).style.color = C.gold; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.w40; (e.currentTarget as HTMLButtonElement).style.color = C.white; }}
              onClick={() => scrollTo("o-nas")}>Узнать историю</button>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ position: "relative", zIndex: 10, display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: `1px solid ${C.borderLight}`, background: "rgba(17,13,5,0.82)", backdropFilter: "blur(10px)" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: "22px clamp(16px,4vw,44px)", borderRight: i < 3 ? `1px solid ${C.borderLight}` : "none" }}>
              <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.5rem)", color: s.gold ? C.gold : C.white, marginBottom: 4 }}>{s.val}</div>
              <div style={{ color: C.w40, fontSize: "clamp(9px,1vw,11px)", letterSpacing: "0.13em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── О НАС ── */}
      <section id="o-nas" style={{ background: C.bg, padding: "clamp(60px,8vw,100px) 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(32px,6vw,80px)", alignItems: "center" }}>
          <div>
            <Reveal><div style={label}><div style={lline}/><span style={ltxt}>Наследие дольменной цивилизации</span></div></Reveal>
            <Reveal delay={0.1}>
              <h2 style={{ ...h2s, marginBottom: 24 }}>Тайна, которой<br /><span style={goldI}>пять тысяч лет</span></h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ color: C.w85, fontSize: "clamp(14px,1.5vw,15px)", lineHeight: 1.8, marginBottom: 18 }}>
                Дольмены Западного Кавказа — мегалитические сооружения IV–II тысячелетия до н.э. На территории от Таманского полуострова до Абхазии обнаружено более 2500 объектов, значительная часть которых сосредоточена в Адыгее.
              </p>
              <p style={{ color: C.w85, fontSize: "clamp(14px,1.5vw,15px)", lineHeight: 1.8, marginBottom: 18 }}>
                Эти монументальные постройки возводила Майкопская культура, связанная торговыми путями с Месопотамией и ранними ближневосточными цивилизациями. Дольменные поля стоят рядом с Великим шёлковым путём — перекрёстком цивилизаций.
              </p>
              <p style={{ color: C.w85, fontSize: "clamp(14px,1.5vw,15px)", lineHeight: 1.8 }}>
                Богатырская поляна близ Даховской насчитывает более 400 дольменов — одна из крупнейших концентраций мегалитов в мире.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="reveal-fade">
            <div style={{ position: "relative" }}>
              <img src="https://cdn.poehali.dev/files/b49455d3-6098-4e4e-8437-595e539be8b8.jpg" alt="Дольмен"
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "58%", background: "rgba(17,13,5,0.94)", border: `1px solid ${C.border}`, padding: "18px 20px" }}>
                <p style={{ color: C.w65, fontSize: 13, fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>
                  «Такая же тайна планеты, как пирамиды или Стоунхендж»
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── СПРАВОЧНИК ГИДА ── */}
      <section id="spravochnik-gida" style={{ background: C.bgDark, padding: "clamp(60px,8vw,100px) 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ ...label, justifyContent: "center", marginBottom: 36 }}>
              <div style={lline}/><span style={ltxt}>Справочник гида</span><div style={lline}/>
            </div>
            <h2 style={{ ...h2s, textAlign: "center", marginBottom: 52 }}>Типология дольменов</h2>
          </Reveal>

          {/* Типы — hover-расширение */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${DOLMEN_TYPES.length},1fr)`, gap: 2, marginBottom: 72, alignItems: "start", transition: "all 0.4s ease" }}>
            {DOLMEN_TYPES.map((t, i) => {
              const isHov = hoveredType === i;
              return (
                <div key={t.name}
                  onMouseEnter={() => setHoveredType(i)}
                  onMouseLeave={() => setHoveredType(null)}
                  style={{
                    ...card,
                    background: isHov ? C.bgCardHover : C.bgCard,
                    borderColor: isHov ? C.gold : C.border,
                    gridColumn: isHov ? "span 2" : "span 1",
                    transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                    overflow: "hidden",
                  }}>
                  {isHov ? (
                    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                      <img src={t.img} alt={t.name} style={{ width: "clamp(120px,14vw,180px)", flexShrink: 0, aspectRatio: "3/4", objectFit: "cover" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ width: 38, height: 38, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                          <Icon name={t.icon} size={16} style={{ color: C.gold }} />
                        </div>
                        <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "clamp(18px,2vw,22px)", color: C.white, marginBottom: 10 }}>{t.name}</div>
                        <div style={{ color: C.w65, fontSize: "clamp(12px,1.2vw,14px)", lineHeight: 1.75 }}>{t.detail}</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ width: 42, height: 42, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                        <Icon name={t.icon} size={18} style={{ color: C.gold }} />
                      </div>
                      <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: 20, color: C.white, marginBottom: 10 }}>{t.name}</div>
                      <div style={{ color: C.w65, fontSize: 13, lineHeight: 1.65 }}>{t.desc}</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Анатомия */}
          <Reveal>
            <div style={label}><div style={lline}/><span style={ltxt}>Анатомия сооружений</span></div>
            <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(1.3rem,2.5vw,1.9rem)", color: C.white, fontWeight: 400, margin: "0 0 28px" }}>
              Как мы можем определить, что перед нами дольмен?
            </h3>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 2 }}>
            {ANATOMY_ITEMS.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{ ...card, cursor: "pointer", borderColor: openAnatomy === i ? C.gold : C.border, background: openAnatomy === i ? C.bgCardHover : C.bgCard }}
                  onMouseEnter={e => (e.currentTarget.style.background = C.bgCardHover)}
                  onMouseLeave={e => (e.currentTarget.style.background = openAnatomy === i ? C.bgCardHover : C.bgCard)}
                  onClick={() => setOpenAnatomy(openAnatomy === i ? null : i)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 38, height: 38, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon name={item.icon} size={16} style={{ color: C.gold }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: 18, color: C.white }}>{item.name}</div>
                      <div style={{ color: C.w40, fontSize: 12, marginTop: 2 }}>{item.desc}</div>
                    </div>
                    <Icon name={openAnatomy === i ? "ChevronUp" : "ChevronDown"} size={16} style={{ color: C.gold, flexShrink: 0 }} />
                  </div>
                  {openAnatomy === i && (
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.borderLight}` }}>
                      {item.content.split("\n\n").map((para, pi) => (
                        <p key={pi} style={{ color: C.w65, fontSize: 13, lineHeight: 1.8, margin: "0 0 10px", whiteSpace: "pre-line" }}>{para}</p>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Ключевые объекты / Исторический контекст */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 2 }}>
            {GUIDE_ACCORDION.map((item, i) => {
              const isOpen = openAccordion === i;
              return (
                <Reveal key={i} delay={i * 0.1}>
                  <div style={{ ...card, cursor: "pointer", borderColor: isOpen ? C.gold : C.border, background: isOpen ? C.bgCardHover : C.bgCard }}
                    onClick={() => setOpenAccordion(isOpen ? null : i)}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "clamp(18px,2vw,22px)", color: C.white }}>{item.title}</span>
                      <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={18} style={{ color: C.gold }} />
                    </div>
                    {isOpen && (
                      <div style={{ marginTop: 22 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 8, marginBottom: 24 }}>
                          {[item.img, ...item.imgs].map((src, j) => (
                            <img key={j} src={src} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
                          ))}
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 2 }}>
                          {item.points.map((pt, pi) => (
                            <div key={pi} style={{ padding: "16px 18px", background: "rgba(253,248,239,0.03)", borderLeft: `2px solid ${C.gold}` }}>
                              <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: 16, color: C.white, marginBottom: 6 }}>{pt.name}</div>
                              <div style={{ color: C.w65, fontSize: 13, lineHeight: 1.65 }}>{pt.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── МАРШРУТЫ ── */}
      <section id="marshruty" style={{ background: C.bg, padding: "clamp(60px,8vw,100px) 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><div style={label}><div style={lline}/><span style={ltxt}>Авторские маршруты</span></div></Reveal>
          <Reveal delay={0.1}><h2 style={{ ...h2s, marginBottom: 48 }}>Три пути к мегалитам</h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 2 }}>
            {ROUTES.map((r, i) => (
              <Reveal key={r.num} delay={i * 0.1}>
                <div style={{ ...card, display: "flex", flexDirection: "column", height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
                    <span style={{ fontFamily: "'Cormorant', serif", fontSize: 48, fontWeight: 700, color: C.goldDim, lineHeight: 1 }}>{r.num}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.border}`, padding: "5px 10px" }}>
                      <Icon name={r.icon} size={11} style={{ color: C.gold }} />
                      <span style={{ color: C.gold, fontSize: 10, letterSpacing: "0.15em" }}>{r.level}</span>
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "clamp(18px,2vw,22px)", color: C.white, marginBottom: 8 }}>{r.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: C.w40, fontSize: 13, marginBottom: 14 }}>
                    <Icon name="MapPin" size={12} style={{ color: C.gold }} />{r.location}
                  </div>
                  <p style={{ color: C.w65, fontSize: 13, lineHeight: 1.75, marginBottom: 18, flex: 1 }}>{r.desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
                    {r.points.map((pt, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8, color: C.w65, fontSize: 13, lineHeight: 1.5 }}>
                        <span style={{ color: C.gold, fontSize: 9, marginTop: 5, flexShrink: 0 }}>◆</span>{pt}
                      </li>
                    ))}
                  </ul>
                  <button style={btn("gold")} onMouseEnter={e => (e.currentTarget.style.background = C.goldLight)} onMouseLeave={e => (e.currentTarget.style.background = C.gold)}>
                    Записаться на маршрут
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── КАРТА ── */}
      <section style={{ background: C.bgDark, padding: "clamp(60px,8vw,100px) 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(32px,5vw,80px)", alignItems: "center" }}>
          <div>
            <Reveal><div style={label}><div style={lline}/><span style={ltxt}>Ареал мегалитов</span></div></Reveal>
            <Reveal delay={0.1}><h2 style={{ ...h2s, marginBottom: 8 }}>Карта<br /><span style={goldI}>дольменных полей</span></h2></Reveal>
            <Reveal delay={0.2}>
              <p style={{ color: C.w65, fontSize: 14, lineHeight: 1.75, margin: "22px 0 36px" }}>
                Ареал распространения мегалитов охватывает побережье от Таманского полуострова до Абхазии. Наибольшая концентрация — в горных долинах Адыгеи и районе Новороссийска.
              </p>
              {MAP_POINTS.map((pt, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                  <div style={{ width: 34, height: 34, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name="MapPin" size={14} style={{ color: C.gold }} />
                  </div>
                  <div>
                    <div style={{ color: C.white, fontSize: 14, fontWeight: 500 }}>{pt.label}</div>
                    <div style={{ color: C.w40, fontSize: 12, marginTop: 2 }}>{pt.route}</div>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
          <Reveal delay={0.15} className="reveal-fade">
            <div style={{ position: "relative" }}>
              <img src="https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/6711891e-d4bc-4f3c-99ad-7ee3f568900a.jpg"
                alt="Карта" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(17,13,5,0.28)" }} />
              {MAP_POINTS.map((pt) => (
                <div key={pt.id} style={{ position: "absolute", left: `${pt.x}%`, top: `${pt.y}%`, transform: "translate(-50%,-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 28, height: 28, background: C.gold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: C.bgDark, boxShadow: `0 0 0 3px rgba(200,168,75,0.25)` }}>{pt.id}</div>
                  <div style={{ background: "rgba(17,13,5,0.9)", border: `1px solid ${C.border}`, padding: "2px 7px", fontSize: 10, color: C.white, whiteSpace: "nowrap" }}>{pt.label}</div>
                </div>
              ))}
              <div style={{ position: "absolute", bottom: 10, right: 14, color: C.gold, fontSize: 9, letterSpacing: "0.18em" }}>ЗАПАДНЫЙ КАВКАЗ · АДЫГЕЯ</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ГАЛЕРЕЯ ── */}
      <section id="galereya" style={{ background: C.bg, padding: "clamp(60px,8vw,100px) 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><div style={label}><div style={lline}/><span style={ltxt}>Галерея</span></div></Reveal>
          <Reveal delay={0.1}><h2 style={{ ...h2s, marginBottom: 40 }}>Облик мегалитов</h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 4 }}>
            {GALLERY.map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
                  onMouseEnter={e => {
                    (e.currentTarget.querySelector("img") as HTMLImageElement).style.transform = "scale(1.07)";
                    (e.currentTarget.querySelector(".goverlay") as HTMLElement).style.opacity = "1";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget.querySelector("img") as HTMLImageElement).style.transform = "scale(1)";
                    (e.currentTarget.querySelector(".goverlay") as HTMLElement).style.opacity = "0";
                  }}>
                  <img src={item.src} alt={item.location} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)" }} />
                  <div className="goverlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(17,13,5,0.85) 0%, transparent 55%)", opacity: 0, transition: "opacity 0.35s", display: "flex", alignItems: "flex-end", padding: "18px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Icon name="MapPin" size={13} style={{ color: C.gold }} />
                      <span style={{ color: C.white, fontSize: 13, fontWeight: 500 }}>{item.location}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── БЕРЕЖНЫЙ ТУРИЗМ ── */}
      <section style={{ background: C.bgDark, padding: "clamp(50px,6vw,80px) 5vw" }}>
        <Reveal>
          <div style={{ maxWidth: 800, margin: "0 auto", border: `1px solid ${C.border}`, padding: "clamp(32px,5vw,60px) clamp(24px,5vw,48px)", textAlign: "center" }}>
            <Icon name="Shield" size={38} style={{ color: C.gold, marginBottom: 22 }} />
            <h2 style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)", color: C.white, marginBottom: 22 }}>Бережный туризм</h2>
            <p style={{ color: C.w65, fontSize: "clamp(13px,1.5vw,15px)", lineHeight: 1.8, marginBottom: 14 }}>
              Дольмены Адыгеи — объекты культурного и исторического наследия под защитой государства. С 1999 года действует программа «Сохранение древних мегалитических сооружений». Потенциал региона как туристического направления реализован лишь частично — это наша ответственность.
            </p>
            <p style={{ color: C.w40, fontSize: "clamp(12px,1.3vw,14px)", lineHeight: 1.75 }}>
              Все объекты посещаются только по установленным тропам. Запрещены любые физические воздействия на камень.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── БИБЛИОТЕКА ── */}
      <section id="stati" style={{ background: C.bg, padding: "clamp(60px,8vw,100px) 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal><div style={label}><div style={lline}/><span style={ltxt}>Статьи</span></div></Reveal>
          <Reveal delay={0.1}><h2 style={{ ...h2s, marginBottom: 12 }}>Библиотека дольменов</h2></Reveal>
          <Reveal delay={0.15}><p style={{ color: C.w65, fontSize: 15, lineHeight: 1.7, marginBottom: 44, maxWidth: 560 }}>Здесь вы можете ознакомиться с интересными статьями об истории, исследованиях и загадках мегалитической культуры Западного Кавказа.</p></Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {ARTICLES.map((a, i) => (
              <Reveal key={a.num} delay={i * 0.08}>
                <a href={a.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <div style={{ ...card, display: "flex", alignItems: "center", gap: "clamp(14px,3vw,28px)", transition: "background 0.2s, border-color 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = C.bgCardHover; (e.currentTarget as HTMLDivElement).style.borderColor = C.gold; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = C.bgCard; (e.currentTarget as HTMLDivElement).style.borderColor = C.border; }}>
                    <span style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(24px,4vw,38px)", fontWeight: 700, color: C.goldDim, lineHeight: 1, flexShrink: 0, width: "2.4em" }}>{a.num}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: C.gold, fontSize: 12, letterSpacing: "0.1em", marginBottom: 6, fontWeight: 500 }}>{a.author}</div>
                      <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 600, fontSize: "clamp(15px,2vw,19px)", color: C.white, lineHeight: 1.4 }}>{a.title}</div>
                    </div>
                    <Icon name="ExternalLink" size={16} style={{ color: C.gold, flexShrink: 0, opacity: 0.7 }} />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.bgDark, borderTop: `1px solid ${C.borderLight}`, padding: "28px 5vw" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: C.bgDark, fontSize: 11, fontWeight: 900 }}>◆</span>
            </div>
            <div>
              <span style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: 14, color: C.white, letterSpacing: "0.1em" }}>DOLMEN ADYGEA</span>
              <span style={{ color: C.w40, fontSize: 12, marginLeft: 10 }}>Цивилизационный туризм</span>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(16px,3vw,32px)" }}>
            {["О НАС", "МАРШРУТЫ", "ГАЛЕРЕЯ", "КОНТАКТЫ"].map((l, i) => (
              <button key={l} onClick={() => scrollTo(["o-nas", "marshruty", "galereya", "stati"][i])}
                style={{ background: "none", border: "none", color: C.w40, fontSize: 11, letterSpacing: "0.12em", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                onMouseLeave={e => (e.currentTarget.style.color = C.w40)}>{l}</button>
            ))}
          </div>
          <div style={{ color: C.w40, fontSize: 11 }}>Все объекты — культурное наследие РФ</div>
        </div>
      </footer>
    </div>
  );
}

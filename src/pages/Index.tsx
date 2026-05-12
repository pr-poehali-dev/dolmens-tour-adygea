import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["О нас", "Справочник гида", "Маршруты", "Галерея", "Статьи"];

const STATS = [
  { val: "2 500+", label: "ИЗВЕСТНЫХ ДОЛЬМЕНОВ", gold: false },
  { val: "5 000", label: "ЛЕТ ИСТОРИИ", gold: false },
  { val: "3", label: "АВТОРСКИХ МАРШРУТА", gold: false },
  { val: "IV–II", label: "ТЫС. ДО Н.Э.", gold: true },
];

const DOLMEN_TYPES = [
  { icon: "Square", name: "Плиточные", desc: "Наиболее распространённый тип на Западном Кавказе." },
  { icon: "Circle", name: "Монолитные", desc: "Высечены целиком в скальном массиве. Редчайший вариант." },
  { icon: "Layers", name: "Составные", desc: "Стены сложены из нескольких блоков. Сложная инженерия без цемента." },
  { icon: "Droplets", name: "Корытообразные", desc: "Полость выдолблена в монолитном блоке. Верхняя плита — съёмная." },
];

const ANATOMY_ITEMS = [
  { icon: "LayoutGrid", name: "Плиты дольмена", desc: "Из каких частей состоит конструкция?" },
  { icon: "Circle", name: "Входные отверстия", desc: "Форма, назначение и способ закрытия." },
  { icon: "Box", name: "Камеры", desc: "Внутреннее пространство и его формы." },
  { icon: "Landmark", name: "Коридоры, кромлехи, рвы", desc: "Сопутствующие архитектурные элементы." },
];

const GUIDE_ACCORDION = [
  { title: "Ключевые объекты", content: "Хаджох-1 «Одинокий Воин», Волконский дольмен, Гузерипльский дольмен высотой 2.5 м, дольмены урочища Жане, Богатырская поляна у Даховской — более 400 объектов." },
  { title: "Исторический контекст", content: "Майкопская культура IV–II тыс. до н.э. Связь с Месопотамией, ранними ближневосточными цивилизациями. Дольменные поля вдоль Великого шёлкового пути — перекрёстка цивилизаций." },
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

const GALLERY_IMGS = [
  "https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/8bb62647-2913-4144-b4a0-4a71cfc12e79.jpg",
  "https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/6711891e-d4bc-4f3c-99ad-7ee3f568900a.jpg",
  "https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/f40ad786-6f0b-4acf-8492-ed453905c790.jpg",
  "https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/8bb62647-2913-4144-b4a0-4a71cfc12e79.jpg",
  "https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/6711891e-d4bc-4f3c-99ad-7ee3f568900a.jpg",
  "https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/f40ad786-6f0b-4acf-8492-ed453905c790.jpg",
];

// ─── Palette ─────────────────────────────────────────────────────────────────
const C = {
  bg: "#0d1f14",
  bgDark: "#091410",
  bgCard: "#132218",
  bgCardHover: "#17291e",
  gold: "#c8a84b",
  goldLight: "#d4b55a",
  white: "#ffffff",
  whiteAlpha85: "rgba(255,255,255,0.85)",
  whiteAlpha60: "rgba(255,255,255,0.6)",
  whiteAlpha40: "rgba(255,255,255,0.4)",
  whiteAlpha10: "rgba(255,255,255,0.1)",
  whiteAlpha06: "rgba(255,255,255,0.06)",
  border: "rgba(200,168,75,0.2)",
  borderLight: "rgba(255,255,255,0.08)",
};

// ─── Shared styles ────────────────────────────────────────────────────────────
const sectionLabel: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px",
};
const labelLine: React.CSSProperties = {
  width: "36px", height: "1px", background: C.gold,
};
const labelText: React.CSSProperties = {
  color: C.gold, fontSize: "11px", letterSpacing: "0.22em",
  textTransform: "uppercase", fontWeight: 500,
};
const sectionTitle: React.CSSProperties = {
  fontFamily: "'Cormorant', serif", fontWeight: 700,
  fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: C.white,
  margin: 0, lineHeight: 1.1,
};
const goldItalic: React.CSSProperties = {
  fontFamily: "'Cormorant', serif", fontWeight: 700,
  fontStyle: "italic", color: C.gold,
};
const cardBase: React.CSSProperties = {
  background: C.bgCard, border: `1px solid ${C.border}`,
  padding: "28px", transition: "background 0.2s",
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function Index() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [openAnatomy, setOpenAnatomy] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "'Golos Text', sans-serif", background: C.bg, color: C.white, overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: "56px",
        background: "rgba(9,20,16,0.88)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.borderLight}`,
      }}>
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: "34px", height: "34px", background: C.gold,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ color: C.bgDark, fontSize: "14px", fontWeight: 900 }}>◆</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "16px", color: C.white, letterSpacing: "0.12em", lineHeight: 1 }}>DOLMEN</div>
            <div style={{ fontSize: "9px", color: C.gold, letterSpacing: "0.2em", lineHeight: 1.2 }}>ADYGEA</div>
          </div>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {NAV_LINKS.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} style={{
              color: C.whiteAlpha85, fontSize: "14px", textDecoration: "none",
              letterSpacing: "0.01em", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
              onMouseLeave={e => (e.currentTarget.style.color = C.whiteAlpha85)}
            >{item}</a>
          ))}
          <button style={{
            background: "transparent", border: `2px solid ${C.gold}`,
            color: C.gold, padding: "7px 20px", fontSize: "13px",
            fontWeight: 600, cursor: "pointer", letterSpacing: "0.04em", transition: "all 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = C.gold; (e.currentTarget as HTMLButtonElement).style.color = C.bgDark; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = C.gold; }}
          >Выбрать маршрут</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/8bb62647-2913-4144-b4a0-4a71cfc12e79.jpg"
            alt="Дольмен" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(5,18,8,0.4) 0%, rgba(5,18,8,0.25) 35%, rgba(5,18,8,0.7) 70%, rgba(5,18,8,0.95) 100%)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 48px 100px" }}>
          <div style={sectionLabel}>
            <div style={labelLine} />
            <span style={labelText}>Цивилизационный туризм · Адыгея</span>
          </div>
          <h1 style={{ margin: "0 0 16px", lineHeight: 1.0 }}>
            <span style={{ ...sectionTitle, fontSize: "clamp(4rem, 8vw, 7rem)", display: "block" }}>Культура</span>
            <span style={{ ...goldItalic, fontSize: "clamp(4rem, 8vw, 7rem)", display: "block" }}>дольменов</span>
          </h1>
          <p style={{ color: C.white, fontSize: "17px", fontWeight: 500, margin: "0 0 8px" }}>Дольмены Адыгеи</p>
          <p style={{ color: C.whiteAlpha60, fontSize: "14px", fontStyle: "italic", maxWidth: "460px", lineHeight: 1.65, margin: "0 0 40px" }}>
            «Мегалитические памятники — такая же тайна планеты, как пирамиды или Стоунхендж»
          </p>
          <div style={{ display: "flex" }}>
            <button style={{ background: C.gold, color: C.bgDark, border: "none", padding: "16px 32px", fontSize: "15px", fontWeight: 700, cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = C.goldLight)}
              onMouseLeave={e => (e.currentTarget.style.background = C.gold)}>Выбрать маршрут</button>
            <button style={{ background: "transparent", color: C.white, border: `2px solid ${C.whiteAlpha40}`, borderLeft: "none", padding: "16px 32px", fontSize: "15px", fontWeight: 400, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.gold; (e.currentTarget as HTMLButtonElement).style.color = C.gold; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.whiteAlpha40; (e.currentTarget as HTMLButtonElement).style.color = C.white; }}>Узнать историю</button>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ position: "relative", zIndex: 10, display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: `1px solid ${C.borderLight}`, background: "rgba(5,15,8,0.75)", backdropFilter: "blur(8px)" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: "26px 44px", borderRight: i < 3 ? `1px solid ${C.borderLight}` : "none" }}>
              <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: s.gold ? C.gold : C.white, marginBottom: "5px" }}>{s.val}</div>
              <div style={{ color: C.whiteAlpha40, fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── О НАС — Тайна, которой пять тысяч лет ── */}
      <section id="о-нас" style={{ background: C.bg, padding: "100px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          <div>
            <div style={sectionLabel}>
              <div style={labelLine} />
              <span style={labelText}>Наследие дольменной цивилизации</span>
            </div>
            <h2 style={{ ...sectionTitle, marginBottom: "24px" }}>
              Тайна, которой<br /><span style={goldItalic}>пять тысяч лет</span>
            </h2>
            <p style={{ color: C.whiteAlpha85, fontSize: "15px", lineHeight: 1.75, marginBottom: "20px" }}>
              Дольмены Западного Кавказа — мегалитические сооружения IV–II тысячелетия до н.э. На территории от Таманского полуострова до Абхазии обнаружено более 2500 объектов, значительная часть которых сосредоточена в Адыгее.
            </p>
            <p style={{ color: C.whiteAlpha85, fontSize: "15px", lineHeight: 1.75, marginBottom: "20px" }}>
              Эти монументальные постройки возводила Майкопская культура, связанная торговыми путями с Месопотамией и ранними ближневосточными цивилизациями. Дольменные поля стоят рядом с Великим шёлковым путём — перекрёстком цивилизаций.
            </p>
            <p style={{ color: C.whiteAlpha85, fontSize: "15px", lineHeight: 1.75 }}>
              Богатырская поляна близ Даховской насчитывает более 400 дольменов — одна из крупнейших концентраций мегалитов в мире.
            </p>
          </div>

          <div>
            <div style={{ position: "relative" }}>
              <img src="https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/6711891e-d4bc-4f3c-99ad-7ee3f568900a.jpg"
                alt="Горный пейзаж"
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0,
                width: "calc(60% - 16px)", background: "rgba(13,31,20,0.93)",
                border: `1px solid ${C.border}`, padding: "20px 22px",
                transform: "translateY(0)",
              }}>
                <p style={{ color: C.whiteAlpha60, fontSize: "14px", fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>
                  «Такая же тайна планеты, как пирамиды или Стоунхендж»
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── СПРАВОЧНИК ГИДА — Типология ── */}
      <section id="справочник-гида" style={{ background: C.bgDark, padding: "80px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ ...sectionLabel, justifyContent: "center", marginBottom: "40px" }}>
            <div style={labelLine} />
            <span style={labelText}>Справочник гида</span>
            <div style={labelLine} />
          </div>
          <h2 style={{ ...sectionTitle, textAlign: "center", marginBottom: "56px" }}>Типология дольменов</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2px", marginBottom: "80px" }}>
            {DOLMEN_TYPES.map((t) => (
              <div key={t.name} style={{ ...cardBase, cursor: "default" }}
                onMouseEnter={e => (e.currentTarget.style.background = C.bgCardHover)}
                onMouseLeave={e => (e.currentTarget.style.background = C.bgCard)}>
                <div style={{ width: "44px", height: "44px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <Icon name={t.icon} size={20} style={{ color: C.gold }} />
                </div>
                <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "22px", color: C.white, marginBottom: "12px" }}>{t.name}</div>
                <div style={{ color: C.whiteAlpha60, fontSize: "14px", lineHeight: 1.65 }}>{t.desc}</div>
              </div>
            ))}
          </div>

          {/* Anatomy */}
          <div style={sectionLabel}>
            <div style={labelLine} />
            <span style={labelText}>Анатомия сооружений</span>
          </div>
          <h3 style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(1.4rem,2.5vw,2rem)", color: C.white, fontWeight: 400, margin: "0 0 32px" }}>
            Как мы можем определить, что перед нами дольмен?
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
            {ANATOMY_ITEMS.map((item, i) => (
              <div key={i} style={{
                ...cardBase, cursor: "pointer",
                borderBottom: openAnatomy === i ? `1px solid ${C.gold}` : `1px solid ${C.border}`,
              }}
                onMouseEnter={e => (e.currentTarget.style.background = C.bgCardHover)}
                onMouseLeave={e => (e.currentTarget.style.background = C.bgCard)}
                onClick={() => setOpenAnatomy(openAnatomy === i ? null : i)}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "40px", height: "40px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={item.icon} size={18} style={{ color: C.gold }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "18px", color: C.white }}>{item.name}</div>
                    <div style={{ color: C.whiteAlpha40, fontSize: "13px", marginTop: "2px" }}>{item.desc}</div>
                  </div>
                  <Icon name={openAnatomy === i ? "ChevronUp" : "ChevronDown"} size={18} style={{ color: C.gold, flexShrink: 0 }} />
                </div>
                {openAnatomy === i && (
                  <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: `1px solid ${C.borderLight}`, color: C.whiteAlpha60, fontSize: "14px", lineHeight: 1.7 }}>
                    Подробная информация об этом элементе архитектуры дольменов. Исследователи выделяют несколько характерных форм, каждая из которых несёт конструктивную и символическую нагрузку.
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Accordion — Ключевые объекты / Исторический контекст */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", marginTop: "2px" }}>
            {GUIDE_ACCORDION.map((item, i) => (
              <div key={i} style={{
                ...cardBase, cursor: "pointer",
                borderBottom: openAccordion === i ? `1px solid ${C.gold}` : `1px solid ${C.border}`,
              }}
                onMouseEnter={e => (e.currentTarget.style.background = C.bgCardHover)}
                onMouseLeave={e => (e.currentTarget.style.background = C.bgCard)}
                onClick={() => setOpenAccordion(openAccordion === i ? null : i)}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "20px", color: C.white }}>{item.title}</span>
                  <Icon name={openAccordion === i ? "ChevronUp" : "ChevronDown"} size={18} style={{ color: C.gold }} />
                </div>
                {openAccordion === i && (
                  <div style={{ marginTop: "16px", color: C.whiteAlpha60, fontSize: "14px", lineHeight: 1.75 }}>{item.content}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── МАРШРУТЫ ── */}
      <section id="маршруты" style={{ background: C.bg, padding: "100px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={sectionLabel}>
            <div style={labelLine} />
            <span style={labelText}>Авторские маршруты</span>
          </div>
          <h2 style={{ ...sectionTitle, marginBottom: "56px" }}>Три пути к мегалитам</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px" }}>
            {ROUTES.map((r) => (
              <div key={r.num} style={{ ...cardBase, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px" }}>
                  <span style={{ fontFamily: "'Cormorant', serif", fontSize: "48px", fontWeight: 700, color: "rgba(200,168,75,0.18)", lineHeight: 1 }}>{r.num}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", border: `1px solid ${C.border}`, padding: "5px 10px" }}>
                    <Icon name={r.icon} size={12} style={{ color: C.gold }} />
                    <span style={{ color: C.gold, fontSize: "10px", letterSpacing: "0.15em" }}>{r.level}</span>
                  </div>
                </div>
                <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "24px", color: C.white, marginBottom: "8px" }}>{r.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: C.whiteAlpha40, fontSize: "13px", marginBottom: "16px" }}>
                  <Icon name="MapPin" size={12} style={{ color: C.gold }} />
                  {r.location}
                </div>
                <p style={{ color: C.whiteAlpha60, fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" }}>{r.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1 }}>
                  {r.points.map((pt, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px", color: C.whiteAlpha60, fontSize: "13px", lineHeight: 1.5 }}>
                      <span style={{ color: C.gold, fontSize: "10px", marginTop: "4px", flexShrink: 0 }}>◆</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <button style={{ background: C.gold, color: C.bgDark, border: "none", padding: "14px 24px", fontSize: "14px", fontWeight: 700, cursor: "pointer", width: "100%", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = C.goldLight)}
                  onMouseLeave={e => (e.currentTarget.style.background = C.gold)}>
                  Записаться на маршрут
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── КАРТА ДОЛЬМЕННЫХ ПОЛЕЙ ── */}
      <section style={{ background: C.bgDark, padding: "100px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "80px", alignItems: "center" }}>
          <div>
            <div style={sectionLabel}>
              <div style={labelLine} />
              <span style={labelText}>Ареал мегалитов</span>
            </div>
            <h2 style={{ ...sectionTitle, marginBottom: "8px" }}>
              Карта<br /><span style={goldItalic}>дольменных полей</span>
            </h2>
            <p style={{ color: C.whiteAlpha60, fontSize: "14px", lineHeight: 1.75, margin: "24px 0 40px" }}>
              Ареал распространения мегалитов охватывает побережье от Таманского полуострова до Абхазии. Наибольшая концентрация — в горных долинах Адыгеи и районе Новороссийска.
            </p>
            {MAP_POINTS.map((pt, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "16px",
                padding: "16px 0", borderBottom: `1px solid ${C.borderLight}`,
              }}>
                <div style={{ width: "36px", height: "36px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="MapPin" size={16} style={{ color: C.gold }} />
                </div>
                <div>
                  <div style={{ color: C.white, fontSize: "15px", fontWeight: 500 }}>{pt.label}</div>
                  <div style={{ color: C.whiteAlpha40, fontSize: "12px", marginTop: "2px" }}>{pt.route}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Map image with pins */}
          <div style={{ position: "relative" }}>
            <img src="https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/6711891e-d4bc-4f3c-99ad-7ee3f568900a.jpg"
              alt="Карта" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "rgba(9,20,16,0.3)" }} />
            {MAP_POINTS.map((pt) => (
              <div key={pt.id} style={{
                position: "absolute", left: `${pt.x}%`, top: `${pt.y}%`,
                transform: "translate(-50%,-50%)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
              }}>
                <div style={{
                  width: "30px", height: "30px", background: C.gold, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "11px", fontWeight: 700, color: C.bgDark,
                  boxShadow: "0 0 0 3px rgba(200,168,75,0.25)",
                }}>{pt.id}</div>
                <div style={{
                  background: "rgba(9,20,16,0.9)", border: `1px solid ${C.border}`,
                  padding: "3px 8px", fontSize: "11px", color: C.white, whiteSpace: "nowrap",
                }}>{pt.label}</div>
              </div>
            ))}
            <div style={{ position: "absolute", bottom: "12px", right: "16px", color: C.gold, fontSize: "10px", letterSpacing: "0.18em" }}>
              ЗАПАДНЫЙ КАВКАЗ · АДЫГЕЯ
            </div>
          </div>
        </div>
      </section>

      {/* ── ГАЛЕРЕЯ ── */}
      <section id="галерея" style={{ background: C.bg, padding: "100px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={sectionLabel}>
            <div style={labelLine} />
            <span style={labelText}>Галерея</span>
          </div>
          <h2 style={{ ...sectionTitle, marginBottom: "40px" }}>Облик мегалитов</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "4px" }}>
            {GALLERY_IMGS.map((src, i) => (
              <div key={i} style={{ overflow: "hidden", cursor: "pointer" }}
                onMouseEnter={e => ((e.currentTarget.querySelector("img") as HTMLImageElement).style.transform = "scale(1.04)")}
                onMouseLeave={e => ((e.currentTarget.querySelector("img") as HTMLImageElement).style.transform = "scale(1)")}>
                <img src={src} alt={`Дольмен ${i + 1}`}
                  style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "transform 0.4s" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── БЕРЕЖНЫЙ ТУРИЗМ ── */}
      <section style={{ background: C.bgDark, padding: "80px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", border: `1px solid ${C.border}`, padding: "60px 48px", textAlign: "center" }}>
            <Icon name="Shield" size={40} style={{ color: C.gold, marginBottom: "24px" }} />
            <h2 style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "clamp(1.8rem,3vw,2.6rem)", color: C.white, marginBottom: "24px" }}>
              Бережный туризм
            </h2>
            <p style={{ color: C.whiteAlpha60, fontSize: "15px", lineHeight: 1.8, marginBottom: "16px" }}>
              Дольмены Адыгеи — объекты культурного и исторического наследия под защитой государства. С 1999 года действует программа «Сохранение древних мегалитических сооружений».
              Потенциал региона как туристического направления реализован лишь частично — это наша ответственность.
            </p>
            <p style={{ color: C.whiteAlpha40, fontSize: "14px", lineHeight: 1.75 }}>
              Все объекты посещаются только по установленным тропам. Запрещены любые физические воздействия на камень.
            </p>
          </div>
        </div>
      </section>

      {/* ── БИБЛИОТЕКА ДОЛЬМЕНОВ ── */}
      <section id="статьи" style={{ background: C.bg, padding: "100px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={sectionLabel}>
            <div style={labelLine} />
            <span style={labelText}>Статьи</span>
          </div>
          <h2 style={{ ...sectionTitle, marginBottom: "12px" }}>Библиотека дольменов</h2>
          <p style={{ color: C.whiteAlpha60, fontSize: "15px", lineHeight: 1.7, marginBottom: "48px", maxWidth: "560px" }}>
            Здесь вы можете ознакомиться с интересными статьями об истории, исследованиях и загадках мегалитической культуры Западного Кавказа.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {[
              {
                num: "01",
                author: "Дунаевская Е. А.",
                title: "Исследование перспектив развития цивилизационного туризма в Республике Адыгея и Краснодарском крае",
                href: "https://psv4.userapi.com/s/v1/d2/4Jq6XH3335vkYMbqUULPJth5XJ4w1smFJnfBy-XBlPKEDk8e9G9gE2waivJFHoYbmcddBkNUDgKzN2mu3l9TbRxJGTSs31WsVc2fikuEsaZn2V_BPcXEXtoa7S7x-mhdEfkltbJeScoD/elibrary_28845191_29093911.pdf?dl=1",
              },
              {
                num: "02",
                author: "Джанджугазова Е. А.",
                title: "Дольмены Западного Кавказа: загадки, мифы, легенды",
                href: "https://vk.com/doc832294119_697084350?hash=Z7SoVcUDz2RViOnRkEwH5CfZJxdybNzrrNX34yC5jUD&dl=wdhzzOemHc8H9XxYQPHlRy5c9xzqLTPkRVRfcz4nBdw&from_module=vkmsg_desktop",
              },
              {
                num: "03",
                author: "Дмитриев А. В.",
                title: "Дольмены. Заблуждения исследователей и выход из тупика (логический анализ выводов)",
                href: "https://vk.com/doc832294119_697084355?hash=st7pYQwImn9XJs2u1UzBn3AqZZd3b6zlul1J3X04AMc&dl=ZaJ3Yhh9RPL1Kju6DPZXjZyoYFv5V4Ga1Vh0ZCEU5ek&from_module=vkmsg_desktop",
              },
              {
                num: "04",
                author: "Трифонов В. А.",
                title: "Происхождение керамического комплекса «дольменной» культуры эпохи бронзы",
                href: "https://vk.com/doc832294119_697084357?hash=okvlRnV6gSTzQSDcTtn24trnXt6WKUPhcBIUewS3cgs&dl=9GEQi3klMEQeMvWMfvE4fZiWaYdBzkzDYsS79DnbdTL&from_module=vkmsg_desktop",
              },
            ].map((article) => (
              <a
                key={article.num}
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div style={{
                  ...cardBase, display: "flex", alignItems: "center", gap: "28px",
                  cursor: "pointer", transition: "background 0.2s, border-color 0.2s",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = C.bgCardHover;
                    (e.currentTarget as HTMLDivElement).style.borderColor = C.gold;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = C.bgCard;
                    (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
                  }}
                >
                  <span style={{
                    fontFamily: "'Cormorant', serif", fontSize: "36px", fontWeight: 700,
                    color: "rgba(200,168,75,0.18)", lineHeight: 1, flexShrink: 0, width: "52px",
                  }}>{article.num}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: C.gold, fontSize: "12px", letterSpacing: "0.1em", marginBottom: "6px", fontWeight: 500 }}>
                      {article.author}
                    </div>
                    <div style={{ fontFamily: "'Cormorant', serif", fontWeight: 600, fontSize: "19px", color: C.white, lineHeight: 1.4 }}>
                      {article.title}
                    </div>
                  </div>
                  <Icon name="ExternalLink" size={18} style={{ color: C.gold, flexShrink: 0, opacity: 0.7 }} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.bgDark, borderTop: `1px solid ${C.borderLight}`, padding: "32px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "30px", height: "30px", background: C.gold, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: C.bgDark, fontSize: "12px", fontWeight: 900 }}>◆</span>
            </div>
            <div>
              <span style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "15px", color: C.white, letterSpacing: "0.1em" }}>DOLMEN ADYGEA</span>
              <span style={{ color: C.whiteAlpha40, fontSize: "13px", marginLeft: "12px" }}>Цивилизационный туризм</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: "36px" }}>
            {["О НАС", "МАРШРУТЫ", "ГАЛЕРЕЯ", "КОНТАКТЫ"].map((l) => (
              <a key={l} href="#" style={{ color: C.whiteAlpha40, fontSize: "12px", letterSpacing: "0.12em", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
                onMouseLeave={e => (e.currentTarget.style.color = C.whiteAlpha40)}>{l}</a>
            ))}
          </div>
          <div style={{ color: C.whiteAlpha40, fontSize: "12px" }}>Все объекты — культурное наследие РФ</div>
        </div>
      </footer>

    </div>
  );
}
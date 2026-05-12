import { useState } from "react";
import Icon from "@/components/ui/icon";

const dolmenPoints = [
  { id: 1, x: 22, y: 45, name: "Дольмен Псынако", age: "3500 лет", desc: "Один из самых сохранившихся дольменов Краснодарского края", duration: "1.5 км от старта" },
  { id: 2, x: 38, y: 30, name: "Дольмен Жане", age: "4000 лет", desc: "Группа из трёх дольменов у реки Жане, священное место", duration: "3.2 км" },
  { id: 3, x: 55, y: 55, name: "Волконский дольмен", age: "3800 лет", desc: "Уникальный монолитный дольмен, вырубленный в скале", duration: "5.8 км" },
  { id: 4, x: 70, y: 35, name: "Дольмен Шапсуга", age: "3200 лет", desc: "Плиточный дольмен с сохранившимся рисунком на фасаде", duration: "8.1 км" },
  { id: 5, x: 85, y: 60, name: "Дольмен на горе Нэксис", age: "4200 лет", desc: "Финальная точка маршрута с панорамным видом на горы", duration: "12.4 км — финиш" },
];

const photos = [
  { url: "https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/8bb62647-2913-4144-b4a0-4a71cfc12e79.jpg", caption: "Дольмен в лесу" },
  { url: "https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/6711891e-d4bc-4f3c-99ad-7ee3f568900a.jpg", caption: "Вид с горы" },
  { url: "https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/f40ad786-6f0b-4acf-8492-ed453905c790.jpg", caption: "Группа туристов" },
];

export default function Index() {
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);

  const active = dolmenPoints.find(p => p.id === activePoint);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Golos Text', sans-serif", background: "#f8f3eb" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between" style={{ background: "rgba(248, 243, 235, 0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(139, 90, 43, 0.12)" }}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗿</span>
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "'Cormorant', serif", color: "#6b3d1e" }}>
            Тропа дольменов
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium" style={{ color: "#7a5c3a" }}>
          <a href="#about" className="hover:opacity-70 transition-opacity">О туре</a>
          <a href="#route" className="hover:opacity-70 transition-opacity">Маршрут</a>
          <a href="#gallery" className="hover:opacity-70 transition-opacity">Галерея</a>
        </div>
        <button className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95" style={{ background: "#c0622f", color: "#fdf5e8" }}>
          Забронировать
        </button>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/8bb62647-2913-4144-b4a0-4a71cfc12e79.jpg"
            alt="Дольмен"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(42,28,14,0.35) 0%, rgba(42,28,14,0.6) 60%, rgba(42,28,14,0.88) 100%)" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-medium" style={{ background: "rgba(192,98,47,0.25)", border: "1px solid rgba(192,98,47,0.5)", color: "#f5deb3", backdropFilter: "blur(8px)" }}>
            <Icon name="MapPin" size={14} />
            Краснодарский край · Кавказ
          </div>

          <h1 className="mb-6 leading-tight" style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(3.2rem, 8vw, 7rem)", fontWeight: 700, color: "#fdf5e8", letterSpacing: "-0.02em", textShadow: "0 4px 32px rgba(0,0,0,0.4)" }}>
            Дольмены<br />
            <span style={{ color: "#dba96a", fontStyle: "italic" }}>Кавказа</span>
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(253,245,232,0.82)" }}>
            Пешеходный тур к древним мегалитам возрастом более 4000 лет. 12 километров живой истории среди горных лесов.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-full text-base font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg" style={{ background: "#c0622f", color: "#fdf5e8" }}>
              Забронировать тур
            </button>
            <button className="px-8 py-4 rounded-full text-base font-semibold transition-all hover:scale-105" style={{ background: "rgba(253,245,232,0.13)", border: "1px solid rgba(253,245,232,0.4)", color: "#fdf5e8", backdropFilter: "blur(8px)" }}>
              Смотреть маршрут
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: "rgba(253,245,232,0.5)" }}>
          <Icon name="ChevronDown" size={28} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6" style={{ background: "#f8f3eb" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#c0622f" }}>О туре</p>
              <h2 className="text-4xl md:text-5xl mb-6 leading-tight" style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, color: "#3d1f0a" }}>
                Путешествие<br />сквозь тысячелетия
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#7a5c3a" }}>
                Дольмены — загадочные каменные сооружения, которым более 4000 лет. Кавказские горы хранят тысячи этих памятников. Мы проведём вас к пяти уникальным объектам по живописным тропам среди лесов и горных рек.
              </p>
              <p className="text-base leading-relaxed mb-10" style={{ color: "#7a5c3a" }}>
                Небольшие группы до 8 человек, опытный гид-историк, полное снаряжение и горячий обед — всё включено.
              </p>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: "Users", val: "до 8", label: "человек" },
                  { icon: "Route", val: "12 км", label: "маршрут" },
                  { icon: "Clock", val: "1 день", label: "длительность" },
                ].map((item) => (
                  <div key={item.label} className="text-center p-4 rounded-2xl" style={{ background: "#efe7d6", border: "1px solid rgba(139,90,43,0.14)" }}>
                    <Icon name={item.icon} size={20} className="mx-auto mb-2" style={{ color: "#c0622f" }} />
                    <div className="text-xl font-bold mb-0.5" style={{ fontFamily: "'Cormorant', serif", color: "#3d1f0a" }}>{item.val}</div>
                    <div className="text-xs" style={{ color: "#7a5c3a" }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/f40ad786-6f0b-4acf-8492-ed453905c790.jpg"
                alt="Туристы у дольмена"
                className="rounded-3xl w-full object-cover shadow-xl"
                style={{ aspectRatio: "4/5" }}
              />
              <div className="absolute -bottom-6 -left-6 p-5 rounded-2xl shadow-lg" style={{ background: "#c0622f", color: "#fdf5e8" }}>
                <div className="text-3xl font-bold mb-1" style={{ fontFamily: "'Cormorant', serif" }}>5</div>
                <div className="text-xs font-medium opacity-90">уникальных<br />дольменов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROUTE MAP */}
      <section id="route" className="py-24 px-6" style={{ background: "#e8dfc9" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#c0622f" }}>Интерактивная карта</p>
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, color: "#3d1f0a" }}>
              Маршрут тура
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6 items-start">
            <div className="md:col-span-3">
              <div className="relative rounded-3xl overflow-hidden shadow-xl" style={{ border: "2px solid rgba(139,90,43,0.18)" }}>
                <img
                  src="https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/6711891e-d4bc-4f3c-99ad-7ee3f568900a.jpg"
                  alt="Карта маршрута"
                  className="w-full object-cover opacity-65"
                  style={{ aspectRatio: "4/3" }}
                />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 75" preserveAspectRatio="none">
                  <path
                    d={`M ${dolmenPoints.map(p => `${p.x},${p.y}`).join(" L ")}`}
                    fill="none"
                    stroke="rgba(192,98,47,0.8)"
                    strokeWidth="0.9"
                    strokeDasharray="2.5,1.2"
                    strokeLinecap="round"
                  />
                  {dolmenPoints.map((point) => (
                    <g key={point.id} onClick={() => setActivePoint(activePoint === point.id ? null : point.id)} style={{ cursor: "pointer" }}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={activePoint === point.id ? 4.5 : 3.5}
                        fill={activePoint === point.id ? "#c0622f" : "rgba(248,243,235,0.95)"}
                        stroke="#c0622f"
                        strokeWidth="1.2"
                        style={{ transition: "all 0.2s" }}
                      />
                      <text
                        x={point.x}
                        y={point.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="2"
                        fontWeight="bold"
                        fill={activePoint === point.id ? "#fdf5e8" : "#c0622f"}
                      >
                        {point.id}
                      </text>
                    </g>
                  ))}
                </svg>
                <div className="absolute bottom-3 left-0 right-0 text-center text-xs py-1" style={{ color: "#7a5c3a" }}>
                  Нажмите на точку маршрута для подробностей
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col gap-3">
              {active ? (
                <div className="p-5 rounded-2xl mb-1" style={{ background: "#f8f3eb", border: "2px solid #c0622f" }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "#c0622f", color: "#fdf5e8" }}>
                      {active.id}
                    </div>
                    <button onClick={() => setActivePoint(null)} style={{ color: "#7a5c3a" }}>
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Cormorant', serif", color: "#3d1f0a" }}>{active.name}</h3>
                  <p className="text-xs font-semibold mb-3" style={{ color: "#c0622f" }}>{active.age} · {active.duration}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#7a5c3a" }}>{active.desc}</p>
                </div>
              ) : (
                <div className="p-5 rounded-2xl text-center mb-1" style={{ background: "#f8f3eb", border: "1px dashed rgba(139,90,43,0.35)" }}>
                  <div className="text-3xl mb-2">🗿</div>
                  <p className="text-sm" style={{ color: "#7a5c3a" }}>Выберите точку на карте</p>
                </div>
              )}

              {dolmenPoints.map((point) => (
                <button
                  key={point.id}
                  onClick={() => setActivePoint(activePoint === point.id ? null : point.id)}
                  className="text-left p-4 rounded-2xl transition-all hover:scale-[1.02]"
                  style={{
                    background: activePoint === point.id ? "#c0622f" : "#f8f3eb",
                    border: `1px solid ${activePoint === point.id ? "#c0622f" : "rgba(139,90,43,0.15)"}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: activePoint === point.id ? "rgba(255,255,255,0.2)" : "#c0622f", color: "#fdf5e8" }}>
                      {point.id}
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: activePoint === point.id ? "#fdf5e8" : "#3d1f0a" }}>{point.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: activePoint === point.id ? "rgba(253,245,232,0.7)" : "#7a5c3a" }}>{point.duration}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6" style={{ background: "#f8f3eb" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#c0622f" }}>Фото и видео</p>
            <h2 className="text-4xl md:text-5xl" style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, color: "#3d1f0a" }}>
              Атмосфера тура
            </h2>
          </div>

          <div className="relative rounded-3xl overflow-hidden mb-4 shadow-xl" style={{ height: "420px" }}>
            <img
              src={photos[activePhoto].url}
              alt={photos[activePhoto].caption}
              className="w-full h-full object-cover"
              style={{ transition: "opacity 0.4s" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(42,28,14,0.65) 0%, transparent 55%)" }} />
            <div className="absolute bottom-6 left-6 text-xl font-semibold" style={{ fontFamily: "'Cormorant', serif", color: "#fdf5e8" }}>
              {photos[activePhoto].caption}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-16">
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className="relative rounded-2xl overflow-hidden transition-all hover:scale-[1.02]"
                style={{ height: "120px", outline: i === activePhoto ? "3px solid #c0622f" : "none", outlineOffset: "2px" }}
              >
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                {i === activePhoto && <div className="absolute inset-0" style={{ background: "rgba(192,98,47,0.2)" }} />}
              </button>
            ))}
          </div>

          {/* Video block */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl flex items-center justify-center" style={{ height: "300px" }}>
            <img
              src="https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/8bb62647-2913-4144-b4a0-4a71cfc12e79.jpg"
              alt="Видео"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "rgba(42,28,14,0.55)" }} />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <button className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110" style={{ background: "#c0622f", color: "#fdf5e8" }}>
                <Icon name="Play" size={32} />
              </button>
              <span style={{ color: "#fdf5e8", fontFamily: "'Cormorant', serif", fontSize: "1.25rem", fontWeight: 600 }}>
                Видео о туре · 3:24
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ background: "#3d1f0a" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-6">🗿</div>
          <h2 className="text-4xl md:text-5xl mb-6 leading-tight" style={{ fontFamily: "'Cormorant', serif", fontWeight: 700, color: "#fdf5e8" }}>
            Готовы отправиться<br />в путь?
          </h2>
          <p className="text-base mb-10 leading-relaxed" style={{ color: "rgba(253,245,232,0.72)" }}>
            Ближайший тур — 24 мая 2026. Места ограничены — только 8 человек в группе.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 rounded-full text-base font-semibold transition-all hover:scale-105 shadow-lg" style={{ background: "#c0622f", color: "#fdf5e8" }}>
              Забронировать место
            </button>
            <button className="px-10 py-4 rounded-full text-base font-semibold transition-all hover:scale-105" style={{ background: "rgba(253,245,232,0.1)", border: "1px solid rgba(253,245,232,0.35)", color: "#fdf5e8" }}>
              Задать вопрос
            </button>
          </div>
          <p className="mt-6 text-sm" style={{ color: "rgba(253,245,232,0.4)" }}>
            Без предоплаты · Бесплатная отмена за 48 часов
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ background: "#3d1f0a", borderTop: "1px solid rgba(253,245,232,0.08)" }}>
        <div className="flex items-center gap-2">
          <span className="text-xl">🗿</span>
          <span style={{ fontFamily: "'Cormorant', serif", color: "rgba(253,245,232,0.65)" }}>Тропа дольменов</span>
        </div>
        <div className="text-sm" style={{ color: "rgba(253,245,232,0.4)" }}>Кавказ · Краснодарский край</div>
        <div className="flex gap-6 text-sm" style={{ color: "rgba(253,245,232,0.5)" }}>
          <a href="#about" className="hover:text-white transition-colors">О туре</a>
          <a href="#route" className="hover:text-white transition-colors">Маршрут</a>
          <a href="#gallery" className="hover:text-white transition-colors">Галерея</a>
        </div>
      </footer>

    </div>
  );
}
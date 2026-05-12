import Icon from "@/components/ui/icon";

const stats = [
  { val: "2 500+", label: "ИЗВЕСТНЫХ ДОЛЬМЕНОВ" },
  { val: "5 000", label: "ЛЕТ ИСТОРИИ" },
  { val: "3", label: "АВТОРСКИХ МАРШРУТА" },
  { val: "IV–II", label: "ТЫС. ДО Н.Э." },
];

export default function Index() {
  return (
    <div style={{ fontFamily: "'Golos Text', sans-serif", background: "#0d1a0d", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 32px", height: "60px",
        background: "rgba(10, 20, 10, 0.55)",
        backdropFilter: "blur(10px)",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", background: "#c8a84b",
            borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: "18px" }}>◆</span>
          </div>
          <span style={{
            fontFamily: "'Cormorant', serif", fontWeight: 700, fontSize: "18px",
            color: "#ffffff", letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            DOLMEN
          </span>
          <span style={{ fontSize: "20px", marginLeft: "4px" }}>🌿</span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          {["О нас", "Справочник гида", "Маршруты", "Галерея"].map((item) => (
            <a key={item} href="#" style={{
              color: "rgba(255,255,255,0.85)", fontSize: "14px", textDecoration: "none",
              letterSpacing: "0.02em", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#c8a84b")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
            >
              {item}
            </a>
          ))}
          <button style={{
            background: "transparent", border: "2px solid #c8a84b",
            color: "#c8a84b", padding: "8px 22px", fontSize: "14px",
            fontWeight: 600, cursor: "pointer", letterSpacing: "0.03em",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#c8a84b"; (e.currentTarget as HTMLButtonElement).style.color = "#0d1a0d"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#c8a84b"; }}
          >
            Выбрать маршрут
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img
            src="https://cdn.poehali.dev/projects/2b20b54a-2461-4c22-8cd3-a8c9bdc22afe/files/8bb62647-2913-4144-b4a0-4a71cfc12e79.jpg"
            alt="Дольмен"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
          {/* Dark green overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, rgba(5,15,5,0.45) 0%, rgba(5,15,5,0.35) 40%, rgba(5,15,5,0.72) 75%, rgba(5,15,5,0.92) 100%)",
          }} />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, padding: "0 48px 0 48px", paddingTop: "140px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "120px" }}>

          {/* Subtitle line */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
            <div style={{ width: "40px", height: "1px", background: "#c8a84b" }} />
            <span style={{
              color: "#c8a84b", fontSize: "11px", letterSpacing: "0.25em",
              textTransform: "uppercase", fontWeight: 500,
            }}>
              Цивилизационный туризм · Адыгея
            </span>
          </div>

          {/* Main heading */}
          <h1 style={{ margin: "0 0 8px 0", lineHeight: 1.05 }}>
            <span style={{
              fontFamily: "'Cormorant', serif", fontWeight: 700,
              fontSize: "clamp(4rem, 8vw, 7rem)", color: "#ffffff",
              display: "block",
            }}>
              Культура
            </span>
            <span style={{
              fontFamily: "'Cormorant', serif", fontWeight: 700, fontStyle: "italic",
              fontSize: "clamp(4rem, 8vw, 7rem)", color: "#c8a84b",
              display: "block",
            }}>
              дольменов
            </span>
          </h1>

          {/* Sub-heading */}
          <p style={{ color: "#ffffff", fontSize: "18px", fontWeight: 500, margin: "16px 0 8px 0" }}>
            Дольмены Адыгеи
          </p>

          {/* Quote */}
          <p style={{
            color: "rgba(255,255,255,0.75)", fontSize: "14px", fontStyle: "italic",
            maxWidth: "480px", lineHeight: 1.6, margin: "0 0 40px 0",
          }}>
            «Мегалитические памятники — такая же тайна планеты, как пирамиды или Стоунхендж»
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "0" }}>
            <button style={{
              background: "#c8a84b", color: "#0d1a0d", border: "none",
              padding: "16px 32px", fontSize: "15px", fontWeight: 700,
              cursor: "pointer", letterSpacing: "0.02em", transition: "all 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "#d4b55a")}
              onMouseLeave={e => (e.currentTarget.style.background = "#c8a84b")}
            >
              Выбрать маршрут
            </button>
            <button style={{
              background: "transparent", color: "#ffffff",
              border: "2px solid rgba(255,255,255,0.5)",
              padding: "16px 32px", fontSize: "15px", fontWeight: 500,
              cursor: "pointer", letterSpacing: "0.02em", transition: "all 0.2s",
              borderLeft: "none",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#c8a84b"; (e.currentTarget as HTMLButtonElement).style.color = "#c8a84b"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLButtonElement).style.color = "#ffffff"; }}
            >
              Узнать историю
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          position: "relative", zIndex: 10,
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(5,15,5,0.65)",
          backdropFilter: "blur(8px)",
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              padding: "28px 48px",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}>
              <div style={{
                fontFamily: "'Cormorant', serif", fontWeight: 700,
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                color: i === 3 ? "#c8a84b" : "#ffffff",
                marginBottom: "6px", letterSpacing: "-0.01em",
              }}>
                {stat.val}
              </div>
              <div style={{
                color: "rgba(255,255,255,0.5)", fontSize: "11px",
                letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

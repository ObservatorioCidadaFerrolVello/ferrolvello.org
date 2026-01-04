(() => {
  const items = [
    { href: "index.html", label: "Inicio" },
    { href: "quen-somos.html", label: "Quen somos" },
    { href: "que-facemos.html", label: "Que facemos" },
    { href: "documentos.html", label: "Documentos" },
    { href: "notas-prensa.html", label: "Prensa" },
    { href: "enlaces.html", label: "Enlaces" },
    { href: "historial.html", label: "Historial" },
    { href: "contacto.html", label: "Contacto" }
  ];

  // Resuelve página actual (sin query ni hash)
  const raw = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const current = (raw === "" ? "index.html" : raw);

  // Rutas de assets: si algún día abres desde subcarpeta (ej. /notas/...), el src relativo
  // puede fallar. Forzamos base hacia raíz del sitio si estamos en subcarpeta.
  const inSubdir = location.pathname.split("/").filter(Boolean).length > 1;
  const base = inSubdir ? "../" : "";
  const logoSrc = `${base}assets/logo-ferrolvello.svg`;

  const host = document.getElementById("site-header");
  if (!host) return;

  host.innerHTML = `
    <div class="container header-inner">
      <a class="brand" href="${base}index.html" aria-label="Inicio — Observatorio Cidadá Ferrol Vello">
        <span class="brand-mark" aria-hidden="true">
          <img src="${logoSrc}" alt="Observatorio Cidadá Ferrol Vello" loading="eager" />
        </span>
        <span class="brand-name">Observatorio Cidadá Ferrol Vello</span>
      </a>

      <nav class="nav" aria-label="Navegación principal">
        ${items.map(i => {
          const active = i.href.toLowerCase() === current ? "is-active" : "";
          return `<a class="nav-link ${active}" href="${base}${i.href}">${i.label}</a>`;
        }).join("")}
      </nav>

      <button class="nav-toggle" type="button"
        aria-label="Abrir menú"
        aria-expanded="false"
        aria-controls="nav-mobile">
        <span></span><span></span><span></span>
      </button>
    </div>

    <div class="nav-mobile" id="nav-mobile" hidden>
      <div class="container nav-mobile-inner">
        ${items.map(i => `<a href="${base}${i.href}">${i.label}</a>`).join("")}
      </div>
    </div>
  `;

  const btn = host.querySelector(".nav-toggle");
  const panel = host.querySelector("#nav-mobile");
  if (!btn || !panel) return;

  // Garantiza estado inicial
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-label", "Abrir menú");
  panel.hidden = true;

  const setOverflow = (locked) => {
    document.documentElement.style.overflow = locked ? "hidden" : "";
  };

  const setOpen = (open) => {
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Pechar menú" : "Abrir menú");
    panel.hidden = !open;
    setOverflow(open);
  };

  const isOpen = () => btn.getAttribute("aria-expanded") === "true";

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!isOpen());
  });

  // Cierra al clicar un link
  panel.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => setOpen(false));
  });

  // Cierra al clicar fuera (captura global)
  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    if (host.contains(e.target)) return;
    setOpen(false);
  });

  // Cierra con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (isOpen()) setOpen(false);
  });

  // Si cambias de tamaño (móvil->desktop), cerramos para evitar estados raros
  window.addEventListener("resize", () => {
    if (isOpen()) setOpen(false);
  });

  // Asegura liberar overflow al navegar/recargar
  window.addEventListener("pagehide", () => setOpen(false));
})();


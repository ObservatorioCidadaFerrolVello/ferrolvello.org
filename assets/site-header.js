(() => {
  const items = [
    { href: "/index.html", label: "Inicio" },
    { href: "/quen-somos.html", label: "Quen somos" },
    { href: "/que-facemos.html", label: "Que facemos" },
    { href: "/documentos.html", label: "Documentos" },
    { href: "/notas-prensa.html", label: "Prensa" },
    { href: "/enlaces.html", label: "Enlaces" },
    { href: "/historial.html", label: "Historial" },
    { href: "/contacto.html", label: "Contacto" }
  ];

  // Página actual (sin query/hash)
  const current = (location.pathname === "/" ? "/index.html" : location.pathname).toLowerCase();

  const logoSrc = "/assets/logo-ferrolvello.svg";

  const host = document.getElementById("site-header");
  if (!host) return;

  host.innerHTML = `
    <div class="container header-inner">
      <a class="brand" href="/index.html" aria-label="Inicio — Observatorio Cidadá Ferrol Vello">
        <span class="brand-mark" aria-hidden="true">
          <img src="${logoSrc}" alt="Observatorio Cidadá Ferrol Vello" loading="eager" />
        </span>
        <span class="brand-name">Observatorio Cidadá Ferrol Vello</span>
      </a>

      <nav class="nav" aria-label="Navegación principal">
        ${items.map(i => {
          const active = i.href.toLowerCase() === current ? "is-active" : "";
          return `<a class="nav-link ${active}" href="${i.href}">${i.label}</a>`;
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
        ${items.map(i => `<a href="${i.href}">${i.label}</a>`).join("")}
      </div>
    </div>
  `;

  const btn = host.querySelector(".nav-toggle");
  const panel = host.querySelector("#nav-mobile");
  if (!btn || !panel) return;

  const setOpen = (open) => {
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Pechar menú" : "Abrir menú");
    panel.hidden = !open;
    document.documentElement.style.overflow = open ? "hidden" : "";
  };

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(btn.getAttribute("aria-expanded") !== "true");
  });

  panel.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("click", (e) => {
    if (btn.getAttribute("aria-expanded") !== "true") return;
    if (host.contains(e.target)) return;
    setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", () => setOpen(false));
  window.addEventListener("pagehide", () => setOpen(false));
})();

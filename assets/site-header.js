(() => {
  // Evita doble inicialización (por cache, doble carga, etc.)
  if (window.__FV_HEADER_INIT__) return;
  window.__FV_HEADER_INIT__ = true;

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

  // Normaliza pathname (sin query/hash) y convierte "/" en "/index.html"
  const normalizePath = (p) => {
    if (!p || p === "/") return "/index.html";
    return String(p).toLowerCase();
  };

  const current = normalizePath(location.pathname);
  const logoSrc = "/assets/logo-ferrolvello.svg";

  const host = document.getElementById("site-header");
  if (!host) return;

  host.innerHTML = `
    <div class="container header-inner">
      <a class="brand" href="/index.html" aria-label="Inicio — Observatorio Cidadá Ferrol Vello">
        <span class="brand-mark" aria-hidden="true">
          <img src="${logoSrc}" alt="Observatorio Cidadá Ferrol Vello" loading="eager" />
        </span>

        <!-- Marca en 2 líneas para no empujar la navegación -->
        <span class="brand-name">
          <span class="brand-line">Observatorio Cidadá</span>
          <span class="brand-line brand-line-sub">Ferrol Vello</span>
        </span>
      </a>

      <nav class="nav" aria-label="Navegación principal">
        ${items.map(i => {
          const active = normalizePath(i.href) === current ? "is-active" : "";
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
        ${items.map(i => {
          const active = normalizePath(i.href) === current ? ' aria-current="page"' : "";
          return `<a href="${i.href}"${active}>${i.label}</a>`;
        }).join("")}
      </div>
    </div>
  `;

  const btn = host.querySelector(".nav-toggle");
  const panel = host.querySelector("#nav-mobile");
  if (!btn || !panel) return;

  const lockScroll = (lock) => {
    document.documentElement.style.overflow = lock ? "hidden" : "";
  };

  const setHeaderHeightVar = () => {
    const h = host.offsetHeight || 86;
    document.documentElement.style.setProperty("--header-h", `${h}px`);
  };

  const setOpen = (open) => {
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Pechar menú" : "Abrir menú");
    panel.hidden = !open;
    lockScroll(open);
  };

  // Inicial
  setHeaderHeightVar();
  setOpen(false);

  // Toggle
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  // Cierra al clicar un link
  panel.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => setOpen(false));
  });

  // Cierra al clicar fuera
  document.addEventListener("click", (e) => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    if (!isOpen) return;
    if (host.contains(e.target)) return;
    setOpen(false);
  });

  // Cierra con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  // Recalcula altura y cierra en resize/orientación
  const onResize = () => {
    setHeaderHeightVar();
    setOpen(false);
  };

  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("orientationchange", onResize, { passive: true });

  // Limpieza
  window.addEventListener("pagehide", () => setOpen(false));
})();

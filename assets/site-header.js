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

  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();

  const headerHTML = `
    <div class="header-inner">
      <a class="brand" href="index.html" aria-label="Ir a inicio">
        <span class="brand-logo">
          <img src="assets/logo.svg" alt="Observatorio Cidadá Ferrol Vello" />
        </span>
        <span class="brand-text">
          <span class="brand-title">Observatorio Cidadá Ferrol Vello</span>
        </span>
      </a>

      <nav class="top-nav" aria-label="Navegación principal">
        ${items.map(i => {
          const active = i.href.toLowerCase() === path ? "is-active" : "";
          return `<a class="nav-link ${active}" href="${i.href}">${i.label}</a>`;
        }).join("")}
      </nav>
    </div>
  `;

  const host = document.getElementById("site-header");
  if (host) host.innerHTML = headerHTML;
})();

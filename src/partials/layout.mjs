export async function loadLayout() {
  const headerContainer = document.querySelector("#header");
  const footerContainer = document.querySelector("#footer");

  try {
    // Load header
    const headerHTML = await fetch("/src/partials/header.html").then(res => res.text());
    if (headerContainer) {
      headerContainer.innerHTML = headerHTML;

      // Inject CSS
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/src/partials/header.css";
      document.head.appendChild(link);
    }

    // Load footer
    const footerHTML = await fetch("/src/partials/footer.html").then(res => res.text());
    if (footerContainer) footerContainer.innerHTML = footerHTML;

  } catch (err) {
    console.error("Error loading layout:", err);
  }
}

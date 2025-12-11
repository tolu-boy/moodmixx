// -------------------------------------------------------------
// Query Selector Helper
// -------------------------------------------------------------
// A simple wrapper for document.querySelector()
// Makes selecting DOM elements shorter and cleaner.
// Optionally lets you pass a parent element.
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}



// -------------------------------------------------------------
// Local Storage Helpers
// -------------------------------------------------------------
// Retrieve JSON data from localStorage and parse it into JS objects.
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Save JavaScript data to localStorage after converting to JSON.
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}



// -------------------------------------------------------------
// Touch + Click Event Listener Helper
// -------------------------------------------------------------
// This ensures buttons work on both mobile (touch) and desktop (click).
export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) return;

  // For mobile devices — prevents default double triggers.
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });

  // For desktops — normal click.
  element.addEventListener("click", callback);
}



// -------------------------------------------------------------
// Template Loader
// -------------------------------------------------------------
// Loads an HTML file from the 'partials' folder using fetch().
// Returns the HTML text content so we can inject it into a page.
export async function loadTemplate(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load template: ${path}`);
  }

  return await response.text();
}



// -------------------------------------------------------------
// Template Renderer
// -------------------------------------------------------------
// Inserts HTML into a parent container.
// Optional: 'data' for future features & 'callback' for after-render actions.
export function renderWithTemplate(template, parent, data = null, callback) {
  parent.innerHTML = template;
  if (callback) callback(data);
}



// -------------------------------------------------------------
// Load Header + Footer Automatically
// -------------------------------------------------------------
// This allows every page to use the same header and footer.
// Simply add:
//    <header id="site-header"></header>
//    <footer id="site-footer"></footer>
// in your HTML pages.
// It loads: /partials/header.html and /partials/footer.html
export async function loadHeaderFooter() {
  const headerEl = qs("#site-header");
  const footerEl = qs("#site-footer");

  // Only run if both exist
  if (!headerEl || !footerEl) return;

  try {
    // Load template files
    const headerTemplate = await loadTemplate("/partials/header.html");
    const footerTemplate = await loadTemplate("/partials/footer.html");

    // Inject into page
    renderWithTemplate(headerTemplate, headerEl);
    renderWithTemplate(footerTemplate, footerEl);

  } catch (error) {
    console.error("Error loading header/footer:", error);
  }
}

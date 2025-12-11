// productlist.js
import ProductData from "./ProductData.mjs";
import { renderProducts } from "./renderProducts.mjs";

console.log("✔ productlist.js loaded");

const productListContainer = document.querySelector("#product_list");
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

async function loadProducts() {
  if (!category) {
    productListContainer.innerHTML = "<p>No category selected.</p>";
    return;
  }

  try {
    const loader = new ProductData(category);
    const products = await loader.getData();
    // add category property for reference
    products.forEach(p => p.category = category);
    renderProducts(products, productListContainer);
  } catch (err) {
    console.error("Error loading products:", err);
    productListContainer.innerHTML = "<p>Failed to load products.</p>";
  }
}

loadProducts();

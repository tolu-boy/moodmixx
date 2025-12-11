// main.js
import ProductData from "./ProductData.mjs";
import { renderProducts } from "./renderProducts.mjs";
import { loadLayout } from "/src/partials/layout.mjs";
    loadLayout()

const productListContainer = document.querySelector("#my_product");

// Categories
const categories = ["hangout", "relax", "study", "workout"];

async function loadAllProducts() {
  let allProducts = [];

  for (const category of categories) {
    const loader = new ProductData(category);
    const products = await loader.getData();
    // add category property to each product
    products.forEach(p => p.category = category);
    allProducts = [...allProducts, ...products];
  }

  renderProducts(allProducts, productListContainer);
}

// Run
loadAllProducts();

// Category card clicks
document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;
    window.location.href = `/src/product_list/product_list.html?category=${category}`;
  });
});

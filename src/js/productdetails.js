// product_details.js
import ProductData from "./ProductData.mjs";

const container = document.querySelector("#product_details");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function loadProduct() {
  if (!productId) {
    container.innerHTML = "<p>No product selected.</p>";
    return;
  }

  // Search all categories
  const categories = ["hangout", "relax", "study", "workout"];
  let product = null;

  for (const category of categories) {
    const loader = new ProductData(category);
    const products = await loader.getData();
    product = products.find(p => p.product_id === productId);
    if (product) break;
  }

  if (!product) {
    container.innerHTML = "<p>Product not found.</p>";
    return;
  }

  container.innerHTML = `
    <div class="product-detail-card">
      <img src="${product.image}" alt="${product.title}" />
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <p>₦${product.price}</p>
      <button class="wishlist-btn" data-id="${product.product_id}">❤️ Add to Wishlist</button>
    </div>
  `;
}

loadProduct();

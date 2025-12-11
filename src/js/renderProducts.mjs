// renderProducts.mjs

/**
 * Renders product cards and includes:
 * - Click to view product details
 * - Add to Cart
 * - Add to Wishlist
 */

export function renderProducts(products, container) {
  if (!products || !Array.isArray(products)) {
    container.innerHTML = "<p>Failed to load products...</p>";
    return;
  }

  container.innerHTML = products
    .map(
      (product) => `
    <div class="product-card"
         data-id="${product.product_id}"
         data-category="${product.category}">
      
      <img src="${product.image}" alt="${product.title}" class="product-img" />

      <h3>${product.title}</h3>
      <p>${product.description || ""}</p>
      <p class="price">₦${product.price}</p>

      <div class="product-actions">
        <button class="add-cart-btn" data-id="${product.product_id}">
          Add to Cart
        </button>

        <button class="add-wishlist-btn" data-id="${product.product_id}">
          ❤️ Wishlist
        </button>
      </div>

    </div>
  `
    )
    .join("");

  // ---------------------------------------
  // CLICK PRODUCT → GO TO PRODUCT DETAILS
  // ---------------------------------------
  container.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      // Prevent button clicks from triggering card redirect
      if (e.target.classList.contains("add-cart-btn")) return;
      if (e.target.classList.contains("add-wishlist-btn")) return;

      const id = card.dataset.id;
      const category = card.dataset.category;

      window.location.href =
        `/src/product_details/product_details.html?id=${id}&category=${category}`;
    });
  });

  // ---------------------------------------
  // ADD TO CART
  // ---------------------------------------
  container.querySelectorAll(".add-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent redirect

      const id = btn.dataset.id;
      const product = products.find((p) => p.product_id == id);

      addToCart(product);
    });
  });

  // ---------------------------------------
  // ADD TO WISHLIST
  // ---------------------------------------
  container.querySelectorAll(".add-wishlist-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent redirect

      const id = btn.dataset.id;
      const product = products.find((p) => p.product_id == id);

      addToWishlist(product);
    });
  });
}

// ============================
// CART STORAGE
// ============================

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.product_id === product.product_id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} added to cart!`);
}

// ============================
// WISHLIST STORAGE
// ============================

function addToWishlist(product) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const exists = wishlist.find((item) => item.product_id === product.product_id);

  if (!exists) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(`${product.title} added to wishlist ❤️`);
  } else {
    alert("This item is already in your wishlist!");
  }
}

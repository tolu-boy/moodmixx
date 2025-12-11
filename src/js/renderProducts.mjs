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

        <button class="get-quote-btn" data-id="${
          product.product_id
        }" data-category="${product.category}">
          💬 Get Quote
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
      if (e.target.classList.contains("get-quote-btn")) return;

      const id = card.dataset.id;
      const category = card.dataset.category;

      window.location.href = `/src/product_details/product_details.html?id=${id}&category=${category}`;
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

  // ---------------------------------------
  // GET QUOTE (API CALL)
  // ---------------------------------------
  container.querySelectorAll(".get-quote-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent redirect

      const id = btn.dataset.id;
      const category = btn.dataset.category;
      const product = products.find((p) => p.product_id == id);

      getQuoteForMood(category, product);
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

  const exists = wishlist.find(
    (item) => item.product_id === product.product_id
  );

  if (!exists) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(`${product.title} added to wishlist ❤️`);
  } else {
    alert("This item is already in your wishlist!");
  }
}

// ============================
// QUOTE API CALL
// ============================

/**
 * Fetches an inspirational quote from multiple APIs with fallback
 * Primary: ZenQuotes API (https://zenquotes.io)
 * Fallback: Advice Slip API (https://api.adviceslip.com)
 */
async function getQuoteForMood(category, product) {
  // Show loading state
  const btn = document.querySelector(
    `.get-quote-btn[data-id="${product.product_id}"]`
  );
  const originalText = btn.textContent;
  btn.textContent = "Loading...";
  btn.disabled = true;

  let quote = null;

  // Try ZenQuotes API first
  try {
    const response = await fetch("https://zenquotes.io/api/random");

    if (response.ok) {
      const data = await response.json();
      quote = {
        content: data[0].q, // quote text
        author: data[0].a, // author
      };
    }
  } catch (error) {
    console.log("ZenQuotes API failed, trying fallback...");
  }

  // Fallback to Advice Slip API if ZenQuotes fails
  if (!quote) {
    try {
      const response = await fetch("https://api.adviceslip.com/advice");

      if (response.ok) {
        const data = await response.json();
        quote = {
          content: data.slip.advice,
          author: "Anonymous",
        };
      }
    } catch (error) {
      console.log("Advice Slip API also failed");
    }
  }

  // If both APIs fail, use a local fallback quote
  if (!quote) {
    const fallbackQuotes = {
      relax: {
        content:
          "Take time to relax. It's not a waste of time, it's an investment in yourself.",
        author: "Unknown",
      },
      workout: {
        content: "The only bad workout is the one that didn't happen.",
        author: "Unknown",
      },
      study: {
        content:
          "The beautiful thing about learning is that no one can take it away from you.",
        author: "B.B. King",
      },
      hangout: {
        content: "Life is better when you're laughing with friends.",
        author: "Unknown",
      },
    };

    quote = fallbackQuotes[category] || {
      content: "Every moment is a fresh beginning.",
      author: "T.S. Eliot",
    };
  }

  // Display quote in a modal
  showQuoteModal(quote, product);

  // Reset button
  btn.textContent = originalText;
  btn.disabled = false;
}

/**
 * Displays the quote in a nice modal format
 */
function showQuoteModal(quote, product) {
  // Create modal overlay
  const modal = document.createElement("div");
  modal.className = "quote-modal-overlay";
  modal.innerHTML = `
    <div class="quote-modal">
      <div class="quote-modal-header">
        <h3>💭 Inspiration for "${product.title}"</h3>
        <button class="quote-modal-close">&times;</button>
      </div>
      <div class="quote-modal-content">
        <p class="quote-text">"${quote.content}"</p>
        <p class="quote-author">— ${quote.author}</p>
      </div>
    </div>
  `;

  // Add to body
  document.body.appendChild(modal);

  // Close button functionality
  const closeBtn = modal.querySelector(".quote-modal-close");
  const closeModal = () => {
    document.body.removeChild(modal);
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape key
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", handleEscape);
    }
  };
  document.addEventListener("keydown", handleEscape);
}

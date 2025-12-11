import { loadLayout } from "/src/partials/layout.mjs";
    loadLayout()
const wishlistContainer = document.querySelector("#wishlist_items");

function renderWishlist() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  const html = wishlist
    .map(
      (item) => `
    <div class="wishlist-item">
      <h3>${item.title}</h3>
      <p>₦${item.price}</p>
      <button class="remove-btn" data-id="${item.product_id}">Remove</button>
    </div>
  `
    )
    .join("");

  wishlistContainer.innerHTML = html;

  wishlistContainer.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.id;
      const newWishlist = wishlist.filter((i) => i.product_id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      renderWishlist();
    });
  });
}

renderWishlist();

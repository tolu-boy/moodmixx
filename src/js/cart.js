import { loadLayout } from "/src/partials/layout.mjs";
    loadLayout()
const cartContainer = document.querySelector("#cart_items");

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const html = cart
    .map(
      (item) => `
    <div class="cart-item">
      <h3>${item.title}</h3>
      <p>₦${item.price} × ${item.quantity}</p>
      <button class="remove-btn" data-id="${item.product_id}">Remove</button>
    </div>
  `
    )
    .join("");

  cartContainer.innerHTML = html;

  cartContainer.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.id;
      const newCart = cart.filter((i) => i.product_id !== productId);
      localStorage.setItem("cart", JSON.stringify(newCart));
      renderCart();
    });
  });
}

renderCart();

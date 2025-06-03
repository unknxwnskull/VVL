let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
let cartTotal = localStorage.getItem('cartTotal') !== null ? parseFloat(localStorage.getItem('cartTotal')) : 0.0;

const cartCountElem = document.querySelector('.cart-count');
const cartPriceElem = document.querySelector('.cart-price');

function updateCartDisplay() {
  cartCountElem.textContent = cartCount;
  cartPriceElem.textContent = (cartTotal === 0 ? '0.0' : cartTotal.toFixed(3)) + ' MDL';
}

updateCartDisplay();

 
localStorage.setItem('cart', JSON.stringify([
  { name: "Pantofi oxford VVL", price: 1900, img: "imgs/image 72.png", qty: 1 },
   { name: "Loaferi cu franj VVL", price: 1600, img: "imgs/image 47.png", qty: 1 }
]));

document.addEventListener('DOMContentLoaded', function () {
  const cartTableBody = document.querySelector('.cart-table tbody');
  const summarySubtotal = document.querySelector('.summary-subtotal');
  const summaryTotal = document.querySelector('.summary-total');
  const cartCount = document.querySelector('.cart-count');
  const cartPrice = document.querySelector('.cart-price');

  function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartTableBody.innerHTML = '';
    let subtotal = 0;
    let totalCount = 0;

    cart.forEach((item, idx) => {
      subtotal += item.price * item.qty;
      totalCount += item.qty;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="cart-product">
          <button class="remove-item" data-idx="${idx}" title="Remove"><span>&times;</span></button>
          <img src="${item.img}" alt="${item.name}" class="cart-product-img">
          <span class="cart-product-name"><b>${item.name}</b></span>
        </td>
        <td class="cart-price">${item.price.toLocaleString('ro-RO')} MDL</td>
        <td class="cart-qty">
          <div class="qty-selector">
            <button class="qty-decrease" data-idx="${idx}" ${item.qty <= 1 ? 'disabled' : ''}>-</button>
            <input type="number" value="${item.qty}" min="1" readonly>
            <button class="qty-increase" data-idx="${idx}">+</button>
          </div>
        </td>
        <td class="cart-subtotal">${(item.price * item.qty).toLocaleString('ro-RO')} MDL</td>
      `;
      cartTableBody.appendChild(tr);
    });

    summarySubtotal.textContent = `${subtotal.toLocaleString('ro-RO')} MDL`;
    summaryTotal.textContent = `${subtotal.toLocaleString('ro-RO')} MDL`;
    cartCount.textContent = totalCount;
    cartPrice.textContent = `${subtotal.toLocaleString('ro-RO')} MDL`;

    // Attach events for remove and quantity buttons
    cartTableBody.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', function () {
        const idx = +this.dataset.idx;
        cart.splice(idx, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
    cartTableBody.querySelectorAll('.qty-decrease').forEach(btn => {
      btn.addEventListener('click', function () {
        const idx = +this.dataset.idx;
        if (cart[idx].qty > 1) {
          cart[idx].qty--;
          localStorage.setItem('cart', JSON.stringify(cart));
          renderCart();
        }
      });
    });
    cartTableBody.querySelectorAll('.qty-increase').forEach(btn => {
      btn.addEventListener('click', function () {
        const idx = +this.dataset.idx;
        cart[idx].qty++;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }

  renderCart();
});

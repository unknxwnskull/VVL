let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
let cartTotal = localStorage.getItem('cartTotal') !== null ? parseFloat(localStorage.getItem('cartTotal')) : 0.0;

const cartCountElem = document.querySelector('.cart-count');
const cartPriceElem = document.querySelector('.cart-price');

function updateCartDisplay() {
  cartCountElem.textContent = cartCount;
  cartPriceElem.textContent = (cartTotal === 0 ? '0.0' : cartTotal.toFixed(3)) + ' MDL';
}

updateCartDisplay();


document.querySelectorAll('.add-favourites').forEach(fav => {
    fav.addEventListener('click', function () {
        const heart = fav.querySelector('i');
        const isActive = fav.classList.toggle('favourite-active');
        if (isActive) {
            heart.classList.remove('fa-regular');
            heart.classList.add('fa-solid');
            heart.style.color = '#c0392b';
            fav.style.color = '#c0392b';
            fav.innerHTML = '<i class="fa-solid fa-heart" style="color:#c0392b"></i> Added to favourites';
        } else {
            heart.classList.remove('fa-solid');
            heart.classList.add('fa-regular');
            heart.style.color = '';
            fav.style.color = '';
            fav.innerHTML = '<i class="fa-regular fa-heart"></i> Add to favourites';
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
  const decreaseBtn = document.getElementById('decrease-qty');
  const increaseBtn = document.getElementById('increase-qty');
  const qtyInput = document.getElementById('quantity-input');
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  const cartCount = document.querySelector('.cart-count');
  const cartPrice = document.querySelector('.cart-price');
  const pricePerItem = 1800;

  decreaseBtn.addEventListener('click', function() {
    let qty = parseInt(qtyInput.value, 10);
    if (qty > 1) {
      qtyInput.value = qty - 1;
    }
  });

  increaseBtn.addEventListener('click', function() {
    let qty = parseInt(qtyInput.value, 10);
    qtyInput.value = qty + 1;
  });

  addToCartBtn.addEventListener('click', function() {
    let qty = parseInt(qtyInput.value, 10);
    cartCount.textContent = qty;
    cartPrice.textContent = (qty * pricePerItem) + ' MDL';
    addToCartBtn.textContent = "Added!";
    setTimeout(() => addToCartBtn.textContent = "add to cart", 1200);
  });
});
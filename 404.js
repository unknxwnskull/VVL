let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
let cartTotal = localStorage.getItem('cartTotal') !== null ? parseFloat(localStorage.getItem('cartTotal')) : 0.0;

const cartCountElem = document.querySelector('.cart-count');
const cartPriceElem = document.querySelector('.cart-price');

function updateCartDisplay() {
  cartCountElem.textContent = cartCount;
  cartPriceElem.textContent = (cartTotal === 0 ? '0.0' : cartTotal.toFixed(3)) + ' MDL';
}

updateCartDisplay();


 const burger = document.getElementById('burgerMenu');
  const nav = document.querySelector('.nav-content');
  burger.addEventListener('click', function() {
    nav.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  document.querySelectorAll('.nav-content a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
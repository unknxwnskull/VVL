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
  const mainImage = document.getElementById('mainProductImage');
  const thumbnails = document.querySelectorAll('#productThumbnails .thumb');

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
      // Remove active class from all thumbnails
      thumbnails.forEach(t => t.classList.remove('active'));
      // Set main image src to the clicked thumbnail's data-large
      mainImage.src = this.getAttribute('data-large');
      // Add active class to the clicked thumbnail
      this.classList.add('active');
    });
  });
});
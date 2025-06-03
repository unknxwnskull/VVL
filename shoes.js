let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
let cartTotal = localStorage.getItem('cartTotal') !== null ? parseFloat(localStorage.getItem('cartTotal')) : 0.0;

const cartCountElem = document.querySelector('.cart-count');
const cartPriceElem = document.querySelector('.cart-price');

function updateCartDisplay() {
  cartCountElem.textContent = cartCount;
  cartPriceElem.textContent = (cartTotal === 0 ? '0.0' : cartTotal.toFixed(3)) + ' MDL';
}

updateCartDisplay();


document.querySelectorAll('.product-card .add-to-cart').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const card = btn.closest('.product-card');
    const priceElem = card.querySelector('.product-price');
    let price = 0;
    if (priceElem) {
      price = parseFloat(priceElem.textContent.replace(/[^\d.,]/g, '').replace(',', '.'));
    }


    const inCart = card.classList.toggle('in-cart');
    if (inCart) {
      cartCount += 1;
      cartTotal += price;
      btn.textContent = 'Added to cart';
      btn.classList.add('added');
    } else {
      cartCount -= 1;
      cartTotal -= price;
      btn.textContent = 'Add to cart';
      btn.classList.remove('added');
    }

    localStorage.setItem('cartCount', cartCount);
    localStorage.setItem('cartTotal', cartTotal);
    updateCartDisplay();
  });
});

document.querySelectorAll('.quick-view-icon').forEach(icon => {
  icon.addEventListener('click', function(e) {
    const card = icon.closest('.product-card');
    const modal = document.getElementById('quick-view-modal');
    const body = modal.querySelector('.quick-view-body');
  
    const imgSrc = card.querySelector('.product-image').src;
    const name = card.getAttribute('data-name') || card.querySelector('.product-name').textContent;
    const price = card.getAttribute('data-price') || card.querySelector('.product-price').textContent;
    const brand = card.getAttribute('data-brand') || '';
    const color = card.getAttribute('data-color') || '';
    const size = card.getAttribute('data-size') || '';
    const material = card.getAttribute('data-material') || '';

    body.innerHTML = `
      <img src="${imgSrc}" alt="${name}">
      <div class="quick-view-details">
        <h2>${name}</h2>
        <div class="qv-price">${price}</div>
        <div class="qv-row"><b>Brand</b>: ${brand}</div>
        <div class="qv-row"><b>Culoare</b>: ${color}</div>
        <div class="qv-row"><b>Mărime</b>: ${size}</div>
        <div class="qv-row"><b>Material</b>: ${material}</div>
        <button class="qv-add">Add to cart</button>
      </div>
    `;
    modal.classList.add('active');

    body.querySelector('.qv-add').onclick = function() {
      let modalPrice = 0;
      const modalPriceElem = body.querySelector('.qv-price');
      if (modalPriceElem) {
        modalPrice = parseFloat(modalPriceElem.textContent.replace(/[^\d.,]/g, '').replace(',', '.'));
      }
      cartCount += 1;
      cartTotal += modalPrice;

      localStorage.setItem('cartCount', cartCount);
      localStorage.setItem('cartTotal', cartTotal);
      updateCartDisplay();
      document.getElementById('quick-view-modal').classList.remove('active');

      // Show popup message
      showPopupMsg('Added to cart');
    };
  });
});

document.querySelector('.quick-view-close').onclick = function() {
  document.getElementById('quick-view-modal').classList.remove('active');
};
document.getElementById('quick-view-modal').addEventListener('click', function(e) {
  if (e.target === this) this.classList.remove('active');
});

document.querySelectorAll('.product-card .fa-heart').forEach(icon => {
  icon.addEventListener('click', function(e) {
    e.preventDefault();
    if (icon.classList.contains('active-heart')) {
      icon.classList.remove('active-heart');
      icon.style.color = '';
    } else {
      icon.classList.add('active-heart');
      icon.style.color = '#c0392b';
    }
  });
});

// Utility function to show popup message
function showPopupMsg(msg) {
  let popup = document.createElement('div');
  popup.className = 'popup-msg';
  popup.textContent = msg;
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.classList.add('show');
  }, 10);
  setTimeout(() => {
    popup.classList.remove('show');
    setTimeout(() => popup.remove(), 300);
  }, 1800);
}


document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-bar input[type="text"]');
    const productCards = document.querySelectorAll('.product-card');

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const query = searchInput.value.trim().toLowerCase();
            productCards.forEach(card => {
                const name = card.querySelector('.product-name').textContent.toLowerCase();
                if (name.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// --- Live search dropdown/autocomplete ---

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-bar input[type="text"]');
    const productCards = document.querySelectorAll('.product-card');

    // Create dropdown container
    let dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown';
    dropdown.style.display = 'none';
    dropdown.style.position = 'absolute';
    dropdown.style.top = '100%';
    dropdown.style.left = '0';
    dropdown.style.right = '0';
    dropdown.style.background = '#fff';
    dropdown.style.zIndex = '1000';
    dropdown.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
    dropdown.style.maxHeight = '350px';
    dropdown.style.overflowY = 'auto';
    dropdown.style.borderRadius = '0 0 8px 8px';
    dropdown.style.padding = '0';

    // Attach dropdown to search bar
    const searchBar = document.querySelector('.search-bar');
    searchBar.style.position = 'relative';
    searchBar.appendChild(dropdown);

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim().toLowerCase();
        dropdown.innerHTML = '';
        if (!query) {
            dropdown.style.display = 'none';
            productCards.forEach(card => card.style.display = '');
            return;
        }
        let found = 0;
        productCards.forEach(card => {
            const name = card.querySelector('.product-name').textContent;
            if (name.toLowerCase().includes(query)) {
                found++;
                // Build dropdown item
                let img = card.querySelector('.product-image');
                let price = card.querySelector('.product-price');
                let item = document.createElement('div');
                item.className = 'search-dropdown-item';
                item.style.display = 'flex';
                item.style.alignItems = 'center';
                item.style.padding = '10px 14px';
                item.style.cursor = 'pointer';
                item.style.borderBottom = '1px solid #eee';
                item.style.transition = 'background 0.2s';
                item.onmouseover = () => item.style.background = '#f5f5f5';
                item.onmouseout = () => item.style.background = '#fff';

                if (img) {
                    let imgEl = document.createElement('img');
                    imgEl.src = img.src;
                    imgEl.alt = name;
                    imgEl.style.width = '40px';
                    imgEl.style.height = '40px';
                    imgEl.style.objectFit = 'cover';
                    imgEl.style.borderRadius = '6px';
                    imgEl.style.marginRight = '12px';
                    item.appendChild(imgEl);
                }
                let info = document.createElement('div');
                info.innerHTML = `<div style="font-weight:600;">${name}</div>
                    <div style="font-size:13px;color:#6b2c2c;">${price ? price.textContent : ''}</div>`;
                item.appendChild(info);

                // On click, scroll to product and highlight
                item.onclick = () => {
                    dropdown.style.display = 'none';
                    searchInput.value = name;
                    productCards.forEach(c => c.style.display = 'none');
                    card.style.display = '';
                    card.scrollIntoView({behavior: 'smooth', block: 'center'});
                    card.style.boxShadow = '0 0 0 3px #6b2c2c';
                    setTimeout(() => card.style.boxShadow = '', 1200);
                };
                dropdown.appendChild(item);
            } else {
                card.style.display = 'none';
            }
        });
        dropdown.style.display = found ? 'block' : 'none';
    });

    // Hide dropdown on blur (with delay for click)
    searchInput.addEventListener('blur', function () {
        setTimeout(() => dropdown.style.display = 'none', 200);
    });
    searchInput.addEventListener('focus', function () {
        if (dropdown.innerHTML.trim()) dropdown.style.display = 'block';
    });
});
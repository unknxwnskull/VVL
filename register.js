function togglePassword(id, el) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
        el.innerHTML = '<i class="fa fa-eye-slash"></i>';
    } else {
        input.type = "password";
        el.innerHTML = '<i class="fa fa-eye"></i>';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
let cartTotal = localStorage.getItem('cartTotal') !== null ? parseFloat(localStorage.getItem('cartTotal')) : 0.0;

const cartCountElem = document.querySelector('.cart-count');
const cartPriceElem = document.querySelector('.cart-price');

function updateCartDisplay() {
  cartCountElem.textContent = cartCount;
  cartPriceElem.textContent = (cartTotal === 0 ? '0.0' : cartTotal.toFixed(3)) + ' MDL';
}

updateCartDisplay();


    const countrySelect = document.getElementById('country-select');
    const countryFlag = document.getElementById('country-flag');
    const countryCode = document.getElementById('country-code');

    if (countrySelect && countryFlag && countryCode) {
        countrySelect.addEventListener('change', function() {
            const selectedOption = countrySelect.options[countrySelect.selectedIndex];
            countryFlag.src = selectedOption.getAttribute('data-flag');
            countryCode.textContent = selectedOption.value;
        });
    }


    const passwordInput = document.getElementById('password');
    const requirements = [
        {
            test: pwd => pwd.length >= 8,
            selector: '.pw-req-length'
        },
        {
            test: pwd => /[A-Z]/.test(pwd),
            selector: '.pw-req-uppercase'
        },
        {
            test: pwd => /\d/.test(pwd),
            selector: '.pw-req-number'
        },
        {
            test: pwd => !/[^\w\s]/.test(pwd) || !/[\/#%&\.\*\^]/.test(pwd),
            selector: '.pw-req-special'
        }
    ];

       if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const pwd = passwordInput.value;
            requirements.forEach(req => {
                const li = document.querySelector(req.selector);
                if (!li) return;
                if (pwd.length === 0) {
                    li.classList.remove('valid', 'invalid');
                } else if (req.test(pwd)) {
                    li.classList.add('valid');
                    li.classList.remove('invalid');
                } else {
                    li.classList.remove('valid');
                    li.classList.add('invalid');
                }
            });
        });
       }
    });
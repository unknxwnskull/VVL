// --- Simple checkout form validation and order button ---

document.addEventListener('DOMContentLoaded', function () {
    const orderBtn = document.querySelector('.place-order-btn');
    const formInputs = document.querySelectorAll('.billing-form input[required]');
    const deliveryRadios = document.querySelectorAll('.order-summary input[type="radio"]');

    // Delivery price update (optional, if you want to update total)
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            // You can implement dynamic price update here if needed
        });
    });

    if (orderBtn) {
        orderBtn.addEventListener('click', function (e) {
            let valid = true;
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.border = '1.5px solid #e53935';
                    valid = false;
                } else {
                    input.style.border = '';
                }
            });
            if (!valid) {
                alert('Te rugăm să completezi toate câmpurile obligatorii!');
                e.preventDefault();
                return false;
            }
            alert('Comanda a fost plasată cu succes!');
        });
    }
});
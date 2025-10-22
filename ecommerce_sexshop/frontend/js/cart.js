document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceSpan = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    function displayCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item';
                itemDiv.innerHTML = `
                    <h4>${item.name}</h4>
                    <p>Cantidad: ${item.quantity}</p>
                    <p>Precio: $${(item.price * item.quantity).toFixed(2)}</p>
                `;
                cartItemsContainer.appendChild(itemDiv);
                total += item.price * item.quantity;
            });
        }
        totalPriceSpan.textContent = total.toFixed(2);
    }

    async function checkout() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('El carrito está vacío. Añade productos para comprar.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    products: cart,
                    customer_name: "Cliente", 
                    customer_email: "cliente@ejemplo.com" 
                })
            });
            const result = await response.json();

            if (response.ok) {
                alert("¡Pedido realizado con éxito!");
                localStorage.removeItem('cart'); // Limpia el carrito después de la compra
                window.location.href = 'index.html';
            } else {
                alert(`Error: ${result.error}`);
            }

        } catch (error) {
            console.error('Error durante el proceso de pago:', error);
            alert('Hubo un error al procesar tu pedido. Inténtalo de nuevo.');
        }
    }

    checkoutBtn.addEventListener('click', checkout);
    displayCart();
});
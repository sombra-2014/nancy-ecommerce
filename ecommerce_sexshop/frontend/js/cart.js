<<<<<<< HEAD
// Función para obtener el carrito del localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Función para guardar el carrito en el localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para renderizar el carrito
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = getCart();
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        document.getElementById('checkout-info').style.display = 'none';
        document.getElementById('cart-total-container').style.display = 'none';
        return;
    }
    
    document.getElementById('checkout-info').style.display = 'block';
    document.getElementById('cart-total-container').style.display = 'block';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="item-details">
                <p class="item-name">${item.name}</p>
                <p class="item-price">$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn decrease-btn" data-product-id="${item.id}">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="quantity-btn increase-btn" data-product-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item-btn" data-product-id="${item.id}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Función para manejar la finalización de la compra
async function handleFinalizePurchase(event) {
    event.preventDefault();

    const customerName = document.getElementById('customer-name').value;
    const customerEmail = document.getElementById('customer-email').value;
    const message = document.getElementById('message').value;

    const cart = getCart();

    const productsToSend = cart.map(item => ({
        id: item.id,
        quantity: item.quantity
    }));

    try {
        const response = await fetch('http://127.0.0.1:5000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customer_name: customerName,
                customer_email: customerEmail,
                products: productsToSend,
                message: message
            })
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            localStorage.removeItem('cart');
            window.location.href = 'index.html';
        } else {
            alert('Error: ' + result.error);
        }
    } catch (error) {
        console.error('Error al finalizar la compra:', error);
        alert('Hubo un error al conectar con el servidor. Intenta de nuevo más tarde.');
    }
}

// Lógica para todos los eventos del carrito (eliminar, aumentar/disminuir)
document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleFinalizePurchase);
    }
    
    // Usamos event delegation para manejar clics en elementos dinámicos
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (event) => {
            const button = event.target.closest('button');
            if (!button) return;

            const productId = parseInt(button.dataset.productId);
            let cart = getCart();
            const item = cart.find(i => i.id === productId);

            // Eliminar producto
            if (button.classList.contains('remove-item-btn')) {
                cart = cart.filter(i => i.id !== productId);
                saveCart(cart);
                renderCart();
            }
            
            // Aumentar cantidad
            if (button.classList.contains('increase-btn') && item) {
                item.quantity++;
                saveCart(cart);
                renderCart();
            }

            // Disminuir cantidad
            if (button.classList.contains('decrease-btn') && item && item.quantity > 1) {
                item.quantity--;
                saveCart(cart);
                renderCart();
            }
        });
    }
=======
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
>>>>>>> 0efb8d95120bae3838f47150d42660585a8dc3d1
});
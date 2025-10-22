<<<<<<< HEAD
async function fetchOrders() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/orders');
        const orders = await response.json();
        renderOrders(orders);
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
    }
}

function renderOrders(orders) {
    const ordersContainer = document.getElementById('orders-container');
    ordersContainer.innerHTML = '';
    
    if (orders.length === 0) {
        ordersContainer.innerHTML = '<p>No hay pedidos aún.</p>';
        return;
    }

    orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        
        const productListHTML = order.products.map(item => `
            <li>${item.name} (x${item.quantity}) - $${item.price.toFixed(2)}</li>
        `).join('');

        orderCard.innerHTML = `
            <div class="order-header">
                <h3>Pedido #${order.id}</h3>
                <p class="order-date">${new Date(order.order_date).toLocaleString()}</p>
            </div>
            <div class="order-details">
                <p><strong>Cliente:</strong> ${order.customer_name || 'N/A'}</p>
                <p><strong>Email/WhatsApp:</strong> ${order.customer_email || 'N/A'}</p>
                <p><strong>Mensaje:</strong> ${order.message || 'N/A'}</p>
                <h4>Productos:</h4>
                <ul class="order-products">
                    ${productListHTML}
                </ul>
            </div>
            <div class="order-footer">
                <p><strong>Total:</strong> $${order.total_price.toFixed(2)}</p>
                <span class="order-status ${order.status}">${order.status}</span>
            </div>
            <button class="delete-order-btn" data-order-id="${order.id}">Eliminar Pedido</button>
        `;
        ordersContainer.appendChild(orderCard);
    });

    // Lógica para los botones de eliminar
    const deleteButtons = document.querySelectorAll('.delete-order-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const orderId = button.dataset.orderId;
            if (confirm(`¿Estás seguro de que quieres eliminar el pedido #${orderId}?`)) {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/api/orders/${orderId}`, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        alert('Pedido eliminado correctamente.');
                        fetchOrders(); // Recargar la lista de pedidos
                    } else {
                        const error = await response.json();
                        alert(`Error: ${error.error}`);
                    }
                } catch (error) {
                    console.error('Error al conectar con el servidor:', error);
                    alert('Hubo un error al intentar eliminar el pedido.');
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', fetchOrders);
=======
document.addEventListener('DOMContentLoaded', () => {
    const ordersTableBody = document.querySelector('#orders-table tbody');

    async function fetchOrders() {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/orders');
            const orders = await response.json();
            
            ordersTableBody.innerHTML = '';
            
            if (orders.length === 0) {
                ordersTableBody.innerHTML = '<tr><td colspan="7">No hay pedidos registrados.</td></tr>';
                return;
            }

            orders.forEach(order => {
                const row = document.createElement('tr');
                
                // Formatear la lista de productos
                const productsList = order.products.map(p => `${p.name} (x${p.quantity})`).join('<br>');

                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${order.customer_name}</td>
                    <td>${order.customer_email}</td>
                    <td>${order.order_date}</td>
                    <td>${productsList}</td>
                    <td>$${order.total_price.toFixed(2)}</td>
                    <td>${order.status}</td>
                `;
                ordersTableBody.appendChild(row);
            });

        } catch (error) {
            console.error('Error al cargar los pedidos:', error);
            ordersTableBody.innerHTML = '<tr><td colspan="7">Error al cargar los pedidos.</td></tr>';
        }
    }

    fetchOrders();
});
>>>>>>> 0efb8d95120bae3838f47150d42660585a8dc3d1

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
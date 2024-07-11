document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const carritoDOM = document.getElementById('carrito');
    const finalizarCompra = document.getElementById('finalizarCompra');

    // Función para actualizar el carrito en el DOM y en localStorage
    function actualizarCarrito() {
        carritoDOM.innerHTML = '';

        carrito.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('carrito-item', 'd-flex', 'justify-content-between', 'align-items-center');
            div.innerHTML = `
                <div>
                    <h5>${item.name}</h5>
                    <p>${item.description}</p>
                </div>
                <div>
                    <span>$${item.price}</span>
                    <button class="btn btn-danger btn-sm ms-2 eliminar-item m-3">Eliminar</button>
                    <input type="number" min="1" class="form-control form-control-sm cantidad" value="${item.quantity}">
                </div>
            `;
            carritoDOM.appendChild(div);
        });

        const total = carrito.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        document.getElementById('total').textContent = total.toFixed(2);

        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Vincular eventos después de actualizar el carrito
        agregarEventos();
    }

    // Función para agregar eventos a los elementos del carrito
    function agregarEventos() {
        carritoDOM.querySelectorAll('.eliminar-item').forEach(boton => {
            boton.addEventListener('click', eliminarItem);
        });

        carritoDOM.querySelectorAll('.cantidad').forEach(input => {
            input.addEventListener('change', actualizarCantidad);
        });

        finalizarCompra.addEventListener('click', finalizarCompraHandler);
    }

    // Función para eliminar un item del carrito
    function eliminarItem(event) {
        const nombre = event.target.parentElement.previousElementSibling.querySelector('h5').textContent;
        carrito = carrito.filter(item => item.name !== nombre);
        actualizarCarrito();
    }

    // Función para actualizar la cantidad de un producto en el carrito
    function actualizarCantidad(event) {
        const cantidad = parseInt(event.target.value);
        const nombre = event.target.parentElement.previousElementSibling.querySelector('h5').textContent;
        const index = carrito.findIndex(item => item.name === nombre);
        if (index !== -1) {
            carrito[index].quantity = cantidad;
            actualizarCarrito();
        }
    }

    // Función para finalizar la compra
    function finalizarCompraHandler() {
        if (carrito.length > 0) {
            alert('Compra finalizada con éxito!');
            carrito = [];
            localStorage.removeItem('carrito');
            actualizarCarrito();
        } else {
            alert('No hay productos en el carrito.');
        }
    }

    // Inicializar el carrito al cargar la página
    actualizarCarrito();
});

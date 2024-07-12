document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const carritoDOM = document.getElementById('carrito');
    const finalizarCompra = document.getElementById('finalizarCompra');
    const pedidoForm = document.getElementById('pedidoForm');
    const pedidoModal = new bootstrap.Modal(document.getElementById('pedidoModal'));

    function actualizarCarrito() {
        carritoDOM.innerHTML = '';

        carrito.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('carrito-item', 'd-flex', 'justify-content-between', 'align-items-center');
            div.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p class="fs-5">${item.description}</p>
                    <hr>
                </div>
                <div>
                    <span class="fs-5">$${item.price}</span>
                    <button class="btn btn-danger btn-sm ms-2 eliminar-item m-3">Eliminar</button>
                    <input type="number" min="1" class="form-control form-control-sm cantidad" value="${item.quantity}">
                    <hr>
                </div>
            `;
            carritoDOM.appendChild(div);
        });

        const total = carrito.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        document.getElementById('total').textContent = total.toFixed(2);

        localStorage.setItem('carrito', JSON.stringify(carrito));

        agregarEventos();
    }

    function agregarEventos() {
        carritoDOM.querySelectorAll('.eliminar-item').forEach(boton => {
            boton.addEventListener('click', eliminarItem);
        });

        carritoDOM.querySelectorAll('.cantidad').forEach(input => {
            input.addEventListener('change', actualizarCantidad);
        });

        finalizarCompra.addEventListener('click', mostrarFormularioPedido);
    }

    function eliminarItem(event) {
        const nombre = event.target.parentElement.previousElementSibling.querySelector('h4').textContent;
        carrito = carrito.filter(item => item.name !== nombre);
        actualizarCarrito();
    }

    function actualizarCantidad(event) {
        const cantidad = parseInt(event.target.value);
        const nombre = event.target.parentElement.previousElementSibling.querySelector('h4').textContent;
        const index = carrito.findIndex(item => item.name === nombre);
        if (index !== -1) {
            carrito[index].quantity = cantidad;
            actualizarCarrito();
        }
    }

    function mostrarFormularioPedido() {
        if (carrito.length > 0) {
            pedidoModal.show();
        } else {
            alert('No hay productos en el carrito.');
        }
    }

    pedidoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const direccion = document.getElementById('direccion').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;

        console.log('Pedido confirmado:', { nombre, direccion, telefono, correo, carrito });

        alert('Pedido confirmado. Gracias por tu compra!');
        carrito = [];
        localStorage.removeItem('carrito');
        actualizarCarrito();
        pedidoModal.hide();
        pedidoForm.reset();
    });

    actualizarCarrito();
});

document.addEventListener('DOMContentLoaded', function() {
    const botonesAgregar = document.querySelectorAll('.carrito');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    function agregarAlCarrito(event) {
        event.preventDefault();
        const boton = event.target;
        const nombre = boton.dataset.name;
        const descripcion = boton.dataset.description;
        const precio = parseFloat(boton.dataset.price);

        if (nombre && descripcion && !isNaN(precio)) {
            const producto = {
                name: nombre,
                description: descripcion,
                price: precio,
                quantity: 1
            };

            agregarProductoAlLocalStorage(producto);
            actualizarCarrito();
        } else {
            console.error('No se encontraron o no se pudieron obtener los datos del producto.');
        }
    }

    function agregarProductoAlLocalStorage(producto) {
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let existente = false;

        carrito.forEach(item => {
            if (item.name === producto.name) {
                item.quantity++;
                existente = true;
            }
        });

        if (!existente) {
            carrito.push(producto);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function actualizarCarrito() {
        const carritoDOM = document.getElementById('carrito');
        carritoDOM.innerHTML = '';

        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

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
                    <button class="btn btn-danger btn-sm ms-2 eliminar-item">Eliminar</button>
                    <input type="number" min="1" class="form-control form-control-sm cantidad" value="${item.quantity}">
                </div>
            `;
            carritoDOM.appendChild(div);
        });

        const total = carrito.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        document.getElementById('total').textContent = total.toFixed(2);

        inicializarEventosCarrito(); // Asegúrate de tener esta función si hay eventos adicionales en el carrito
    }

    function inicializarEventosCarrito() {
        // Aquí puedes inicializar eventos adicionales en los elementos del carrito si es necesario
        // Por ejemplo, eventos para eliminar productos o cambiar cantidades
    }
});

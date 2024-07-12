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
                    <span class>$${item.price}</span>
                    <button class="btn btn-danger btn-sm ms-2 eliminar-item">Eliminar</button>
                    <input type="number" min="1" class="form-control form-control-sm cantidad" value="${item.quantity}">
                </div>
            `;
            carritoDOM.appendChild(div);
        });

        const total = carrito.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        document.getElementById('total').textContent = total.toFixed(2);

        // Actualizar el contador de productos en el carrito
        const cantidadTotal = carrito.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('contador-carrito').textContent = cantidadTotal.toString();

        // Añadir animación al contador de carrito
        const contadorCarrito = document.getElementById('contador-carrito');
        contadorCarrito.classList.add('animate__animated', 'animate__pulse');

        // Remover la clase de animación después de un tiempo para que pueda repetirse
        setTimeout(() => {
            contadorCarrito.classList.remove('animate__animated', 'animate__pulse');
        }, 500); // 500 milisegundos, ajusta este valor según la duración de tu animación
    }
});

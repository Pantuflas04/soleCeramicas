


//modal open

const popup = document.getElementById('popup');

document.getElementById('openPopup').addEventListener('click', function () {
    // Verifica el estado actual del popup y alterna entre mostrar y ocultar
    if (popup.style.display === 'block') {
        popup.style.display = 'none'; // Si está visible, ocúltalo
    } else {
        popup.style.display = 'block'; // Si está oculto, muéstralo
        // Agrega la clase con la animación al abrir el modal
        popup.classList.add('fadeInTop');
    }
});

document.getElementById('closePopup').addEventListener('click', function () {
    popup.style.display = 'none';
});


document.getElementById('closePopup').addEventListener('click', function () {
    document.getElementById('popup').style.display = 'none';
});


const productos = [
    {
        "id": 1,
        "nombre": "Maceta Frida 1",
        "precio": 19.99,
        "imagen": "../img/menu/Fridas_sola__1_-removebg-preview.png",
        "descripcion": "Maceta con forma de Frida Kahlo, diseño 1"
    },
    {
        "id": 2,
        "nombre": "Maceta Frida 2",
        "precio": 24.99,
        "imagen": "../img/menu/Fridas_sola__2_-removebg-preview.png",
        "descripcion": "Maceta con forma de Frida Kahlo, diseño 2"
    },
    {
        "id": 3,
        "nombre": "Maceta Frida 3",
        "precio": 29.99,
        "imagen": "../img/menu/Fridas_sola__4_-removebg-preview.png",
        "descripcion": "Maceta con forma de Frida Kahlo, diseño 3"
    },
    {
        "id": 4,
        "nombre": "Maceta Frida 4",
        "precio": 22.99,
        "imagen": "../img/menu/Fridas_sola__5_-removebg-preview.png",
        "descripcion": "Maceta con forma de Frida Kahlo, diseño 4"
    },
    {
        "id": 5,
        "nombre": "Maceta Frida 5",
        "precio": 27.99,
        "imagen": "../img/menu/Fridas_sola__6_-removebg-preview.png",
        "descripcion": "Maceta con forma de Frida Kahlo, diseño 5"
    },
    {
        "id": 6,
        "nombre": "Maceta Frida 6",
        "precio": 32.99,
        "imagen": "../img/menu/Fridas_sola__7_-removebg-preview.png",
        "descripcion": "Maceta con forma de Frida Kahlo, diseño 6"
    }
]

class Producto {
    constructor(id, nombre, precio, img ) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
 
    }
}

const productosInstancias = productos.map(({ id, nombre, precio, imagen }) => new Producto(id, nombre, precio, imagen ));

// Obtén el contenedor en el que deseas mostrar los productos
const contenedorProductos = document.getElementById('contenedor-productos');

productosInstancias.map(producto => {
    contenedorProductos.innerHTML += `
    <div class="producto card">
    <img src="${producto.img}" alt="${producto.nombre}" class="card-img-top img-fluid">
    <div class="card-body">
        <h3>${producto.nombre}</h3>
        <p>${'$' + producto.precio.toFixed(2)}</p>
        <button class="btn btn-light" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    </div>
</div>

    `;
});

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar un producto al carrito
const agregarAlCarrito = (idProducto) => {
    // Buscar el producto en el arreglo de productos
    let producto = encontrarProductoPorId(idProducto);

    if (producto) {
        // Verificar si el producto ya está en el carrito
        let productoExistente = carrito.find(item => item.id === idProducto);

        if (productoExistente) {
            // Si el producto ya está en el carrito, puedes incrementar la cantidad o hacer lo que desees
            productoExistente.cantidad++;
        } else {
            // Si el producto no está en el carrito, agrégalo con una cantidad inicial de 1
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1
            });
        }

        // Puedes realizar otras acciones, como actualizar la interfaz de usuario
        actualizarCarritoUI();
        // Guardar el carrito en localStorage
        guardarCarritoEnLocalStorage();
    } else {
        console.error("Producto no encontrado");
    }
};

// Función para encontrar un producto por su ID
const encontrarProductoPorId = (idProducto) => {
    return productosInstancias.find(producto => producto.id === idProducto);
};

// Función para actualizar la interfaz de usuario
const actualizarCarritoUI = () => {
    const popupContent = document.querySelector('.popup-content');

    // Limpiar el contenido actual del carrito
    popupContent.innerHTML = '';

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
        popupContent.innerHTML = '<p>El carrito está vacío</p>';
    } else {
        // Iterar sobre los productos en el carrito y agregarlos al contenido del popup
        carrito.forEach((item, index) => {
            const productoHTML = `
            <div class="carrito-item">
            <div>
                <span>   ${item.nombre}</span>
                <span><strong>Cantidad:</strong> ${item.cantidad}</span>
                <span><strong>Precio:</strong> ${'$' + (item.precio * item.cantidad).toFixed(2)}</span>
                <button class="btn btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
            </div>
           
        </div>
            `;
            popupContent.innerHTML += productoHTML;
        });
    }
};

// Función para eliminar un producto del carrito
const eliminarDelCarrito = (index) => {
    carrito.splice(index, 1); // Eliminar el elemento en la posición index
    // Actualizar la interfaz de usuario y guardar el carrito actualizado en localStorage
    actualizarCarritoUI();
    guardarCarritoEnLocalStorage();
};

// Función para guardar el carrito en localStorage
const guardarCarritoEnLocalStorage = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

// Ejemplo de uso: agregar el primer producto al carrito y actualizar la interfaz de usuario
agregarAlCarrito(1);
actualizarCarritoUI();
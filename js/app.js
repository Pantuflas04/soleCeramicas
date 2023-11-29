


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
    constructor(id, nombre, precio, img, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.descripcion = descripcion;
    }
}

const productosInstancias = productos.map(({ id, nombre, precio, imagen, descripcion }) => new Producto(id, nombre, precio, imagen, descripcion));

// Obtén el contenedor en el que deseas mostrar los productos
const contenedorProductos = document.getElementById('contenedor-productos');

productosInstancias.map(producto => {
    contenedorProductos.innerHTML += `
    <div class="producto card card-body">
    <img src="${producto.img}" alt="${producto.nombre}" class="card-img-top img-fluid">
    <hr>
    <h3>${producto.nombre}</h3>
    <p>${'$' + producto.precio.toFixed(2)}</p>
    <p>${producto.descripcion}</p>
    <button class="btn btn-light" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
</div>
    `;
});


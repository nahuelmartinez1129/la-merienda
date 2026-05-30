// ==========================
// PRODUCTOS
// ==========================

const productos = [
    {
        id: 1,
        nombre: "Cookies Clásicas",
        descripcion: "Cookies artesanales con chips de chocolate.",
        precio: 2500,
        imagen: "img/cookies.jpg",
        destacado: false
    },

    {
        id: 2,
        nombre: "Tortitas Raspaditas",
        descripcion: "Tortitas recién horneadas ideales para el mate.",
        precio: 1000,
        imagen: "img/tortitas.jpg",
        destacado: true
    },

    {
        id: 3,
        nombre: "Budín Artesanal",
        descripcion: "Budín húmedo y esponjoso.",
        precio: 4500,
        imagen: "img/budin.jpg",
        destacado: false
    },

    {
        id: 4,
        nombre: "Combo Mate",
        descripcion: "6 tortitas + 4 cookies",
        precio: 8500,
        imagen: "img/combo-mate.png",
        destacado: true
    },

    {
        id: 5,
        nombre: "Combo Familiar",
        descripcion: "12 tortitas + 1 budín",
        precio: 12000,
        imagen: "img/combo-familiar.png",
        destacado: true
    }
];

// ==========================
// VARIABLES
// ==========================

const contenedorProductos =
document.getElementById("productos");

const itemsCarrito =
document.getElementById("itemsCarrito");

const totalElemento =
document.getElementById("total");

const contadorElemento =
document.getElementById("contador");

const toast =
document.getElementById("toast");

let carrito =
JSON.parse(
localStorage.getItem("carrito")
) || [];

// ==========================
// MOSTRAR PRODUCTOS
// ==========================

function mostrarProductos(){

    contenedorProductos.innerHTML = "";

    productos.forEach(producto=>{

        contenedorProductos.innerHTML += `

        <div class="card">

            <img
            src="${producto.imagen}"
            alt="${producto.nombre}">

            <div class="card-content">

                ${
                    producto.destacado
                    ?
                    '<span class="badge">⭐ Más Vendido</span>'
                    :
                    ''
                }

                <h3>${producto.nombre}</h3>

                <p>${producto.descripcion}</p>

                <div class="precio">
                    $${producto.precio}
                </div>

                <button
                onclick="agregar(${producto.id})">

                    Agregar al carrito

                </button>

            </div>

        </div>

        `;
    });
}

// ==========================
// AGREGAR
// ==========================

function agregar(id){

    const producto =
    productos.find(
    p=>p.id===id
    );

    const existe =
    carrito.find(
    p=>p.id===id
    );

    if(existe){

        existe.cantidad++;

    }else{

        carrito.push({

            ...producto,

            cantidad:1

        });

    }

    guardarCarrito();

    renderizarCarrito();

    mostrarToast();
}

// ==========================
// ELIMINAR
// ==========================

function eliminar(id){

    carrito =
    carrito.filter(
    producto =>
    producto.id !== id
    );

    guardarCarrito();

    renderizarCarrito();
}

// ==========================
// RESTAR
// ==========================

function restar(id){

    const producto =
    carrito.find(
    p=>p.id===id
    );

    if(!producto) return;

    producto.cantidad--;

    if(producto.cantidad <= 0){

        eliminar(id);

        return;
    }

    guardarCarrito();

    renderizarCarrito();
}

// ==========================
// SUMAR
// ==========================

function sumar(id){

    const producto =
    carrito.find(
    p=>p.id===id
    );

    if(!producto) return;

    producto.cantidad++;

    guardarCarrito();

    renderizarCarrito();
}

// ==========================
// RENDERIZAR CARRITO
// ==========================

function renderizarCarrito(){

    itemsCarrito.innerHTML = "";

    let total = 0;

    let cantidadTotal = 0;

    carrito.forEach(producto=>{

        total +=
        producto.precio *
        producto.cantidad;

        cantidadTotal +=
        producto.cantidad;

        itemsCarrito.innerHTML += `

        <div class="item-carrito">

            <h4>
                ${producto.nombre}
            </h4>

            <p>

                $${producto.precio}

            </p>

            <div class="controles">

                <button
                onclick="restar(${producto.id})">

                    -

                </button>

                <span>

                    ${producto.cantidad}

                </span>

                <button
                onclick="sumar(${producto.id})">

                    +

                </button>

            </div>

            <button
            class="btn-eliminar"
            onclick="eliminar(${producto.id})">

                Eliminar

            </button>

        </div>

        `;
    });

    totalElemento.textContent = total;

    contadorElemento.textContent =
    cantidadTotal;
}

// ==========================
// LOCAL STORAGE
// ==========================

function guardarCarrito(){

    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );
}

// ==========================
// TOAST
// ==========================

function mostrarToast(){

    toast.classList.add("active");

    setTimeout(()=>{

        toast.classList.remove("active");

    },2000);
}

// ==========================
// ABRIR CARRITO
// ==========================

const carritoPanel =
document.getElementById("carrito");

const overlay =
document.getElementById("overlay");

document
.getElementById("btnCarrito")
.addEventListener("click",()=>{

    carritoPanel.classList.add("active");

    overlay.classList.add("active");

});

// ==========================
// CERRAR
// ==========================

document
.getElementById("cerrarCarrito")
.addEventListener("click",()=>{

    carritoPanel.classList.remove("active");

    overlay.classList.remove("active");

});

overlay.addEventListener("click",()=>{

    carritoPanel.classList.remove("active");

    overlay.classList.remove("active");

});

// ==========================
// VACIAR
// ==========================

document
.getElementById("vaciar")
.addEventListener("click",()=>{

    carrito = [];

    guardarCarrito();

    renderizarCarrito();

});

// ==========================
// WHATSAPP
// ==========================

document
.getElementById("comprar")
.addEventListener("click",()=>{

    if(carrito.length === 0){

        return;
    }

    const nombre =
    document.getElementById("nombre");

    const telefono =
    document.getElementById("telefono");

    const direccion =
    document.getElementById("direccion");

    const errorNombre =
    document.getElementById("errorNombre");

    const errorTelefono =
    document.getElementById("errorTelefono");

    const errorDireccion =
    document.getElementById("errorDireccion");

    // Limpiar errores

    errorNombre.textContent = "";
    errorTelefono.textContent = "";
    errorDireccion.textContent = "";

    nombre.classList.remove("input-error");
    telefono.classList.remove("input-error");
    direccion.classList.remove("input-error");

    let hayErrores = false;

    // Nombre

    if(nombre.value.trim() === ""){

        nombre.classList.add("input-error");

        errorNombre.textContent =
        "Ingresá tu nombre.";

        hayErrores = true;
    }

    // Teléfono

    if(telefono.value.trim() === ""){

        telefono.classList.add("input-error");

        errorTelefono.textContent =
        "Ingresá tu teléfono.";

        hayErrores = true;

    }else if(telefono.value.trim().length < 8){

        telefono.classList.add("input-error");

        errorTelefono.textContent =
        "Ingresá un teléfono válido.";

        hayErrores = true;
    }

    // Dirección

    if(direccion.value.trim() === ""){

        direccion.classList.add("input-error");

        errorDireccion.textContent =
        "Ingresá tu dirección.";

        hayErrores = true;
    }

    if(hayErrores){
        return;
    }

    let mensaje =
` PEDIDO WEB

 Nombre: ${nombre.value}

 Teléfono: ${telefono.value}

 Dirección: ${direccion.value}

-------------------

`;

    carrito.forEach(producto=>{

        mensaje +=

`${producto.nombre}
Cantidad: ${producto.cantidad}

`;

    });

    const total = carrito.reduce(

        (acum,producto)=>

        acum +

        (producto.precio *
        producto.cantidad),

        0

    );

    mensaje +=
`-------------------

 Total: $${total}`;

    const numero = "542291472192";

    const url =
`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(
        url,
        "_blank"
    );

});

// ==========================
// INICIO
// ==========================

mostrarProductos();

renderizarCarrito();
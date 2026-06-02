// ==========================
// PRODUCTOS
// ==========================

const productos = [
    {
        id: 1,
        nombre: "Cookies Clásicas",
        descripcion: "Cookies artesanales con chips de chocolate.",
        precio: 2000,
        imagen: "img/cookies-clasicas.jpeg",
        destacado: true
    },

    {
    id: 2,
    nombre: "Cookies Azúcar Negra",
    descripcion: "Cookies artesanales con azúcar negra y chips de chocolate.",
    precio: 2000,
    imagen: "img/cookies-azucar.jpeg",
    destacado: false
    },

    {
        id: 3,
        nombre: "Tortitas Raspaditas",
        descripcion: "Tortitas recién horneadas ideales para el mate.",
        precio: 1000,
        imagen: "img/tortita-raspadita.jpeg",
        destacado: true
    },

    {
        id: 4,
        nombre: "Budín de Naranja",
        descripcion: "Budín húmedo y esponjoso.",
        precio: 3500,
        imagen: "img/budin-naranja.jpeg",
        destacado: false
    },

    {
    id: 5,
    nombre: "Budín de Limón",
    descripcion: "Budín casero de limón, húmedo y esponjoso.",
    precio: 3500,
    imagen: "img/budin-limon.jpeg",
    destacado: true
    },
    {
        id: 6,
        nombre: "Combo Mate",
        descripcion: "6 tortitas + 4 cookies",
        precio: 12000,
        imagen: "img/combo-mate.jpeg",
        destacado: true
    },

    {
        id: 7,
        nombre: "Combo Familiar",
        descripcion: "6 tortitas + 1 budín",
        precio: 10000,
        imagen: "img/promo-familiar.jpeg",
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

const subtotalElemento =
document.getElementById("subtotal");

const contadorElemento =
document.getElementById("contador");

const toast =
document.getElementById("toast");

let carrito =
JSON.parse(
localStorage.getItem("carrito")
) || [];

const COSTO_ENVIO = 1500;
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

    let subtotal = 0;

    let cantidadTotal = 0;

    carrito.forEach(producto=>{

        subtotal +=
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

    const envio =
carrito.length > 0
? COSTO_ENVIO
: 0;

const total =
subtotal + envio;

subtotalElemento.textContent =
`$${subtotal}`;

document.getElementById("envio").textContent =
`$${envio}`;

totalElemento.textContent =
`$${total}`;

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

    const subtotal = carrito.reduce(

    (acum,producto)=>

    acum +

    (producto.precio *
    producto.cantidad),

    0

);

const total =
subtotal + COSTO_ENVIO;

    mensaje +=
`-------------------

 Subtotal: $${subtotal}

Envío: $${COSTO_ENVIO}

TOTAL: $${total}`;

    const numero = "542291504531";

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
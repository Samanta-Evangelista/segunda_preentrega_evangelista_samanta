let saludo = ("Bienvenido al kiosco virtual del colegio")
alert(saludo)

let productos = [
    { id: 1, nombre: "Agua mineral", categoria: "bebidas", stock: 2, precio: 300 },
    { id: 2, nombre: "Jugo Baggio", categoria: "bebidas", stock: 7, precio: 180 },
    { id: 3, nombre: "Alfajor Jorgito Blanco", categoria: "golosinas", stock: 18, precio: 150 },
    { id: 4, nombre: "Alfajor Jorgito Nrgro", categoria: "golosinas", stock: 13, precio: 150 },
    { id: 5, nombre: "Tutucas", categoria: "golosinas", stock: 20, precio: 250 },
    { id: 6, nombre: "Chupetin Pico dulce", categoria: "golosinas", stock: 30, precio: 150 },
    { id: 7, nombre: "palitos salados", categoria: "snacks", stock: 25, precio: 350 },
    { id: 8, nombre: "Papas Fritas", categoria: "snacks", stock: 17, precio: 450 },
]

function ordenar(productos, propiedad) {
    productos.sort((a, b) => {
        if (a[propiedad] > b[propiedad]) {
            return 1
        }
        if (a[propiedad] < b[propiedad]) {
            return -1
        }
        return 0
    })
}




function principal(productos) {
    let carrito = []
    let opcion

    do {
        opcion = Number(prompt("Ingrese opción:\n1 - listar productos\n2 - agregar producto al carrito\n3 - filtrar por categoria\n4 - ordenar por nombre \n5 - finalizar compra\n0 - para salir"))
        switch (opcion) {
            case 1:
                alert(listar(productos, "id", "nombre"))
                break
            case 2:
                agregarProductoAlCarrito(productos, carrito)
                break
            case 3:
                let categoria = prompt("Ingrese categoria\n" + listarCategorias()).toLowerCase()
                productosFiltrados = productos.filter(producto => producto.categoria === categoria)
                alert(listar(productosFiltrados, "nombre", "categoria"))
                break
            case 4:
                ordenar(productos, "precio")
                alert(listar(productos, "nombre", "precio"))
                break
            case 5:
                finalizarCompra(carrito)
                carrito = []
                break
            default:
                break
        }
    } while (opcion != 0)
}
principal(productos)

function finalizarCompra(carrito) {
    if (carrito.length === 0) {
        alert("Agregar productos al carrito")
    } else {
        let total = carrito.reduce((acum, producto) => acum + producto.subtotal, 0)
        alert("El total a pagar es " + total)
        alert("Gracias por su compra")
    }
}

function listar(productos, propiedad1, propiedad2) {
    return productos.map(producto => producto[propiedad1] + " - " + producto[propiedad2]).join("\n")
}

function agregarProductoAlCarrito(productos, carrito) {
    let id = Number(prompt("Seleccione producto por id:\n" + listar(productos)))
    let productoBuscado = productos.find(producto => producto.id === id)
    let productoEnCarrito = carrito.find(producto => producto.id === productoBuscado.id)


if (productoBuscado.stock > 0) {
    if (productoEnCarrito) {
        productoEnCarrito.unidades++
        productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario
    } else {
        carrito.push({
            id: productoBuscado.id,
            nombre: productoBuscado.nombre,
            precioUnitario: productoBuscado.precio,
            unidades: 1,
            subtotal: productoBuscado.precio
        })
    }
    productoBuscado.stock--
    alert("Se agregó producto al carrito")
} else {
    alert("No hay más stock del producto seleccionado")
}
}
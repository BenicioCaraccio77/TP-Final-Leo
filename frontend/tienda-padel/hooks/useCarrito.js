import { useState, useEffect } from "react"

let carritoCompartido = []
const suscriptores = new Set()

function actualizarCarrito() {
    suscriptores.forEach(actualizar => actualizar([...carritoCompartido]))
}

export default function useCarrito() {

    const [carrito, setCarrito] = useState(carritoCompartido)

    useEffect(() => {
        suscriptores.add(setCarrito)

        return () => {
            suscriptores.delete(setCarrito)
        }
    }, [])

    function agregarProducto(producto) {
        carritoCompartido = [...carritoCompartido, producto]
        actualizarCarrito()
    }

    function eliminarProducto(id) {
        const indice = carritoCompartido.findIndex(producto => producto.id === id)

        if (indice !== -1) {
            carritoCompartido = carritoCompartido.filter((producto, posicion) => posicion !== indice)
            actualizarCarrito()
        }
    }

    function vaciarCarrito() {
        carritoCompartido = []
        actualizarCarrito()
    }

    const total = carrito.reduce((suma, producto) => suma + Number(producto.precio), 0)

    const cantidad = carrito.length

    return {
        carrito,
        agregarProducto,
        eliminarProducto,
        vaciarCarrito,
        total,
        cantidad
    }
}
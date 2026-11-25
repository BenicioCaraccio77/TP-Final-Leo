import { useState } from "react"
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, ActivityIndicator, Modal, KeyboardAvoidingView, Platform } from "react-native"
import { router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import useCarrito from "../../../hooks/useCarrito"
import estilos from "../../../styles/estilos"

export default function Carrito() {
    const { carrito, eliminarProducto, vaciarCarrito, total } = useCarrito()

    const [comprador, setComprador] = useState("")
    const [email, setEmail] = useState("")
    const [metodoPago, setMetodoPago] = useState("")
    const [procesando, setProcesando] = useState(false)
    const [mostrarModal, setMostrarModal] = useState(false)
    const [numeroOrden, setNumeroOrden] = useState("")

    async function confirmarCompra() {
        if (!comprador || !email || !metodoPago) {
            alert("Completá todos los campos")
            return
        }

        const productos = []

        carrito.forEach(producto => {
            const existente = productos.find(item => item.producto_id === producto.id)

            if (existente) {
                existente.cantidad++
            } else {
                productos.push({ producto_id: producto.id, cantidad: 1 })
            }
        })

        setProcesando(true)

        try {
            const respuesta = await fetch("https://tienda-padel-backend-gv02.onrender.com/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comprador, email, productos })
            })

            const datos = await respuesta.json()

            if (!respuesta.ok) throw new Error(datos.detail || "No se pudo realizar la compra")

            setNumeroOrden(datos.orden[0].id)
            vaciarCarrito()
            setMostrarModal(true)

        } catch (error) {
            alert(error.message)
        } finally {
            setProcesando(false)
        }
    }

    return (
        <SafeAreaView style={estilos.contenedor}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 40 }}>
                    <Text style={estilos.titulo}>Mi carrito</Text>

                    {carrito.length === 0 ? (
                        <>
                            <Text style={estilos.vacio}>El carrito está vacío</Text>
                            <Pressable style={estilos.boton} onPress={() => router.back()}>
                                <Text style={estilos.textoBoton}>Volver a la tienda</Text>
                            </Pressable>
                        </>
                    ) : (
                        <>
                            {carrito.map((producto, index) => (
                                <View style={estilos.producto} key={index}>
                                    <View>
                                        <Text style={estilos.nombre}>{producto.nombre}</Text>
                                        <Text>${producto.precio}</Text>
                                    </View>
                                    <Pressable onPress={() => eliminarProducto(producto.id)}>
                                        <Text style={estilos.eliminar}>Eliminar</Text>
                                    </Pressable>
                                </View>
                            ))}

                            <Pressable style={estilos.botonVaciar} onPress={vaciarCarrito}>
                                <Text style={estilos.textoBoton}>Vaciar carrito</Text>
                            </Pressable>

                            <Text style={estilos.total}>Total a pagar: ${total}</Text>
                            <Text style={estilos.subtitulo}>Datos del comprador</Text>

                            <TextInput style={estilos.input} placeholder="Nombre completo" value={comprador} onChangeText={setComprador} />
                            <TextInput style={estilos.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

                            <Text style={estilos.subtitulo}>Pago simulado</Text>
                            <TextInput style={estilos.input} placeholder="Tarjeta o transferencia" value={metodoPago} onChangeText={setMetodoPago} />

                            <Pressable style={estilos.boton} onPress={confirmarCompra} disabled={procesando}>
                                {procesando ? <ActivityIndicator color="white" /> : <Text style={estilos.textoBoton}>Confirmar y Pagar</Text>}
                            </Pressable>
                        </>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>

            <Modal visible={mostrarModal} transparent animationType="fade">
                <View style={estilos.fondoModal}>
                    <View style={estilos.modal}>
                        <Text style={estilos.titulo}>¡Compra realizada!</Text>
                        <Text>Tu pedido fue registrado correctamente.</Text>
                        <Text style={estilos.numeroOrden}>Número de orden: {numeroOrden}</Text>

                        <Pressable style={estilos.boton} onPress={() => {
                            setMostrarModal(false)
                            router.replace("/")
                        }}>
                            <Text style={estilos.textoBoton}>Volver a la tienda</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}


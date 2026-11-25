import { Text, Image, Pressable, StyleSheet, Alert, Platform, ScrollView } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import useCarrito from "../../../hooks/useCarrito"
import estilosCompartidos from "../../../styles/estilos"

export default function DetalleProducto() {

    const { nombre, precio, imagen, id, descripcion } = useLocalSearchParams()
    const { agregarProducto } = useCarrito()

    function agregarAlCarrito() {
        agregarProducto({ id, nombre, precio, imagen })

        if (Platform.OS === "web") {
            alert("Producto agregado al carrito")
        } else {
            Alert.alert("Carrito", "Producto agregado correctamente")
        }
    }

    return (
        <ScrollView contentContainerStyle={estilos.contenedor}>
            <Image source={{ uri: imagen }} style={estilos.imagen} />

            <Text style={estilos.nombre}>{nombre}</Text>
            <Text style={estilos.precio}>${precio}</Text>
            <Text style={estilos.descripcion}>{descripcion}</Text>

            <Pressable style={estilos.boton} onPress={agregarAlCarrito}>
                <Text style={estilosCompartidos.textoBoton}>Agregar al carrito</Text>
            </Pressable>

            <Pressable style={estilos.botonVolver} onPress={() => router.back()}>
                <Text style={estilosCompartidos.textoBoton}>Volver</Text>
            </Pressable>
        </ScrollView>
    )
}

const estilos = StyleSheet.create({
    contenedor: {
        padding: 20,
        alignItems: "center",
        backgroundColor: "white"
    },
    imagen: {
        width: 280,
        height: 280,
        resizeMode: "contain"
    },
    nombre: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#102e50",
        marginTop: 15,
        textAlign: "center"
    },
    precio: {
        fontSize: 20,
        color: "green",
        marginTop: 10
    },
    descripcion: {
        fontSize: 16,
        color: "#333333",
        marginTop: 20,
        lineHeight: 24,
        textAlign: "justify"
    },
    boton: {
        backgroundColor: "#247a43",
        padding: 12,
        borderRadius: 5,
        marginTop: 20,
        width: "100%"
    },
    botonVolver: {
        backgroundColor: "#102e50",
        padding: 12,
        borderRadius: 5,
        marginTop: 10,
        width: "100%"
    }
})
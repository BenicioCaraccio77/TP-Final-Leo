import { View, Text, Image, Pressable, StyleSheet } from "react-native"
import { useLocalSearchParams, router } from "expo-router"

export default function DetalleProducto() {

    const { nombre, precio, imagen } = useLocalSearchParams()

    return (
        <View style={estilos.contenedor}>

            <Image
                source={{ uri: imagen }}
                style={estilos.imagen}
            />

            <Text style={estilos.nombre}>
                {nombre}
            </Text>

            <Text style={estilos.precio}>
                ${precio}
            </Text>

            <Pressable style={estilos.boton} onPress={() => router.back()}>
                <Text style={estilos.textoBoton}>
                    Volver
                </Text>
            </Pressable>

        </View>
    )
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        backgroundColor: "white"
    },

    imagen: {
        width: 250,
        height: 250,
        resizeMode: "contain"
    },

    nombre: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#102e50",
        marginTop: 15
    },

    precio: {
        fontSize: 20,
        color: "green",
        marginTop: 10
    },

    boton: {
        backgroundColor: "#102e50",
        padding: 12,
        borderRadius: 5,
        marginTop: 20,
        width: "100%"
    },

    textoBoton: {
        color: "white",
        textAlign: "center"
    }
})
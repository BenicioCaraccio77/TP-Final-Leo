import { View, Text, Image, Pressable, StyleSheet } from "react-native"

export default function TarjetaProducto({ producto, onPress }) {
    return (
        <View style={estilos.tarjeta}>

            <Image source={{ uri: producto.imagen }} style={estilos.imagen}/>

            <Text style={estilos.nombre}>{producto.nombre}</Text>

            <Text style={estilos.precio}>${producto.precio}</Text>

            <Pressable style={estilos.boton} onPress={onPress}>
                <Text style={estilos.textoBoton}>Ver producto</Text>
            </Pressable>

        </View>
    )
}

const estilos = StyleSheet.create({
    tarjeta: {
        backgroundColor: "#f0f3f7",
        width: 160,
        padding: 10,
        margin: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#d5dce5"
    },

    imagen: {
        width: "100%",
        height: 120,
        resizeMode: "contain"
    },

    nombre: {
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 8,
        color: "#102e50"
    },

    precio: {
        fontSize: 16,
        color: "#247a43",
        marginTop: 5
    },

    boton: {
        backgroundColor: "#102e50",
        padding: 8,
        marginTop: 10,
        borderRadius: 5
    },

    textoBoton: {
        color: "white",
        textAlign: "center"
    }
})
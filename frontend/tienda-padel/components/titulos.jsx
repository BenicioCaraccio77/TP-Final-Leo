import { View, Text, StyleSheet } from "react-native"

export default function Encabezado({ titulo }) {
    return (
        <View style={estilos.encabezado}>
            <Text style={estilos.titulo}>{titulo}</Text>
            <Text style={estilos.subtitulo}>Todo para tu juego</Text>
        </View>
    )
}

const estilos = StyleSheet.create({
    encabezado: {
        backgroundColor: "#102e50",
        padding: 20,
        paddingTop: 35
    },
    titulo: {
        color: "white",
        fontSize: 26,
        fontWeight: "bold"
    },
    subtitulo: {
        color: "#d5e2ee",
        fontSize: 14,
        marginTop: 5
    }
})
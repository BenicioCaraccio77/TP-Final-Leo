import { StyleSheet } from "react-native"

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5"
    },

    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20
    },

    boton: {
        backgroundColor: "#245c43",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 15
    },

    textoBoton: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },

    input: {
        backgroundColor: "white",
        padding: 14,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ccc"
    },

    vacio: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 30
    },

    producto: {
        backgroundColor: "white",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    nombre: {
        fontSize: 16,
        fontWeight: "bold"
    },

    eliminar: {
        color: "red",
        fontWeight: "bold"
    },

    botonVaciar: {
        backgroundColor: "#777",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10
    },

    total: {
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 20
    },

    subtitulo: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10
    },

    fondoModal: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },

    modal: {
        backgroundColor: "white",
        padding: 25,
        borderRadius: 12,
        width: "100%",
        alignItems: "center"
    },

    numeroOrden: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15
    }
})

export default estilos
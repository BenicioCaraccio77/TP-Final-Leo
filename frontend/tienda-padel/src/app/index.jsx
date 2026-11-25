import { useEffect, useState } from "react"
import { View, FlatList, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import Titulo from "../../components/titulos"
import TarjetaProducto from "../../components/tarjeta"
import useCarrito from "../../hooks/useCarrito"
import estilosCompartidos from "../../styles/estilos"

export default function Inicio() {

    const [productos, setProductos] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas")
    const [cargando, setCargando] = useState(true)

    const { cantidad } = useCarrito()

    useEffect(() => {
        fetch("http://192.168.100.5:8000/productos")
            .then(respuesta => respuesta.json())
            .then(datos => setProductos(datos))
            .catch(error => console.log(error))
            .finally(() => setCargando(false))
    }, [])

    const categorias = [
        "Todas",
        ...new Set(productos.map(producto => producto.categoria))
    ]

    const productosFiltrados = categoriaSeleccionada === "Todas"
        ? productos
        : productos.filter(producto => producto.categoria === categoriaSeleccionada)

    return (
        <SafeAreaView style={estilosCompartidos.contenedor}>
            <Titulo titulo="Tienda de Pádel" />

            <Pressable
                style={estilos.botonCarrito}
                onPress={() => router.push("/carrito")}
            >
                <Text style={[estilosCompartidos.textoBoton, { textAlign: "center" }]}>
                    Mi carrito ({cantidad})
                </Text>
            </Pressable>

            <Text style={estilos.subtitulo}>Categorías</Text>

            <View style={estilos.categorias}>
                {categorias.map(categoria => (
                    <Pressable
                        key={categoria}
                        style={[
                            estilos.botonCategoria,
                            categoriaSeleccionada === categoria && estilos.categoriaActiva
                        ]}
                        onPress={() => setCategoriaSeleccionada(categoria)}
                    >
                        <Text style={[
                            estilos.textoCategoria,
                            categoriaSeleccionada === categoria && estilos.textoActivo
                        ]}>
                            {categoria}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {cargando ? (
                <ActivityIndicator size="large" color="#102e50" />
            ) : (
                <FlatList
                    data={productosFiltrados}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "center" }}
                    ListEmptyComponent={
                        <Text style={estilos.sinProductos}>
                            No hay productos en esta categoría
                        </Text>
                    }
                    renderItem={({ item }) => (
                        <TarjetaProducto
                            producto={item}
                            onPress={() => router.push({
                                pathname: "/detalle/[id]",
                                params: {
                                    id: item.id,
                                    nombre: item.nombre,
                                    precio: item.precio,
                                    imagen: item.imagen,
                                    descripcion: item.descripcion
                                }
                            })}
                        />
                    )}
                />
            )}
        </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
    botonCarrito: {
        backgroundColor: "#102e50",
        padding: 12,
        borderRadius: 5,
        marginVertical: 15
    },
    subtitulo: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    categorias: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 15,
        gap: 8
    },
    botonCategoria: {
        backgroundColor: "#dddddd",
        padding: 9,
        borderRadius: 5
    },
    categoriaActiva: {
        backgroundColor: "#102e50"
    },
    textoCategoria: {
        color: "#222222"
    },
    textoActivo: {
        color: "white",
        fontWeight: "bold"
    },
    sinProductos: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16
    }
})
import { View, FlatList, StyleSheet } from "react-native"
import { router } from "expo-router"
import Titulo from "../../components/titulos"
import TarjetaProducto from "../../components/tarjeta"

export default function Inicio() {

    const productos = [
        {
            id: 1,
            nombre: "Raqueta de pádel",
            precio: 85000,
            imagen: "https://placehold.co/300x300"
        },
        {
            id: 2,
            nombre: "Pelotas de pádel",
            precio: 12000,
            imagen: "https://placehold.co/300x300"
        },
        {
            id: 3,
            nombre: "Mochila de padel",
            precio: 45000,
            imagen: "https://placehold.co/300x300"
        }
    ]

    return (
        <View style={estilos.contenedor}>

            <Titulo titulo="Tienda de Pádel" />

            <FlatList
                data={productos}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "center" }}
                renderItem={({ item }) => (
                    <TarjetaProducto
                        producto={item}
                        onPress={() => router.push({
                            pathname: "/detalle/[id]",
                            params: {
                                id: item.id,
                                nombre: item.nombre,
                                precio: item.precio,
                                imagen: item.imagen
                            }
                        })}
                    />
                )}
            />

        </View>
    )
}

const estilos = StyleSheet.create({
    contenedor: {
        flex: 1,
        padding: 20
    }
})
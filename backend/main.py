from fastapi import FastAPI, HTTPException
from config.supabase import supabase
from pydantic import BaseModel
from typing import List 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ProductoCarrito(BaseModel):
    producto_id: int
    cantidad: int


class Compra(BaseModel):
    comprador: str
    email: str
    productos: List[ProductoCarrito]

@app.get("/")
def inicio():
    return {"mensaje": "Tienda de padel funcionando"}

@app.get("/productos")
def obtener_productos():
    respuesta = supabase.table("productos").select("*").execute()

    return respuesta.data

@app.get("/productos/{producto_id}")
def obtener_producto(producto_id: int):
    respuesta = supabase.table("productos").select("*").eq("id", producto_id).execute()

    if not respuesta.data:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    return respuesta.data[0]


@app.post("/checkout")
def realizar_compra(compra: Compra):
    total = 0
    productos_comprados = []

    for producto in compra.productos:
        respuesta = supabase.table("productos").select("*").eq("id", producto.producto_id).execute()

        if not respuesta.data:
            raise HTTPException(status_code=404, detail="Producto no encontrado")

        datos_producto = respuesta.data[0]

        if producto.cantidad <= 0:
            raise HTTPException(status_code=400, detail="Cantidad no valida")

        if datos_producto["stock"] < producto.cantidad:
            raise HTTPException(status_code=400, detail="Stock insuficiente")

        total += datos_producto["precio"] * producto.cantidad

        productos_comprados.append({
            "producto_id": producto.producto_id,
            "cantidad": producto.cantidad,
            "precio": datos_producto["precio"],
            "stock": datos_producto["stock"]
        })

    nueva_orden = {
        "comprador": compra.comprador,
        "email": compra.email,
        "total": total
    }

    respuesta = supabase.table("ordenes").insert(nueva_orden).execute()

    id_orden = respuesta.data[0]["id"]

    for producto in productos_comprados:

        detalle = {
            "orden_id": id_orden,
            "producto_id": producto["producto_id"],
            "cantidad": producto["cantidad"],
            "precio_unitario": producto["precio"]
        }

        supabase.table("detalle_ordenes").insert(detalle).execute()

        nuevo_stock = producto["stock"] - producto["cantidad"]

        supabase.table("productos").update({
            "stock": nuevo_stock
        }).eq("id", producto["producto_id"]).execute()

    return {
        "mensaje": "Compra registrada correctamente",
        "orden": respuesta.data
    }
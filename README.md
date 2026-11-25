# Tienda de Pádel

## Integrantes
- Caraccio Benicio
- Cardoso Carolina

## Sobre el proyecto
Desarrollamos una aplicación móvil de una tienda de pádel. Permite ver los productos disponibles, consultar sus detalles, agregarlos al carrito y realizar una compra con un pago simulado.

## Tecnologías utilizadas
- React Native y Expo.
- Python y FastAPI.
- Supabase.
- Uvicorn.

## Cómo ejecutar el proyecto

### Backend
El backend está publicado en Render:  
https://tienda-padel-backend-gv02.onrender.com

Para ejecutarlo localmente:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Hay que configurar las credenciales de Supabase en el archivo `.env`.

### Base de datos
Utilizamos Supabase. La conexión se configura desde el archivo `.env` del backend con `SUPABASE_URL` y `SUPABASE_KEY`.

### Aplicación móvil
Desde otra terminal, ejecutar:

```bash
cd frontend/tienda-padel
npm install
npx expo start
```

Después, escanear el código QR con Expo Go.
# 📚 Documentación de la API REST - Gestión de Artículos

**URL Base:** `http://127.0.0.1:8000/api/`  
**Autenticación:** Requerida (SessionAuth / BasicAuth)

---

## 1. Obtener Lista de Artículos
* **Método:** `GET`
* **Dirección:** `/articulos/`
* **Parámetros:** Ninguno
* **Respuesta Esperada (200 OK):**
  ```json
  [
    {
      "id": 1,
      "nombre": "Teclado RGB",
      "precio": "450.00",
      "categoria": "Accesorios",
      "stock": 10
    }
  ]
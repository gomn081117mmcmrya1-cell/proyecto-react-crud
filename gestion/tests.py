from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Articulo

class GestionTestCase(TestCase):

    def setUp(self):
        # Crear un usuario de prueba para autenticación
        self.user = User.objects.create_user(username='testuser', password='password123')
        
        # Crear un artículo de prueba en la base de datos
        self.articulo = Articulo.objects.create(
            nombre="Teclado de Prueba",
            precio=500.00,
            categoria="Hardware",
            stock=10
        )
        
        # Cliente para probar la API REST
        self.client_api = APIClient()

    # 1. PRUEBA: Verificación de creación de un modelo
    def test_creacion_modelo_articulo(self):
        self.assertEqual(self.articulo.nombre, "Teclado de Prueba")
        self.assertEqual(self.articulo.precio, 500.00)
        self.assertTrue(isinstance(self.articulo, Articulo))

    # 2. PRUEBA: Verificación de acceso a una vista HTML (Protegida)
    def test_acceso_vista_lista(self):
        # Iniciar sesión con el usuario de prueba
        self.client.login(username='testuser', password='password123')
        response = self.client.get(reverse('lista_articulos'))
        self.assertEqual(response.status_code, 200)

    # 3. PRUEBA: Verificación de respuesta de un endpoint de la API
    def test_endpoint_api_articulos(self):
        # Autenticar en la API
        self.client_api.force_authenticate(user=self.user)
        url = reverse('api-articulo-list')  # Genera /gestion/api/articulos/
        response = self.client_api.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    # 4. PRUEBA (DELIBERADA): Provocar un error de validación (Ejemplo: precio negativo)
    def test_error_validacion_crear_articulo_invalido(self):
        self.client_api.force_authenticate(user=self.user)
        url = reverse('api-articulo-list')
        
        # Enviamos datos inválidos (precio en texto o vacío)
        datos_invalidos = {
            "nombre": "",  # Nombre vacío para forzar un error de validación
            "precio": "gratis", # Formato de precio erróneo
            "categoria": "Hardware",
            "stock": -5
        }
        response = self.client_api.post(url, datos_invalidos)
        
        # Verificamos que responda con un HTTP 400 Bad Request
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('nombre', response.data)
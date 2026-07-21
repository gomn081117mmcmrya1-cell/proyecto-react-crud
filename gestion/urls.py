from django.urls import path, include
from django.contrib.auth import views as auth_views
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'articulos', views.ArticuloViewSet, basename='api-articulo')

urlpatterns = [
    # Rutas de Autenticación (Login y Logout)
    path('login/', auth_views.LoginView.as_view(template_name='gestion/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),

    # Rutas de la Aplicación
    path('', views.inicio, name='inicio'),
    path('articulos/', views.lista_articulos, name='lista_articulos'),
    path('articulos/nuevo/', views.crear_articulo, name='crear_articulo'),
    path('articulos/editar/<int:id>/', views.editar_articulo, name='editar_articulo'),
    path('articulos/eliminar/<int:id>/', views.eliminar_articulo, name='eliminar_articulo'),
    
    # API REST
    path('api/', include(router.urls)),
]
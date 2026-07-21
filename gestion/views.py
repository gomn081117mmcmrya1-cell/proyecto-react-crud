from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Articulo
from .forms import ArticuloForm
from .serializers import ArticuloSerializer

# 1. VISTA DE INICIO
def inicio(request):
    return render(request, 'gestion/inicio.html')

# 2. VISTA DE CONSULTA (PROTEGIDA)
@login_required
def lista_articulos(request):
    articulos = Articulo.objects.all()
    return render(request, 'gestion/lista.html', {'articulos': articulos})

# 3. FORMULARIO DE ALTA (PROTEGIDA)
@login_required
def crear_articulo(request):
    if request.method == 'POST':
        form = ArticuloForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, '¡Artículo creado exitosamente!')
            return redirect('lista_articulos')
        else:
            messages.error(request, 'Error al guardar el artículo. Revisa los datos ingresados.')
    else:
        form = ArticuloForm()
    return render(request, 'gestion/form_articulo.html', {'form': form, 'titulo': 'Alta de Artículo'})

# 4. FORMULARIO DE MODIFICACIÓN (PROTEGIDA)
@login_required
def editar_articulo(request, id):
    articulo = get_object_or_404(Articulo, id=id)
    if request.method == 'POST':
        form = ArticuloForm(request.POST, instance=articulo)
        if form.is_valid():
            form.save()
            messages.success(request, '¡Artículo modificado exitosamente!')
            return redirect('lista_articulos')
        else:
            messages.error(request, 'Error al modificar el artículo. Revisa los campos.')
    else:
        form = ArticuloForm(instance=articulo)
    return render(request, 'gestion/form_articulo.html', {'form': form, 'titulo': 'Modificar Artículo'})

# 5. CONFIRMACIÓN Y ELIMINACIÓN (PROTEGIDA)
@login_required
def eliminar_articulo(request, id):
    articulo = get_object_or_404(Articulo, id=id)
    if request.method == 'POST':
        articulo.delete()
        messages.success(request, 'Artículo eliminado correctamente.')
        return redirect('lista_articulos')
    return render(request, 'gestion/confirmar_eliminar.html', {'articulo': articulo})

# 6. VISTA PARA LA API REST (PROTEGIDA CON AUTENTICACIÓN)
class ArticuloViewSet(viewsets.ModelViewSet):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer
    permission_classes = [IsAuthenticated]
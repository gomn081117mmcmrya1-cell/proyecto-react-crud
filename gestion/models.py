from django.db import models

class Articulo(models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre del Artículo")
    precio = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Precio")
    categoria = models.CharField(max_length=50, verbose_name="Categoría")
    stock = models.IntegerField(default=0, verbose_name="Stock")

    def __str__(self):
        return self.nombre
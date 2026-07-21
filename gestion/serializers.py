from rest_framework import serializers
from .models import Articulo

class ArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulo
        fields = '__all__'

    # Validación personalizada para el precio
    def validate_precio(self, value):
        if value <= 0:
            raise serializers.ValidationError("El precio debe ser un número mayor a cero.")
        return value

    # Validación personalizada para el stock
    def validate_stock(self, value):
        if value < 0:
            raise serializers.ValidationError("El stock no puede ser negativo.")
        return value
from rest_framework import serializers
from .models import Task

class TaskSerializar(serializers.ModelSerializer):
    class Meta:
        model = Task
        # fields = ('id', 'title', 'description', 'done') si quiero seleccionar los campos a convertir en Json
        fields = '__all__'
        
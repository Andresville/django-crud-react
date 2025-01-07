from rest_framework import viewsets
from .serializar import TaskSerializar 
from .models import Task

#Create your views here.

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializar
    queryset = Task.objects.all()


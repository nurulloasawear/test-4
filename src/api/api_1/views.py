
from rest_framework import viewsets
from main.models import Task
from .serializers import TaskSerializer
from main.api.permissions import IsAuthenticatedUser

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticatedUser]
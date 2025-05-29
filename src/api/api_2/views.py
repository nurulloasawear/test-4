
from rest_framework import viewsets
from main.models import Project
from .serializers import ProjectSerializer
from main.api.permissions import IsAuthenticatedUser

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedUser]
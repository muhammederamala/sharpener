from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer

# Function-based view for creating a task
@api_view(['POST'])
def create(request):
    data = {
        'title': request.data.get('name', ''),
        'description': request.data.get('description', ''),
    }
    print(data)
    serializer = TaskSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Function-based view for retrieving all tasks and creating a new task
@api_view(['GET'])
def list_all_tasks(request):
    data = {
        'title': request.data.get('name', ''),
        'description': request.data.get('description', ''),
    }
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

# Function-based view for retrieving, updating, and deleting a specific task
@api_view(['GET'])
def list_task(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return Response(serializer.data)

@api_view(['DELETE'])
def delete_task(request, pk):
    try:
        task = Task.objects.get(pk=pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
def update_task(request, pk):
    print(request.data)
    try:
        task = Task.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PATCH':
        serializer = TaskSerializer(task, data = request.data, partial = True)
        if serializer.is_valid():
            task.description = serializer.validated_data.get('description', task.description)
            task.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
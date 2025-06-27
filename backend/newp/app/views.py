from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from .serializer import BookSerializers

@api_view(['GET'])
def get_books(requests):
    books=Book.objects.all()
    serialized_data=BookSerializers(books,many=True).data
    return Response(serialized_data)

@api_view(['POST'])
def create_book(request):
    data=request.data
    serializers =BookSerializers(data=data)
    if serializers.is_valid():
        serializers.save()
        return Response(serializers.data,status=status.HTTP_201_CREATED)
    else:
        return Response(serializers.error ,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT','DELETE'])
def book_detail(request,pk):
    try:
        book = Book.objects.get(id=pk)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        data=request.data
        serializer= BookSerializers(book,data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from django.contrib.auth.hashers import make_password
from rest_framework import status

from base.models import Product
from base.serializers import ProductSerializer


# Create your views here.

@api_view(['GET'])
def getProducts(request):

    #return response from db
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)    

@api_view(['GET'])
def getProduct(request, pk):
    #product = None

    # for i in products:
    #     if i['_id'] == pk:
    #         product = i
    #         break

    product = Product.objects.get(_id = pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data) 

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    
    product= Product.objects.create(
        user = user,
        name = 'name',
        price = 0,
        brand='brand',
        countInStock = 0,
        category = 'category',
        description = '',
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data) 

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id = pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data) 

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    
    product = Product.objects.get(_id = pk)
    product.delete()
    return Response("Product Deleted!")



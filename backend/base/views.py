from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .products import products
from .models import *
from .serializers import *

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes=[]
    return Response(routes)

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
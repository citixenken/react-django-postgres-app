from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from django.contrib.auth.hashers import make_password
from rest_framework import status

from base.models import Product, Review
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
        name = 'Placeholder name',
        price = 0,
        brand='Placeholder brand',
        countInStock = 0,
        category = 'Placeholder category',
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

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id = product_id)
    product.image = request.FILES.get('image')
    product.save()
    return Response('Image uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    #1. Review already exists - One review per customer
    alreadyExists = product.review_set.filter(user=user).exists() #returns True or False

    if alreadyExists:
        content = {'Details': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


    #2. If No rating or rating = 0
    elif data['rating'] == 0:
        content = {'Details': 'Please select a rating for the product'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #3. Create review
    else:
        review = Review.objects.create(
            user = user,
            product = product,
            name = user.first_name,
            rating = data['rating'],
            comment = data['comment'],

        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        totalReviews = 0

        for i in reviews:
            totalReviews += i.rating
        
        product.rating = totalReviews / len(reviews)
        product.save()

        return Response('Review was successfully added')



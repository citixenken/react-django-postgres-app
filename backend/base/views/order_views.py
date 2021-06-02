from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import response
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.serializers import Serializer

from datetime import datetime

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer

# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'Detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1. Create Order
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice'],

        )

        # 2. Create Shipping Address
        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            postalCode = data['shippingAddress']['postalCode'],
            country = data['shippingAddress']['country'],

        )

        # 3. Create order items and set order to OrderItem relationship
        for i in orderItems:
            product = Product.objects.get(_id = i['product'])

            item = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                #image = product.image.url,
                image = product.image,
            )
            # 4. Update Product countInStock
            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order, many=False)   
        return Response(serializer.data)   

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Order.objects.get(_id=pk)

        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)

        else:
            return Response({'detail': 'Not authorized to view this order'},
            status=status.HTTP_401_UNAUTHORIZED)

    except:
        return Response({'detail': 'Order does not exist'}, 
            status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response('Order was Paid.')

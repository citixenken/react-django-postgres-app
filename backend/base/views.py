from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .products import products
from .models import *
from .serializers import *

#JWT customization
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # # Add custom claims
        # token['username'] = user.username
        # token['message'] = 'hello there'
        # # ...

        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)

        # data['username'] = self.user.username
        # data['email'] = self.user.email

        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v
        
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes=[]
    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):

    #return response from db
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data) 

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):

    #return response from db
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data) 

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
from django.urls import path
from base.views import product_views


urlpatterns =[
        
    path('', product_views.getProducts, name = 'products'),
    path('create/<str:pk>/', product_views.createProduct, name = 'create-product'),
    path('<str:pk>/', product_views.getProduct, name = 'product'),
    path('delete/<str:pk>/', product_views.deleteProduct, name = 'delete-product'),
]
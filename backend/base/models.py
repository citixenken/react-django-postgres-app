from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length =200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/office-image-placeholder.jpg')
    brand = models.CharField(max_length =200, null=True, blank=True)
    category = models.CharField(max_length =200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating =models.DecimalField(max_digits=7, null=True, decimal_places=1, blank=True, default=0)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt =models.DateTimeField(auto_now_add=True)

    #overriding default id
    _id = models.AutoField(primary_key=True, editable=False)


    def __str__(self):
        #displays name on product page in admin
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length =200, null=True, blank=True)
    rating =models.DecimalField(max_digits=7, null=True, decimal_places=1, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt =models.DateTimeField(auto_now_add=True)
     
    #overriding default id
    _id = models.AutoField(primary_key=True, editable=False)


    def __str__(self):
        #displays name on product page in admin
        return str(self.rating)

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length =200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt =models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt =models.DateTimeField(auto_now_add=True, null=True, blank=True)
    createdAt =models.DateTimeField(auto_now_add=True)
    
    #overriding default id
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        #displays name on product page in admin
        return str(self.createdAt)


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length =200, null=True, blank=True)
    qty =models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)

    #overriding default id
    _id = models.AutoField(primary_key=True, editable=False)


    def __str__(self):
        #displays name on product page in admin
        return str(self.name)


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank = True)
    address =models.CharField(max_length =200, null=True, blank=True)
    city = models.CharField(max_length =200, null=True, blank=True)
    postalCode = models.CharField(max_length =200, null=True, blank=True)
    country = models.CharField(max_length =200, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    #image =
    
    #overriding default id
    _id = models.AutoField(primary_key=True, editable=False)


    def __str__(self):
        #displays name on product page in admin
        return str(self.address)



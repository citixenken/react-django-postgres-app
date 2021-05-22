from django.urls import path
from base.views import user_views


urlpatterns =[
    path('login/', user_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', user_views.registerUser, name = 'register-user'),
    path('profile/', user_views.getUserProfile, name = 'users-profile'),
    path('', user_views.getUsers, name = 'users'),
]
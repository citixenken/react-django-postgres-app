from django.urls import path
from base.views import user_views


urlpatterns =[
    path('login/', user_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', user_views.registerUser, name = 'register-user'),
    path('profile/', user_views.getUserProfile, name = 'users-profile'),
    path('profile/update/', user_views.updateUserProfile, name = 'users-profile-update'),
    path('', user_views.getUsers, name = 'users'),
    
    path('<str:pk>/', user_views.getUserById, name = 'get-user-by-id'),
    path('update/<str:pk>/', user_views.updateUser, name = 'update-user'),
    path('delete/<str:pk>/', user_views.deleteUser, name = 'delete-user'),
    
]
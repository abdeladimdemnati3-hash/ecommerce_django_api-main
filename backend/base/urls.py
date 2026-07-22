from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('users/login/', views.loginUser, name="login"),
    path('users/register/', views.registerUser, name="register"),
    path('users/profile/', views.getUserProfile, name="user-profile"),
    path('orders/', views.addOrderItems, name="orders-add"),
    path('orders/myorders/', views.getMyOrders, name="my-orders"),
    path('products/', views.getProducts, name="products"),
    path('products/<id>', views.getProduct, name="product"),
]

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Product, Order, OrderItem, ShippingAddress
from .serializers import ProductSerializer


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@api_view(['POST'])
def loginUser(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        tokens = get_tokens_for_user(user)
        return Response({
            '_id': user.id,
            'username': user.username,
            'email': user.email,
            'name': user.get_full_name() or user.username,
            'isAdmin': user.is_staff,
            'token': tokens['access'],
        })
    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    if request.method == 'PUT':
        username = request.data.get('username', user.username).strip()
        email = request.data.get('email', user.email).strip()
        password = request.data.get('password', '')

        if username != user.username and User.objects.filter(username=username).exists():
            return Response({'detail': 'Username already taken.'}, status=status.HTTP_400_BAD_REQUEST)
        if email != user.email and User.objects.filter(email=email).exists():
            return Response({'detail': 'Email already registered.'}, status=status.HTTP_400_BAD_REQUEST)

        user.username = username
        user.email = email
        if password:
            user.set_password(password)
        user.save()
        tokens = get_tokens_for_user(user)
        return Response({
            '_id': user.id,
            'username': user.username,
            'email': user.email,
            'name': user.get_full_name() or user.username,
            'isAdmin': user.is_staff,
            'token': tokens['access'],
        })

    return Response({
        '_id': user.id,
        'username': user.username,
        'email': user.email,
        'name': user.get_full_name() or user.username,
        'isAdmin': user.is_staff,
    })


@api_view(['POST'])
def registerUser(request):
    username = request.data.get('username', '').strip()
    email = request.data.get('email', '').strip()
    password = request.data.get('password', '')

    if not username or not email or not password:
        return Response({'detail': 'Please provide username, email and password.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'detail': 'Username already taken.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'detail': 'Email already registered.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    tokens = get_tokens_for_user(user)
    return Response({
        '_id': user.id,
        'username': user.username,
        'email': user.email,
        'name': user.get_full_name() or user.username,
        'isAdmin': user.is_staff,
        'token': tokens['access'],
    }, status=status.HTTP_201_CREATED)

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/',
        '/api/products/create/',
        '/api/products/upload/',
        '/api/products/<id>/reviews/',
        '/api/products/top/',
        '/api/products/<id>/',
        '/api/products/delete/<id>/',
        '/api/products/<update>/<id>/',
    ]
    return Response(routes)


@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, id):
    product = Product.objects.get(_id=id)
    serializer = ProductSerializer(product, many=False, context={'request': request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    order_items = data.get('orderItems', [])

    if not order_items:
        return Response({'detail': 'No order items.'}, status=status.HTTP_400_BAD_REQUEST)

    order = Order.objects.create(
        user=user,
        paymentMethod=data.get('paymentMethod', ''),
        taxPrice=data.get('taxPrice', 0),
        shippingPrice=data.get('shippingPrice', 0),
        totalPrice=data.get('totalPrice', 0),
    )

    ShippingAddress.objects.create(
        order=order,
        address=data.get('shippingAddress', {}).get('address', ''),
        city=data.get('shippingAddress', {}).get('city', ''),
        postalCode=data.get('shippingAddress', {}).get('postalCode', ''),
    )

    for item in order_items:
        try:
            product = Product.objects.get(_id=item['_id'])
        except Product.DoesNotExist:
            product = None

        OrderItem.objects.create(
            product=product,
            order=order,
            name=item['name'],
            qty=item['qty'],
            price=item['price'],
            image=item.get('image', ''),
        )

    return Response({
        '_id': order._id,
        'paymentMethod': order.paymentMethod,
        'taxPrice': str(order.taxPrice),
        'shippingPrice': str(order.shippingPrice),
        'totalPrice': str(order.totalPrice),
        'createdAt': order.createdAt,
    }, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    orders = Order.objects.filter(user=request.user).order_by('-createdAt')
    data = []
    for order in orders:
        data.append({
            '_id': order._id,
            'totalPrice': str(order.totalPrice),
            'isPaid': order.isPaid,
            'isDelivered': order.isDelivered,
            'createdAt': order.createdAt,
            'paymentMethod': order.paymentMethod,
        })
    return Response(data)


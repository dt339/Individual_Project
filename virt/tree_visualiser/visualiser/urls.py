from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('BST/', views.bst, name='bst'),
    path('AVL/', views.avl, name='avl'),
    path('BH/', views.binHeap, name='binHeap'),
    path('RB/', views.redBlack, name='redBlack'),
    path('FH/', views.fibonacci, name='fibonacci'),    
]
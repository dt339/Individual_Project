from django.urls import path
from . import views

urlpatterns = [
    path('members/', views.members, name='members'),
    path('home/', views.home, name='home'),
    path('BST/', views.bst, name='bst'),
    path('AVL/', views.avl, name='avl'),
    path('BH/', views.binHeap, name='binHeap'),
    path('Tree/', views.tree_view, name='tree')
    
]
from django.shortcuts import render 

def home(request):
  return render(request, "index.html")

def bst(request):
  return render(request, "BST.html")

def avl(request):
  return render(request, "AVL.html")

def binHeap(request):
  return render(request, "BH.html")

def redBlack(request):
  return render(request, "RB.html")

def fibonacci(request):
  return render(request, "FH.html")
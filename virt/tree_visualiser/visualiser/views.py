from django.http import HttpResponse, JsonResponse
from django.template import loader
from .models import Member
from django.shortcuts import render 


def members(request):
  mymembers = Member.objects.all().values()
  template = loader.get_template('allMembers.html')
  context = {
    'mymembers': mymembers,
  }
  return HttpResponse(template.render(context, request))

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

def tree_view(request):
  return render(request, "tree.html")

# def tree_view(request):
#   allNodes = Node.objects.all()
#   return render(request, "tree.html", {"nodes": allNodes})
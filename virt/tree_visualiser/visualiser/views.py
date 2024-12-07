from django.http import HttpResponse, JsonResponse
from django.template import loader
from .models import Member
from django.shortcuts import render 

from .tree_logic.binary_tree import TreeNode

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

def tree_view(request):
  root = TreeNode(10)
  root.insert(20)
  root.insert(5)
  root.insert(17)
  # root.insert(1)
  # root.insert(5)



  # root.insert(5)
  # root.insert(15)
  #root.insert(5)

  data = root.preorder_traversal()
  return render(request, "tree.html", {'tree_data': data})

# def tree_view(request):
#   allNodes = Node.objects.all()
#   return render(request, "tree.html", {"nodes": allNodes})
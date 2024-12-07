from django.db import models

class Member(models.Model):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)

class Tree(models.Model):
    treeName = models.CharField(max_length=255)
    root = models.IntegerField()

class Node(models.Model):
    nodeId = models.AutoField(primary_key=True)
    nodeVal = models.IntegerField()
    leftChild = models.IntegerField()
    rightChild = models.IntegerField()
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    def insert(self, value):
        if value < self.value:
            if self.left is None:
                self.left = TreeNode(value)
            else:
                self.left.insert(value)
        else:
            if self.right is None:
                self.right = TreeNode(value)
            else:
                self.right.insert(value)

    def inorder_traversal(self):
        nodes = []
        if self.left:
            nodes += self.left.inorder_traversal()
        nodes.append(self.value)
        if self.right:
            nodes += self.right.inorder_traversal()
        return nodes

    def preorder_traversal(self):
        nodes = []
        nodes.append(self.value)
        if self.left:
            nodes += self.left.preorder_traversal()
        if self.right:
            nodes += self.right.preorder_traversal()
        return nodes
    
        
    def getValue(self):
        return self.value

    def getLeft(self):
        return self.left
    
    def getRight(self):
        return self.right
    
    def setValue(self, v):
        self.value = v
    
    def setLeft(self, l):
        self.left = l

    def setRight(self, r):
        self.right = r



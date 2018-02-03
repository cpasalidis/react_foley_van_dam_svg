/* I got this implementation of avl tree from https://repl.it/@lsdkfjlksjflksd/AVL-Tree-Javascript But i heavily modified it**/
class AVLTree{
  constructor(){
    this.root = null;
    this.total_nodes = 0;
  } 
  
  insertNew = (node) =>{
    //console.log("On insert new of avl tree <" + node.name + ">");
    if (! this.root){ 
      console.log("insert at root of tree ");    
    } 
    this.root = this.insert(this.root,node);
    return;
  }

  insert = (parent,node) =>{
    let nodeName = node ? node.name: '';
    let parentName = parent ? parent.name : '';
    //console.log(" On insert of avl tree <" + node + "> root of subtree is <" + parent + "> <" + (parent ? node.compareTo(parent):-1) + ">");  }
    if (! parent) {
      this.total_nodes += 1 ;     
      return node;
    } 
    //if code reaches here, treeNode exists
    if (node.compareTo(parent) < 0){ 
      //console.log(" 00000000000000000000 on insert of avl tree ready to insert <" + node + "> to the left of <" + parent + ">"); }
       parent.left = this.insert(parent.left, node);
    } else if (node.compareTo(parent) > 0){
      //console.log(" 00000000000000000000 on insert of avl tree ready to insert <" + node + "> to the right of <" + parent + ">"); }
       parent.right = this.insert(parent.right, node);
    } 

    let balance = this.get_height(parent.left) - this.get_height(parent.right);
   //console.log("on insert of avl tree ready to calculate balance. i am <" + parent.name +  " left is <"  + (parent.left ? parent.left.name : '') + " right is <" +( parent.right ? parent.right.name : '' ) + " balance is " + balance);
    if (balance > 1){ 
      if (this.get_height(parent.left.left) >= this.get_height(parent.left.right)){
        parent = this.rotateRight(parent);
      } else {
        parent.left = this.rotateLeft(parent.left);
        parent = this.rotateRight(parent);
      } 
    } else if (balance < -1){
      if (this.get_height(parent.right.right) >= this.get_height(parent.right.left)){
        parent = this.rotateLeft(parent);
      } else {
        parent.right = this.rotateRight(parent.right);
        parent = this.rotateLeft(parent);
      } 
    } else {
      parent.height = this.set_height(parent);
    } 
    //console.log("on insert after rotating. i am <" + parent.name +  " left is <"  + (parent.left ? parent.left.name : '') + " right is <" +( parent.right ? parent.right.name : '' ));
    return parent; 
  } 
  
  get_height = (treeRoot) => {
    return treeRoot ? treeRoot.height : 0;
  } 
  
  set_height = (treeRoot) => {
    if (!treeRoot) return 0 
    let left = treeRoot.left ? treeRoot.left.height : 0 ;
    let right = treeRoot.right ? treeRoot.right.height : 0;
    return Math.max(left, right) + 1; 
  } 
  
  rotateLeft(treeRoot){
    let rotated_sub_tree = treeRoot.right;
    treeRoot.right = treeRoot.right.left;
    rotated_sub_tree.left = treeRoot; 
    treeRoot.height = this.set_height(treeRoot);
    rotated_sub_tree.height = this.set_height(rotated_sub_tree);
    return rotated_sub_tree;
  } 
  
  rotateRight(treeRoot){
    let rotated_sub_tree = treeRoot.left;
    treeRoot.left = treeRoot.left.right;
    rotated_sub_tree.right = treeRoot;
    treeRoot.height = this.set_height(treeRoot);
    rotated_sub_tree.height = this.set_height(rotated_sub_tree);
    return rotated_sub_tree;
  } 
    
  getmin = (treeRoot) => {
    if (!treeRoot) return null ;
    if (!treeRoot.left) return treeRoot ;
    return this.getmin(treeRoot.left);
  } 
  

 removeNew = (node) =>{
    //console.log("On remove new <" + (node ? node.name : '') + ">");
    if (! node) {
      console.log("request to remove new EMPTY");
      return;
    }
    if (!this.root){ 
      console.log("remove root of tree");    
      return null;
    } else {
      this.root = this.remove(this.root,node);
    }
    return;
  }


  remove(parent, node){
    let nodeName = node ? node.name : '';
    let parentName = parent ? parent.name : '';
    //console.log("On remove <" + nodeName + "> root of subtree is <" + parentName + ">");  
    if (!parent) return null;
    if (node.compareTo(parent) === 0){
      //console.log("ready to actually remove " + node.name );
      if (!parent.left && !parent.right){ this.total_nodes -= 1; return null; }
      if (!parent.left){ this.total_nodes -= 1; return parent.right; } 
      if (!parent.right){ this.total_nodes -= 1; return parent.left; } 
      //if code reaches here, both children exist
      let temp_node = this.getmin(parent.right);
      parent.right = this.remove(parent.right, temp_node);
    } else if (node.compareTo(parent) < 0){
      parent.left = this.remove(parent.left, node);
      let childName = parent.left ? parent.left.name : '';
      //console.log("left of <"+parent.name + "> is <" + childName + ">" )
    } else if (node.compareTo(parent) > 0){
      parent.right = this.remove(parent.right, node);
      let childName = parent.right ? parent.right.name: '';
      //console.log("right of <"+parent.name + "> is <" + childName + ">" )
    }
    let balance = this.get_height(parent.left) - this.get_height(parent.right);
    if (balance > 1){ 
      if (this.get_height(parent.left.left) >= this.get_height(parent.left.right)){
        parent = this.rotateRight(parent);
      } else {
        parent.left = this.rotateLeft(parent.left);
        parent = this.rotateRight(parent);
      }
    } else if (balance < -1){ 
        if (this.get_height(parent.right.right) >= this.get_height(parent.right.left)){
          parent = this.rotateLeft(parent);
        } else {
          parent.right = this.rotateRight(parent.right);
          parent = this.rotateLeft(parent);
        }
    } else {
      parent.height = this.set_height(parent);
    } 
    return parent;
  } //of remove
  


  printTree = (namesOnly) => {    
    let newline = "\n", q = [this.root, newline], str = '';
    while (q.length > 0){
      let tree_node = q.shift();
      let textToShow =newline ;
      if (tree_node !== newline ) {
        if (namesOnly) {
          textToShow = tree_node.name;
        } else {
          textToShow = tree_node.toString();
        }
      }
      str += textToShow + " ";
      if (tree_node !== newline) {
        console.log("tree node <" + tree_node.name + "> has childdren " + (tree_node.left ? tree_node.left.name : '') + " and " + (tree_node.right ? tree_node.right.name : ''));
      }
      if (tree_node !== newline && tree_node.left) q.push(tree_node.left) ;
      if (tree_node !== newline && tree_node.right) q.push(tree_node.right);
      if (tree_node === newline && q.length !== 0) q.push(newline) ;
    }
    console.log(str.trim())
  } 

  size = () => {
    return this.total_nodes;
  }

  leafsInOrderNew = () =>{
    let result = [];
    if (! this.root) { return result; }
    return result.concat(this.leafsInOrder(this.root));
  }

   leafsInOrder = (treeRoot) =>{
     let result = [];
     if (! treeRoot) {
       return result;
     }
     let leftName = treeRoot.left ? treeRoot.left.name:'';
     let rightName = treeRoot.right ? treeRoot.right.name:'';
     //console.log("leafsinorder: name <" + treeRoot.name + "> left <" + leftName + "> right <" + rightName + ">");
     if ((! treeRoot.left) && (! treeRoot.right)) {
       //leaf node...return name
       return result.concat([treeRoot.name]);
     }
     if (treeRoot.left) {
       result =  result.concat(this.leafsInOrder(treeRoot.left));
     }
     if (treeRoot.right) {
       result = result.concat(this.leafsInOrder(treeRoot.right));
     }
     return result;
    //return treeRoot ? this.leafsInOrder(treeRoot.left).concat([treeRoot.name]).concat(this.leafsInOrder(treeRoot.right)) : []
    }
    
  
    inOrderTraversalNew = () =>{
      let result = [];
      if (! this.root) { return result; }
      return result.concat(this.inOrderTraversal(this.root));
    }
  
    
    inOrderTraversal = (treeRoot) =>{
      let result = [];
      if (treeRoot.left) {
        result =  result.concat(this.inOrderTraversal(treeRoot.left));
      }
      result = result.concat([treeRoot]);
      if (treeRoot.right) {
        result = result.concat(this.inOrderTraversal(treeRoot.right));
      }
      return result;
     //return treeRoot ? this.leafsInOrder(treeRoot.left).concat([treeRoot.name]).concat(this.leafsInOrder(treeRoot.right)) : []
     }
  
    bfs_traversal = () => {
      let queue = [this.root], arr = []
      while (queue.length > 0){
        let tree_node = queue.shift()
        console.log("avl_tree:bfs_traversal got <" + tree_node.name + ">");
        arr.push(tree_node)
        if (tree_node.left){ queue.push(tree_node.left);console.log("avl_tree:bfs_traversal push left <" + tree_node.left.name + ">"); } 
        if(tree_node.right){ queue.push(tree_node.right);console.log("avl_tree:bfs_traversal push right <" + tree_node.right.name + ">"); } 
      }
      return arr 
    } 
} //of class

export default AVLTree;

/*
function bfs_traversal(tree){
  let queue = [tree], arr = []
  while (queue.length > 0){
    let tree_node = queue.shift()
    arr.push(tree_node.value)
    if (tree_node.left){ queue.push(tree_node.left) } 
    if(tree_node.right){ queue.push(tree_node.right) } 
  }
  return arr 
} 

function inorder(tree){
  return tree ? inorder(tree.left).concat([tree.value]).concat(inorder(tree.right)) : []
  } 

function preorder(tree){
  return tree ? [tree.value].concat(preorder(tree.left)).concat(preorder(tree.right)) : []
  } 

function postorder(tree){
  return tree ? postorder(tree.left).concat(postorder(tree.right)).concat([tree.value]) : []
  } 

function print_tree(avl){
  let newline = "\n", q = [avl, newline], str = ''
  while (q.length > 0){
    tree_node = q.shift()
    str += tree_node == newline ? newline : tree_node.value.toString() + " "
    if (tree_node != newline && tree_node.left) q.push(tree_node.left) 
    if (tree_node != newline && tree_node.right) q.push(tree_node.right)
    if (tree_node == newline && q.length != 0) q.push(newline) 
  }
  console.log(str.trim())
} 


let avl = new AVL_Tree() 
let tree = null 
tree = avl.insert(tree, 10)
tree = avl.insert(tree, 50)
tree = avl.insert(tree, 40)
tree = avl.insert(tree, 100)
tree = avl.insert(tree, 60)
tree = avl.insert(tree, 30)
tree = avl.insert(tree, 0)
// tree = avl.remove(tree, 40)
// tree = avl.remove(tree, 50)
// tree = avl.remove(tree, 60)
print_tree(tree)
JSON.stringify(tree)
*/


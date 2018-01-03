
class TreeNode {
    
     compareTo = (anotherNode) => {
       return this.val-anotherNode.val;
     }

     value = () => { 
         return this.val; 
    }

    constructor(value) {
        this.left = null;
        this.right = null;
        this.val = value;
    }

} //of class

export default TreeNode;
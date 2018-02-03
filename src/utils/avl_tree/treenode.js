
/** This is a treenode for simple data structures */
class TreeNode {
    constructor(data,name) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.height = 1;
        this.name = name;
    }

    compareTo = (other) => {
       return this.data - other.data;
    }

    toString = () => {
        return "TreeNode " + this.data;
    }

    value = () => { 
        return this.data; 
   }

   name = () => {
       return this.name;
   }

   copy = () => {
       let t = new TreeNode(this.data,this.name);
       return t;
   }

   isLeaf = () => {
       return ((!this.left) && (!this.right));
   }
} //of class TreeNode

export default TreeNode;
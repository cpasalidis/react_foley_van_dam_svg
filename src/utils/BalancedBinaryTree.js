
/** The object added,removed in this tree MUST have a 1) compare(sameClassDifferentInstance) with values a) <0 b) ===0 c) > 0 and 2) a left,right pointer 3) a value() function
 * eg
 * var node = {
    value: 125,
    left: null,
    right: null
    compareTo(node): function...
};
 */
class BalancedBinaryTree {

    constructor() {
        this.root=null;

    } //of constructor

    //helper function
    _inOrder = (node,process) => {
        if (node){

            //traverse the left subtree
            if (node.left !== null){
               this._inOrder(node.left,process);
            }            

            //call the process method on this node
            process( node);

            //traverse the right subtree
            if (node.right !== null){
                this._inOrder(node.right,process);
            }
        }
    }


    /** traverses the tree applying the process() to each node visited */
    _traverse = (process) => {
        //start with the root
        this._inOrder(this.root,(node)=>{process(node)});
    } //of method

    add = (node) => {
        let current = null;
        //special case: no items in the tree yet
        if (this.root === null) {
            this.root = node;
        } else {
            current = this.root;
            while (true) {
                //if the new value is less than this node's value, go left
                if (node.compareTo(current) < 0) {
                    //if there's no left, then the new node belongs there
                    if (current.left === null){
                        current.left = node;
                        break;
                    } else {
                        current = current.left;
                    }
                //if the new value is greater than this node's value, go right
                } else if (node.compareTo(current) > 0){

                    //if there's no right, then the new node belongs there
                    if (current.right === null){
                        current.right = node;
                        break;
                    } else {
                        current = current.right;
                    }       
                //if the new value is equal to the current one, just ignore
                } else {
                    break;
                }
            } //of while
        } //of else...when a root node already exists
    } //of method

    size =() =>{
        let  length = 0;

        this._traverse((node) => {
            length++;
        });

        return length;
    } //of size()

    toArray = () =>{
        var result = [];

        this._traverse((node)=> {
            result.push(node.value());
        });

        return result;
    } //of toArray()

    toString = () => {
        return this.toArray().toString();
    }
} //of class

export default BalancedBinaryTree;
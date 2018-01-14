
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

    contains = (node) => {
        let found = false;
        let current = this.root;

        while (!found && current) {
            //if the value is less than the current node's, go left
            if (node.compareTo(current) < 0){
                current = current.left;

            //if the value is greater than the current node's, go right
            } else if (node.compareTo(current) > 0){
                current = current.right;

            //values are equal, found it!
            } else {
                found = true;
            }
        } //of while

        //only proceed if the node was found
        return found;
    } //of method

    remove = (node) => {
        let found = false;
        let parent = null;
        let current = this.root;
        let childCount = 0;
        let replacement = 0;
        let replacementParent = null;

                //make sure there's a node to search
                while(!found && current){

                    //if the value is less than the current node's, go left
                    if (node.compareTo(current) < 0){
                        parent = current;
                        current = current.left;
        
                    //if the value is greater than the current node's, go right
                    } else if (node.compareTo(current) > 0){
                        parent = current;
                        current = current.right;
        
                    //values are equal, found it!
                    } else {
                        found = true;
                    }
                }
        
                //only proceed if the node was found
                if (found){
                     //figure out how many children...check left subtree then right subtree
                    childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);
                    //special case: the value is at the root
                    if (current === this.root) {
                        switch(childCount){
                            //no children, just erase the root
                            case 0:
                                this.root = null;
                                break;        
                            //one child, use one as the root
                            case 1:
                                this.root = (current.right === null ? current.left : current.right);
                                break;
                            //two children, little work to do
                            case 2:
                                //new root will be the old root's left child
                                //...maybe
                                replacement = this.root.left;

                                //find the right-most leaf node to be 
                                //the real new root
                                while (replacement.right !== null){
                                    replacementParent = replacement;
                                    replacement = replacement.right;
                                }

                                //it's not the first node on the left
                                if (replacementParent !== null){

                                    //remove the new root from it's 
                                    //previous position
                                    replacementParent.right = replacement.left;
                                    //give the new root all of the old 
                                    //root's children
                                    replacement.right = this.root.right;
                                    replacement.left = this.root.left;
                                } else {
                                    //just assign the children
                                    replacement.right = this._root.right;
                                }

                                //officially assign new root
                                this.root = replacement;        
                                break;
                          default:
                            break; //no default on this switch statement        
                        }        
                    //non-root values
                    } else {
                        switch (childCount){

                            //no children, just remove it from the parent
                            case 0:
                                //if the current value is less than its 
                                //parent's, null out the left pointer
                                if (current.compareTo(parent) < 0){
                                    parent.left = null;
        
                                //if the current value is greater than its
                                //parent's, null out the right pointer
                                } else {
                                    parent.right = null;
                                }
                                break;
        
                            //one child, just reassign to parent
                            case 1:
                                //if the current value is less than its 
                                //parent's, reset the left pointer
                                if (current.compareTo(parent) < 0){
                                    parent.left = (current.left === null ? current.right : current.left);
                                //if the current value is greater than its 
                                //parent's, reset the right pointer
                                } else {
                                    parent.right = (current.left === null ? current.right : current.left);
                                }
                                break;    
        
                            //two children, a bit more complicated
                            case 2:                                
                                //reset pointers for new traversal
                                replacement = current.left;
                                replacementParent = current;

                                //find the right-most node
                                while(replacement.right !== null){
                                    replacementParent = replacement;
                                    replacement = replacement.right;
                                }

                                replacementParent.right = replacement.left;

                                //assign children to the replacement
                                replacement.right = current.right;
                                replacement.left = current.left;

                                //place the replacement in the right spot
                                if (current.compareTo(parent) < 0){
                                    parent.left = replacement;
                                } else {
                                    parent.right = replacement;
                                }          
                                break;
                            default:
                                break; //no default on this switch statement
        
                        } //of switch
                    } //of if...in case this is not root of the whole tree
                } //if found
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

    toStringArray = () => {
        var result = [];

        this._traverse((node)=> {
            result.push(node.toString());
        });

        return result;
    } //of method

    toString = () => {
        return this.toStringArray();
    }
} //of class

export default BalancedBinaryTree;
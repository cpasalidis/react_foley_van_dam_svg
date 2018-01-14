import TreeNode from './treenode';

const XC=0;
const YC=1;
class Point2DTreeNode extends TreeNode {

    constructor(x,y,reverse,userData,name) {
        super( [x,y],name); //position in array is index of vertex        
        this._reverse = reverse;
        this.userData = userData;
    }

    X=() => { return this.data[XC]; }
    Y=() => { return this.data[YC]; }
    
    /** we process points top to bottom, left to right */
    compareTo = (anotherNode) => {
        let yComparison = this.Y() - anotherNode.Y();
        if (this._reverse) {  yComparison =  anotherNode.Y() - this.Y(); }
        if (yComparison !== 0) {
            return yComparison;
        } else {
            let xComparison = this.X() - anotherNode.X();
            if (this._reverse) {  xComparison =  anotherNode.X() - this.X(); }
            return xComparison;
        }
      } //of method
 
     toString = () => {
        return ""+this.data + "~" + this.userData;
    }

};

export default Point2DTreeNode;
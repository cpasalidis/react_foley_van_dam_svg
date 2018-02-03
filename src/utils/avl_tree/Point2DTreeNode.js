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
       //console.log("comparing reverse= <" + this._reverse + "> <" + this.name + "> with <" + (anotherNode ? anotherNode.name:'') + ">");        
        let yComparison = this.Y() - anotherNode.Y();
        if (this._reverse) {  yComparison =  anotherNode.Y() - this.Y(); }
        //console.log("ycomparison is <" + yComparison +">");
        if (yComparison !== 0) {
            return yComparison;
        } else {
            let xComparison = anotherNode.X() - this.X();
            if (this._reverse) {  xComparison =  this.X() - anotherNode.X(); }
           //console.log("xcomparison is <" + xComparison +">");
            return xComparison;
        }
      } //of method
 
     toString = () => {
        return ""+this.name + "=" + this.data + "~" + this.userData;
    }

    copy = () => {
        let t = new Point2DTreeNode(this.X(),this.Y(),this._reverse,this.userData,this.name);
        return t;
    }

    getUserData = () => {
        return this.userData;
    }

};

export default Point2DTreeNode;
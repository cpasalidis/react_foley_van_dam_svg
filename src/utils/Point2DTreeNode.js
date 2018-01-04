
const XC=0;
const YC=1;
class Point2DTreeNode {

    constructor(x,y,reverse) {
        this.left = null;
        this.right = null;
        this._data = [x,y]; //position in array is index of vertex        
        this._reverse = reverse;
    }

    X=() => { return this._data[XC]; }
    Y=() => { return this._data[YC]; }
    
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
 
      value = () => { 
          return this._data; 
     }
 
};

export default Point2DTreeNode;
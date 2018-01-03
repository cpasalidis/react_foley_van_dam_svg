
const XC=0;
const YC=1;
class Point2DTreeNode {

    constructor(x,y) {
        this.left = null;
        this.right = null;
        this._data = [x,y]; //position in array is index of vertex        
    }

    X=() => { return this._data[XC]; }
    Y=() => { return this._data[YC]; }
    
    /** we process points top to bottom, left to right */
    compareTo = (anotherNode) => {
        let yComparison = this.Y() - anotherNode.Y();
        if (yComparison !== 0) {
            return yComparison;
        } else {
            return this.X() - anotherNode.X();
        }
      }
 
      value = () => { 
          return this._data; 
     }
 
};

export default Point2DTreeNode;
import TreeNode from './treenode';

/** This is a treenode with a line segment as data. comparison brings first the one with bigger y and if same y than the one with smaller x */
class TreeNodeWithLineSegment extends TreeNode {
    constructor(x1,y1,x2,y2,name) {
        //each line segment is a 2d array [start,end] where start=[x1,y1] and end=[x2,y2]
        super([[x1,y1],[x2,y2]],name);
        this.START=0;
        this.END=1;
        this.X=0;
        this.Y=1;
        this.contains = []; //each item is a 2element array with x,y of a contained point        
    }

    compareTo = (other) => {
        let y2 = this.data[this.END][this.Y];
        let othery2 = other.data[this.END][this.Y];
       let comp = y2-othery2;
       if (comp === 0) {
           let x2 =this.data[this.END][this.X];
           let otherx2 =  other.data[this.END][this.X];
            comp = x2 - otherx2;
       }
       return comp;
    }

    toString = () => {
        return "TreeNodeWithLineSegment " + this.name;
    }

    value = () => { 
        return this.data; 
   }

   copy = () => {
       let t = new TreeNodeWithLineSegment(this.data[this.START][this.X],this.data[this.START][this.Y],this.data[this.END][this.X],this.data[this.END][this.Y],this.name);
       return t;
   }

   endsIn = (x,y) => {
       return (this.data[this.END][this.X]) === x && (this.data[this.END][this.Y] === y);
   }

   setContaining = (x,y) => {
       if (! this.isContaining(x,y)) {
           this.contains.push([x,y]);
       }
   }

   isContaining = (x,y) => {
        for (let i = 0; i < this.contains.length; i++) {
            let aPoint = this.contains[i];
                if (aPoint[this.X] === x && aPoint[this.Y] === y) { return true; }
        }
        return false;
   }

} //of class TreeNode

export default TreeNodeWithLineSegment;

const XC=0;
const YC=1;
class Vector2D {

    constructor(x,y) {
        this._data = [x,y]; //position in array is index of vertex        
    }

    X=() => { return this._data[XC]; }
    Y=() => { return this._data[YC]; }
    
    lengthOfVector = () => {
        const vy = this._data[YC];
        const vx = this._data[XC];
        return Math.sqrt(vy*vy+vx*vx);
    }

    innerProductWithVector = (ve2) => {
        const inner1and2=this._data[XC]*ve2._data[XC] + this._data[YC]*ve2._data[YC];
        return inner1and2;
    }

    innerNormalizedProductWithVector = (ve2) => {
        const inner1and2=this.innerProductWithVector(ve2);
        const lve1 = this.lengthOfVector();
        const lve2 = ve2.lengthOfVector();
        return inner1and2/(lve1*lve2);
    }

    outerProductWithVector = (ve2) => {
        const outer1and2=this._data[XC]*ve2._data[YC] - this._data[YC]*ve2._data[XC];
        return outer1and2;
    }

    outerNormalizedProductWithVector = (ve2) => {
        const outer1and2=this.outerProductWithVector(ve2);
        const lve1 = this.lengthOfVector();
        const lve2 = ve2.lengthOfVector();
        return outer1and2/(lve1*lve2);
    }

    printInfo ()  {
        console.log("printinfo");
        //test/console.log("Lenght of unit vectors " +  this.lengthOfVector([1,0]) + " " + this.lengthOfVector([0,1]) + " and of 1,1 vector " + this.lengthOfVector([1,1]) + " and of 3,4 vector " + this.lengthOfVector([3,4]));
        //test/console.log("Inner product tests: " + this.innerProductVectors([1,0],[0,1]) + " " + this.innerProductVectors([1,0],[1,1])  + " " + this.innerProductVectors([0,1],[1,1]));
       // console.log("Cross product tests " + this.outerProductVectors([1,0],[0,1]) + " " + this.outerProductVectors([1,0],[1,1])  + " " + this.outerProductVectors([1,0],[-1,-1]));
    }
};

export default Vector2D;
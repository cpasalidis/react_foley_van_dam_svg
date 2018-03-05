
//https://stackoverflow.com/questions/1165647/how-to-determine-if-a-list-of-polygon-points-are-in-clockwise-order
//the cross product (e3wteriko ginomeno) will be used. sin(8eta)=vXw/||v||*||w||
// (no need to take arcsine all we will care about is whether sign turns out positive or negative)

class TzEdge {
    constructor(name,sName,eName) {
        this.name = name;
        this.sName = sName;
        this.eName = eName;
    }

    toString = () => { return "TzEdge: " + this.name + " : " + this.sName + "," + this.eName;}
} //of class


/** This is a vertex data structure as defined in section 2.2 page 32 */
class TzVertex {
    constructor(name,x,y) {
        this.x = x;
        this.y = y;
        this.name = name;
    }

    toString = () => { return "TzVertex: " + this.name + " " + this.x + "," + this.y ;}
} //of class

class Trapezio {
    constructor (name,left,right,up,down,neighbors) {
        this.name = name;
        this.neighbors = []; //max 4 neigbors by names
        this.leftP = ''; //name of left akro
        this.rightP = ''; //name of right akro
        this.upS = ''; //name of up segment
        this.downS = ''; //name of down segment
    }

    set neighbor (name) { this.neighbors.push(name);}
    toString = () => { return "Trapezio: " + this.name + " l: " + this.leftP + " r: " + this.rightP + " u:" + this.upS + " d: " + this.downS + " nb: " + this.neighbors;}
} //of class

// T(S) pg 128
class TofS {

    constructor(name) {
        this.name = name;
        this.vertices = new Map();
        this.segments = new Map();
        this.trapezia = new Map();
    }

    setVertex = (name,x,y) => { this.vertices.set(name, new TzVertex(name,x,y)); }
    setSegment = (name,x1,y1,x2,y2) => { this.segments.set(name,new TzEdge(name,x1,y1,x2,y2)); }
    setTrapezio = (name,left,right,up,down,neighbors) => { this.trapezia.set(name,new Trapezio(name,left,right,up,down,neighbors));}
    get verticesArr () { return Array.from(this.vertices, ([key, value]) => value);}
    get edgesArr () { return Array.from(this.segments, ([key, value]) => value);}

    toString = () => {
        let s = this.name;
        for (let v of this.vertices) { s += v.toString + ",";}
        for (let sg of this.segments) { s += sg.toString + ",";}
        for (let tr of this.trapezia) { tr += tr.toString + ",";}
        s = s.slice(-1);
        return s;
    }

    printInfo = () =>  {
        console.log("printinfo");
        console.log(this.toString);
    }
} //of class



export default TofS;
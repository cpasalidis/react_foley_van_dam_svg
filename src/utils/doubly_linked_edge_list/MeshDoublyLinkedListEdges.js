
//https://stackoverflow.com/questions/1165647/how-to-determine-if-a-list-of-polygon-points-are-in-clockwise-order
//the cross product (e3wteriko ginomeno) will be used. sin(8eta)=vXw/||v||*||w||
// (no need to take arcsine all we will care about is whether sign turns out positive or negative)
const EI=0;
const EJ=1;
const XC=0;
const YC=1;


class DdEdge {
    constructor(name,start) {
        this.name = name;
        this.start = start;
        this.twin = null;
        this.face = null;
        this.previousInFace = null;
        this.nextInFace = null;
    }

    getName = () => { return this.name;}
    getStart = () => { return this.start;}
    setStart = (start) => { this.start = start; }
    getTwin = () => { return this.twin;}
    setTwin = (twin) => { this.twin = twin; }
    getFace = () => { return this.face;}
    setFace = (face) => { this.face = face;}
    setPreviousInFace = (previousEdge) => { this.previousInFace = previousEdge;}
    getPreviousInFace = () => { return this.previousInFace;}
    setNextInFace = (nextEdge) => { this.nextInFace = nextEdge; }
    getNextInFace = () => { return this.nextInFace; }
    getEnd = () => { return this.getTwin() ? this.getTwin().getStart() : null ; }
    //toString = () => { return "DdEdge: " + this.name + " s: " + this.start + " tw: " + this.twin + " f: " + this.face + "prev: " + this.previousInFace + " n: " + this.nextInFace;}
    toString = () => { return "DdEdge: " + this.name + " s: " + this.start.getName() + " tw: " + this.twin.getName() + 
    " f: " + (this.face ? this.face.getName():'') + 
    " prev: " + (this.previousInFace ? this.previousInFace.getName() : '') + 
    " n: " + (this.nextInFace ? this.nextInFace.getName() : '');}
} //of class

class DdFace  {
    constructor(name,boundingEdge,holeEdges) {
        this.name = name;
        this.boundEdge = boundingEdge;
        this.holeEdges = holeEdges;
    }

    getName = () => { return this.name; }
    addBoundingEdge = (edge) => { this.boundEdge = edge;}
    getBoundingEdge = () => { return this.boundEdge;}
    addHoleEdge = (he) => {this.holeEdges.push(he); }
    getHoleEdges = () => { return this.holeEdges; }
    toString = () => { 
        let heNames = "";
        for (let he of this.holeEdges) {
            heNames += he.getName()+",";
        }
        return "DdFace: " + this.name + " e: " + (this.boundEdge ? this.boundEdge.getName():'') + " he's: " + heNames.slice(0,-1);
    }

} //of class

/** This is a vertex data structure as defined in section 2.2 page 32 */
class DdVertex {
    constructor(name,x,y) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.edge = null;
    }

    X = () => { return this.x;}
    Y = () => { return this.y;}

    getName = () => { return this.name; }
    addEdge = (edge) => {this.edge = edge;}
    getEdge = () => { return this.edge; }

    toString = () => { return "DdVertex: " + this.name + " " + this.x + "," + this.y + " " + (this.edge ? this.edge.getName(): '') ;}
} //of class


//edge: akmh, vertex: koryfh: face:edra
class MeshDoublyLinkedListEdges {
    constructor(isHoldingFacesInfo) {
        this.isHoldingFacesInfo = isHoldingFacesInfo;
        this.vertices = {}; //vertices by name        
        this.edges = {}; //edges by name
        this.faces = {}; //faces by name
        
    }

    addVertex =(x,y,name) => {
        //console.log("Adding point <" + x + ',' + y+'> Not checking if already exists');                
        this.vertices[name] = new DdVertex(name,x,y);    
    }

    addFace = (kName,holeNames,name) => {
        let edge = kName ? this.edges[kName]:null;
        let holeEdges = [];
        for (let heName of holeNames) {
            let e = this.edges[heName];
            if (e) {holeEdges.push(e);}
        }
        this.faces[name] = new DdFace(name, edge,holeEdges);
        if (edge) { 
            edge.setFace(this.faces[name]);
        }
    }
    addEdge = (iName,jName,name,twinName) => {
       // console.log("Adding edge from  <" + i + ' to ' + j+'> Not checking if already exists');                
       let ed = new DdEdge(name,this.vertices[iName])
       this.vertices[iName].addEdge(ed);
       let twName = twinName ? twinName : name+".twin";
       let twed = new DdEdge(twinName,this.vertices[jName]);
       this.vertices[jName].addEdge(twed);
       ed.setTwin(twed);
       twed.setTwin(ed);
       this.edges[ed.getName() ] = ed;
       this.edges[twed.getName()] = twed;
    }

    setNextPreviousFaceOfEdge(edgeName,nextName,previousName,faceName) {
        if (this.edges[edgeName] && this.edges[previousName]) {
            this.edges[edgeName].setPreviousInFace(this.edges[previousName]);
        }
        if (this.edges[edgeName] && this.edges[nextName]) {
            this.edges[edgeName].setNextInFace(this.edges[nextName]);
        }
        if (this.edges[edgeName] && this.faces[faceName]) {
            this.edges[edgeName].setFace(this.faces[faceName]);
        }
    } //of method

    getEdgesStartingOf = (vertexName) =>  {
        let ret = [];
        for (let e in this.edges.values()) {
            if (e.getStart().getName() === vertexName) {
                ret.push(e);
            }
        }
        return ret;
    }

    getVerticesOfEdge = (edgeName) => {

        let vertexi = this.edges[edgeName].getStart();
        let vertexj = this.edges[edgeName].getTwin().getStart();
        return [vertexi,vertexj];
    }

    deleteEdge = (edgeName) => {
        /* leave it for now...you cannot delete an edge
        const vertices = this.getVerticesOfEdge(edgeName) ;
        this._deleteEdgeNeighbor(this.neighbors[vertices[EI]],edgeName);
        this._deleteEdgeNeighbor(this.neighbors[vertices[EJ]],edgeName);
        this.edges.splice(edgeName,1);
        */
    }

    getVertices = ()  => {
        return Object.values(this.vertices);
    }

     getEdges = ()  => {
        return Object.values(this.edges);
    }

    getFaces = () => {
        return Object.values(this.faces);
    }
    printInfo = () =>  {
        console.log("printinfo");
        console.log("Vertices");
        //console.log(" ===?=== <" + JSON.stringify(this.vertices));
        for (let v of Object.values(this.vertices)) {
            console.log(v.toString()); //each vertex in a new line
        }
        for (let e of Object.values(this.edges)) {
            console.log(e.toString()); //each edge in a new line
        }
        for (let f of Object.values(this.faces)) {
            console.log(f.toString()); //each face in a new line
        }

    }
};

export default MeshDoublyLinkedListEdges;
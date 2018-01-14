import Vector2D from './Vector2D';

//https://stackoverflow.com/questions/1165647/how-to-determine-if-a-list-of-polygon-points-are-in-clockwise-order
//the cross product (e3wteriko ginomeno) will be used. sin(8eta)=vXw/||v||*||w||
// (no need to take arcsine all we will care about is whether sign turns out positive or negative)
const EI=0;
const EJ=1;
const XC=0;
const YC=1;

class Mesh1D {
    constructor() {
        this.vertices = []; //position in array is index of vertex
        this.edges = []; //position in array is index of edge, elements are pair of vertex positions in vertices array
        this.neighbors=[]; //position in array is neighbors of vertex eg neighbors[i] is neighbors of vertices[i]
        
    }

    /** cross product of edges with indexes e1 and e2 **/
    _vectorOfEdge = (e) => {
        let vertexi = this.vertices[ this.edges[e][EI] ];
        let vertexj = this.vertices[ this.edges[e][EJ] ];
        let vy = vertexj[YC]-vertexi[YC];
        let vx = vertexj[XC]-vertexi[XC];
        return new Vector2D(vx,vy);
    }

    _lengthOfVector = (v) => { return v.lengthOfVector();  }

    _innerProductVectors = (ve1,ve2) => { return ve1.innerNormalizedProductWithVector(ve2); }

    _outerProductVectors = (ve1,ve2) => { return ve1.outerNormalizedProductWithVector(ve2); }

    _innerProduct = (e1,e2) => {
        const ve1 = this.vectorOfEdge(e1);
        const ve2 = this.vectorOfEdge(e2);
        return this._innerProductVectors(ve1,ve2);
    }

    _outerProduct = (e1,e2) => {
        const ve1 = this._vectorOfEdge(e1);
        const ve2 = this._vectorOfEdge(e2);
        return this._outerProductVectors(ve1,ve2);
    }

    /* inserts an edge to a table of neighbors. if table of neighbors is emtpy, isnerts at first element */
    _insertEdgeNeighbor = (neighborsArr,edgeIdx) => {
        var isBefore=0;
        for (var ii = 0; ii < neighborsArr.length;ii++) {
            var outerProductRes = this._outerProduct(ii,edgeIdx);
            if (outerProductRes < 0)  {
                isBefore = ii;
                break;
             }
        } //for
        neighborsArr.splice(isBefore,0,edgeIdx);
    }

    addVertex =(x,y) => {
        //console.log("Adding point <" + x + ',' + y+'> Not checking if already exists');                
        this.vertices.push( new Vector2D(x,y));    
    }

    addEdge = (i,j) => {
       // console.log("Adding edge from  <" + i + ' to ' + j+'> Not checking if already exists');                
        this.edges.push([i,j]);
        //i also have to add this edge to the neighbors of both i and j keeping teh counterclockwise order of neighbors.
        //To keep the order (imagine adding a 3rd,4th e.tc edge ) i calculate e3wteriko ginomeno of the new edge with the previous edges and insert the new edge when the 
        //outer product (ie sine of angle between two edges) is positive. So if for vertex k there is edge k,1 and k,2 and i want to add a edge k,3
        //i will calculate outer product c1 = (k,1)x(k,3) and c2 = (k,2)x(k,3) if c1>0 i will add edge k,3 after k,1 if c2 < 0 i will add edge k,3 before k,2 If c1<0 i will add k,3 before k,1
        const edgeIdx = this.edges.length-1;
        if (! this.neighbors[i]) { this.neighbors[i] = [];  } 
        this._insertEdgeNeighbor(this.neighbors[i],edgeIdx);        
        if (! this.neighbors[j]) { this.neighbors[j] = []; } 
        this._insertEdgeNeighbor(this.neighbors[j],edgeIdx);
    }

    getEdgesOf = (vertexIdx) =>  {
        return this.neighbors[vertexIdx];
    }

    getVerticesOfEdge = (edgeIdx) => {
        let vertexi = this.verices[ this.edges[edgeIdx][EI] ];
        let vertexj = this.verices[ this.edges[edgeIdx][EJ] ];
        return [vertexi,vertexj];
    }

    _deleteEdgeNeighbor = (neighborsArr,edgeIdx) => {
        var neIdx = -1;
        for (var ii = 0; ii < neighborsArr;ii++) {
            if (neighborsArr[ii] === edgeIdx) {
                neIdx = ii;
                break;
            }
        } //for
        if (neIdx > -1) {
            neighborsArr.splice(neIdx,1);
        }        
    }

    deleteEdge = (edgeIdx) => {
        const vertices = this.getVerticesOfEdge(edgeIdx) ;
        this._deleteEdgeNeighbor(this.neighbors[vertices[EI]],edgeIdx);
        this._deleteEdgeNeighbor(this.neighbors[vertices[EJ]],edgeIdx);
        this.edges.splice(edgeIdx,1);
    }

    vertices ()  {
        return this.vertices;
    }

     edges ()  {
        return this.edges;    
    }

    printInfo ()  {
        console.log("printinfo");
        /*
        this.vertices.forEach(vertex => {
            console.log("Vertex " + vertex.X() + "," + vertex.Y());
        });
        */
        //test/console.log("Lenght of unit vectors " +  this.lengthOfVector([1,0]) + " " + this.lengthOfVector([0,1]) + " and of 1,1 vector " + this.lengthOfVector([1,1]) + " and of 3,4 vector " + this.lengthOfVector([3,4]));
        //test/console.log("Inner product tests: " + this.innerProductVectors([1,0],[0,1]) + " " + this.innerProductVectors([1,0],[1,1])  + " " + this.innerProductVectors([0,1],[1,1]));
       // console.log("Cross product tests " + this.outerProductVectors([1,0],[0,1]) + " " + this.outerProductVectors([1,0],[1,1])  + " " + this.outerProductVectors([1,0],[-1,-1]));
    }
};

export default Mesh1D;
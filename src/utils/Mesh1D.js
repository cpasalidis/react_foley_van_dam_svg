
class Mesh1D {
    constructor() {
        this.vertices = []; //position in array is index of vertex
        this.edges = []; //position in array is index of edge, elements are pair of vertex positions in vertices array
        this.neighbors=[]; //position in array is neighbors of vertex eg neighbors[i] is neighbors of vertices[i]
        
    }

    /** cross product of edges with indexes e1 and e2 **/
    vectorOfEdge = (e) => {
        const EI=0;
        const EJ=1;
        const XC=0;
        const YC=1;
        let vertexi = this.verices[ this.edges[e][EI] ];
        let vertexj = this.verices[ this.edges[e][EJ] ];
        let vy = vertexj[YC]-vertexi[YC];
        let vx = vertexj[XC]-vertexi[XC];
        return [vx,vy];
    }

    lengthOfVector = (v) => {
        const XC=0;
        const YC=1;
        const vy = v[YC];
        const vx = v[XC];
        return Math.sqrt(vy*vy+vx*vx);
    }

    innerProductVectors = (ve1,ve2) => {
        const XC=0;
        const YC=1;
        const inner1and2=ve1[XC]*ve2[XC] + ve1[YC]*ve2[YC];
        const lve1 = this.lengthOfVector(ve1);
        const lve2 = this.lengthOfVector(ve2);
        return inner1and2/(lve1*lve2);
    }

    innerProduct = (e1,e2) => {
        const ve1 = this.vectorOfEdge(e1);
        const ve2 = this.vectorOfEdge(e2);
        return this.innerProductVectors(ve1,ve2);
    }

    addVertex =(x,y) => {
        console.log("Adding point <" + x + ',' + y+'> Not checking if already exists');                
        this.vertices.push([x,y]);    
    }

    addEdge = (i,j) => {
        console.log("Adding edge from  <" + i + ' to ' + j+'> Not checking if already exists');                
        this.edges.push([i,j]);
        //i also have to add this edge to the neighbors of both i and j keeping teh counterclockwise order of neighbors.
        //To keep the order (imagine adding a 3rd,4th e.tc edge ) i calculate eswteriko ginomeno of the new edge with the previous edges and insert the new edge when the 
        //cross product (ie cosine angle between two edges) is smaller then the cross product of the next edge. So if for vertex k there is edge k,1 and k,2 and i want to add a edge k,3
        //i will calculate cross product c1 = (k,1)x(k,3) and then c2 = (k,1)x(k,2) the if c1 < c2 i will add edge k,3 between k,1 and k,2 If c1>c2 i will add k,3 after k,2
    }

    vertices ()  {
        return this.vertices;
    }

     edges ()  {
        return this.edges;    
    }

    printInfo ()  {
        console.log("printinfo");
        //test/console.log("Lenght of unit vectors " +  this.lengthOfVector([1,0]) + " " + this.lengthOfVector([0,1]) + " and of 1,1 vector " + this.lengthOfVector([1,1]) + " and of 3,4 vector " + this.lengthOfVector([3,4]));
        //test/console.log("Inner product tests: " + this.innerProductVectors([1,0],[0,1]) + " " + this.innerProductVectors([1,0],[1,1])  + " " + this.innerProductVectors([0,1],[1,1]));
    }
};

export default Mesh1D;
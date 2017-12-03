
class Mesh1D {
    constructor() {
        this.vertices = []; //position in array is index of vertex
        this.edges = []; //position in array is index of edge, elements are pair of vertex positions in vertices array
        this.neighbors=[]; //position in array is neighbors of vertex eg neighbors[i] is neighbors of vertices[i]
        
    }

    crossProduct = (e1,e2) => {
        const XC=0;
        const YC=1;

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
        console.log("hello");
    }
};

export default Mesh1D;
import React, { Component } from 'react';
import Mesh1D from '../utils/Mesh1D';
import {AVLTree,AVLTreeAlwaysLeafs} from '../utils/avl_tree';
import {Point2DTreeNode,TreeNodeWithLineSegment} from '../utils/avl_tree';

class MySimpleStraightPaths extends Component {
    constructor() {
        super();
        this.makemesh = this.makemesh.bind(this);
    }

    avlTreeTests = (mesh,btreeQ,btreeT) => {
      //let point4 = null; //for removal test
      //let point6 = null; //for removal test
      //let point1 = null; //for removal test
      mesh.vertices.map((vertex,index) => {
        let tn = new Point2DTreeNode(vertex.X(),vertex.Y(),true,[],"point"+index);
        //if (index  === 4) { point4 = tn;  }
        //if (index === 6) {point6 = tn;}
        //if (index === 1) {point1 = tn;}
        btreeQ.insertNew(tn);
        //btree.printTree(true) ;
        //console.log("======> <===========");
        return tn;
      })
        console.log("balanced tree size <" + btreeQ.size() + "> members <" + btreeQ.printTree(true) + ">");
        console.log("leafs in order " + JSON.stringify(btreeQ.leafsInOrderNew()));
        //< -- Removal tests 
        console.log ("REMOVING ");
          //btree.removeNew(point4);
          //btree.removeNew(point6);
          //btreeQ.removeNew(point1);
          console.log("balanced tree size <" + btreeQ.size() + "> members <" + btreeQ.printTree(true) + ">");
          console.log("RRRR ======> <===========");
        // --> Removal tests

    }
     makemesh = () => {
       const XC = 0; //index of x coordinate in mesh table
       const YC = 1; //index of y coordinate in mesh table
       const EDGE_I = 0; //index of first vertex of edge 
       const EDGE_J = 1; //index of second vertex of edge

      //
      let edgesStartingFromVertex=[]; //for each vertex contains edges starting on it
      let mesh = new Mesh1D();
      mesh.addVertex(10,200);
      mesh.addVertex(50,20);
      mesh.addVertex(50,5);
      mesh.addVertex(100,150);
      mesh.addVertex(150,220);
      mesh.addVertex(150,7);
      mesh.addVertex(200,10);
      mesh.addVertex(225,140);
      mesh.addVertex(250,9);
      mesh.addVertex(300,155);
      mesh.addEdge(0,1);
      edgesStartingFromVertex[0]=[0];
      edgesStartingFromVertex[1]=[];
      mesh.addEdge(2,3);
      edgesStartingFromVertex[2]=[1];
      edgesStartingFromVertex[3]=[];
      mesh.addEdge(4,6);
      edgesStartingFromVertex[4]=[2];
      edgesStartingFromVertex[6]=[];
      mesh.addEdge(5,7);
      edgesStartingFromVertex[5]=[3];
      edgesStartingFromVertex[7]=[];
      mesh.addEdge(8,9);
      edgesStartingFromVertex[8]=[4];
      edgesStartingFromVertex[9]=[];
      //mesh.printInfo();
      //this is the right structure for points...i just want to test the other btree/let btree = new AVLTree(); 
      let btreeQ = new AVLTree();
      let btreeT = new AVLTreeAlwaysLeafs(); 
      //avltreeTests(mesh,btreeQ,btreeT)
      mesh.vertices.map((vertex,index) => {
        let tn = new Point2DTreeNode(vertex.X(),vertex.Y(),true,edgesStartingFromVertex[index],"point"+index);
        btreeQ.insertNew(tn);
        //btree.printTree(true) ;
        //console.log("======> <===========");
        return tn;
      })
      console.log("balanced tree size <" + btreeQ.size() + "> members <" + btreeQ.printTree(true) + ">");
      let qnodes = btreeQ.bfs_traversal();
      //console.log("nodes bfs " + JSON.stringify(qnodes));
        //8elw mono thn arxh ka8e tmhmatos kai to mikrotero x paei aristera. An exoyn idio x, to mikrotero y paei aristera
        let meshEdges = mesh.edges;
        let meshVertices = mesh.vertices;        
        for (let Qi = 0; Qi < qnodes.length;Qi++) {
          //bhma1. eyresh U(p)
          let p = qnodes[Qi];
          let pIndex = p.name.substring("point".length);
          console.log('got pindex ' + pIndex);
          let pSegments = p.getUserData();
          console.log("For point <" + Qi + "> i have <" + pSegments.length + "> line segments");
          let up=[]; //segments starting with p
          if (pSegments.length > 0) {
            for (let pSegi = 0; pSegi < pSegments.length;pSegi++)  {
              let aSegment = meshEdges[pSegments[pSegi]];
              let s1 = meshVertices[aSegment[EDGE_I]];
              let s2 = meshVertices[aSegment[EDGE_J]];
              let x1 = s1.X(),y1=s1.Y(),x2=s2.X(),y2=s2.Y();
              console.log(" vertex1 is <" +JSON.stringify(s1) + "> with vertex2 is <" + JSON.stringify(s2) + "> coordinates are <" + x1 + "," + y1 + " - " + x2 + "," + y2);
              let segForT = new TreeNodeWithLineSegment(x1,y1,x2,y2,p.name +".seg" + pSegi) ;
              up.push(segForT.name);
              console.log("Adding to T element <" +JSON.stringify(segForT) + ">");
              btreeT.insertNew(segForT);
            }
            console.log("balanced tree named T size <" + btreeT.size() + "> members <" + btreeT.printTree(true) + ">");
          }
          //bhma2. briskoyme anamesa sta tmhmata poy einai apo8hkeymena sthn T ekeina poy periexoyn to p
          let px = meshVertices[pIndex].X(),py = meshVertices[pIndex].Y();
          let lp=[],cp=[];
          let tSegments = btreeT.leafsInOrderNew(false);
          for (let tSegi = 0; tSegi < tSegments.length; tSegi++) {
            let currentSegment = tSegments[tSegi];
            if (currentSegment.endsIn(px,py)) {              
              lp.push(currentSegment.name);
            } else if (currentSegment.isContaining(px,py)) {
              cp.push(currentSegment.name);
            }
          }
          //bhma 3: An to L(p) U U(p) U C(p) periexei perissotera apo ena tmhmata
          console.log(" L(p) is <" + JSON.stringify(lp) + "> C(p) is <" + JSON.stringify(cp) + "> U(p) is <" + JSON.stringify(up));
          
        }
        const CANVAS_WIDTH=500;
        const CANVAS_HEIGHT=500;
    
        return (
          <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>"
          {
            mesh.vertices.map((vertex,index) => {
              return (  <circle key={index} cx={vertex.X()} cy={vertex.Y()} r="2" stroke="black" strokeWidth="1" fill="white"/>);                      
            })
          }
          {
            mesh.edges.map((edge,index) => {
              const startpoint = mesh.vertices[edge[EDGE_I]];
              const endpoint = mesh.vertices[edge[EDGE_J]];
              return (  <line key={index} x1={startpoint.X()} y1={startpoint.Y()} x2={endpoint.X()} y2={endpoint.Y()} style={{stroke:'blue',strokeWidth:1}}/>);                      
            })
          }
          </svg>
        )
       
    }



    render() {
                 const aMesh = this.makemesh();
        return (
                <div>
                {aMesh}
                </div>
            );
    }

    } //of class
      
export default MySimpleStraightPaths;
import React, { Component } from 'react';
import Mesh1D from '../utils/Mesh1D';
import {AVLTree,AVLTreeAlwaysLeafs} from '../utils/avl_tree';
import {Point2DTreeNode,TreeNodeWithLineSegment} from '../utils/avl_tree';

class MySimpleStraightPaths extends Component {
    constructor() {
        super();
        this.makemesh = this.makemesh.bind(this);
        this.eyreshNeoySymbantos = this.eyreshNeoySymbantos.bind(this);
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

    eyreshNeoySymbantos = (sl,sr,p) => {
      //TODO
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
      //console.log("nodes bfs " + JSON.stringify(qnodes));
        //8elw mono thn arxh ka8e tmhmatos kai to mikrotero x paei aristera. An exoyn idio x, to mikrotero y paei aristera
        let meshEdges = mesh.edges;
        let meshVertices = mesh.vertices;        
        let LOOP = 0
        while (btreeQ.size() > 0 && LOOP < 100) {
          LOOP++;
          console.log("balanced tree size <" + btreeQ.size() + "> members <" + btreeQ.printTree(true) + ">");
          let qnodes = btreeQ.bfs_traversal();    
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
              up.push(segForT);
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
              lp.push(currentSegment);
            } else if (currentSegment.isContaining(px,py)) {
              cp.push(currentSegment);
            }
          }
          //bhma 3: An to L(p) U U(p) U C(p) periexei perissotera apo ena tmhmata
          let allTogether = lp.concat(cp).concat(up);          
          //i could not make Set() work so i used this trick from https://stackoverflow.com/questions/1960473/get-all-unique-values-in-an-array-remove-duplicates
          let union = allTogether.filter((value,index,self) => { return self.indexOf(value)  === index});
          console.log(" L(p) is <" + JSON.stringify(lp) + "> C(p) is <" + JSON.stringify(cp) + "> U(p) is <" + JSON.stringify(up) + "> alltoghether <" + JSON.stringify(allTogether)  + "> union is <" + JSON.stringify(union) + ">");
          //bhma 4: Anaferoyme to p ws shmeio tomhs ka8ws kai ta L(p),U(p) kai C(p)
          if (union.size > 1) {
            console.log ("SUCCESS !!! point <" + p.name + "> is an intersection point");
          }
          //bhma 5: Diagrafoyme apo thn T ta tmhmata toy L(p) u C(p)
          let lpUnionCp = lp.concat(up);
          for (let iUnionIdx = 0; iUnionIdx < lpUnionCp.length; iUnionIdx++) {
            btreeT.removeByName(lpUnionCp[iUnionIdx]);
          }
          //bhma 6: Eisagoyme sthn T ta tmhmata toy U(p) u C(p)
          let UpUnionCp = up.concat(cp);
          for (let iUpUnionCp = 0;iUpUnionCp < UpUnionCp.length; iUpUnionCp++) {
            //if T does not contain an item, i add it
            if (btreeT.getLeafByName(UpUnionCp[iUpUnionCp]).length === 0) {
              console.log("As part of step 7 i insert element <" + UpUnionCp[iUpUnionCp].name + ">");
              btreeT.insertNew(UpUnionCp[iUpUnionCp]);
            }
          }
          //bhma 8: 
         if (UpUnionCp.length === 0) {
           //bhma 9:
           let ln = -1,rn=-1;
           if (lp.length > 0) {
            for (let kk = 0; kk < tSegments.length; kk++) {
              if (tSegments[kk].compareTo(lp[0]) === 0) {
                ln=kk-1;
                rn=kk+1;
                break;
              }
            }
            if (ln < 0) { ln = -1;}
            if (rn > tSegments.length) { rn = -1;}
             if (ln > 0 ) { console.log("left neighbor is <" + tSegments[ln].name)}
             if (rn > 0 && rn < tSegments.length) { console.log("right neighbor is <" + tSegments[rn].name)}
             if ((ln > 0) && (rn > 0 && rn<tSegments.length)) {
               let sl = tSegments[ln];
               let sr = tSegments[rn];
               let newPoint = this.eyreshNeoySymbantos(sl,sr,p);
             }
           }
         }
         //bhma 11: estw s' to akraio aristero tmhma toy U(p) U C(p) sthn T
         //bhma 14: estw s'' to akraio de3io tmhma toy U(p) U C(p) sthn T
         else {
           let stonosIdx = -1;
           let sDystonosIdx = -1;
          for (let uiup = 0; uiup < UpUnionCp.length;uiup++) {
            
          for (let kkk = 0; kkk < tSegments.length; kkk++) {
            if (tSegments[kkk].compareTo(UpUnionCp[uiup]) === 0) {
             if (kkk < stonosIdx) {
               stonosIdx = kkk;
             }
             if (kkk > sDystonosIdx) {
               sDystonosIdx = kkk;
             }
            } //if found segment in leafs
          }  //for all segments known
          } //for all elements of U(p) u C(p)
          if (stonosIdx > -1) { 
            console.log("leftmost element sTonos is <" + tSegments[stonosIdx])
            let sTonos = tSegments[stonosIdx];
            //bhma 12: estw sl o aristeros geitonas toy sTonos sthn T
            if (stonosIdx > 1) {              
              let sl = tSegments[stonosIdx-1]
              this.eyreshNeoySymbantos(sl,sTonos,p);
            }
          }
          //bhma 15:
          if (sDystonosIdx > -1 && sDystonosIdx < (tSegments.length-1)) {
            let sDystonos = tSegments[sDystonosIdx];
            let sr = tSegments[sDystonosIdx+1];
            this.eyreshNeoySymbantos(sDystonos,sr,p);
          }
         }
      
        } //of for in Qi
      } //while bTreeQ is not empty
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
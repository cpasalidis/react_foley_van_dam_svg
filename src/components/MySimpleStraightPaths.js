import React, { Component } from 'react';
import Mesh1D from '../utils/Mesh1D';
import {AVLTree,AVLTreeAlwaysLeafs} from '../utils/avl_tree';
import {Point2DTreeNode,TreeNodeWithLineSegment} from '../utils/avl_tree';

const XC = 0; //index of x coordinate in mesh table
       const YC = 1; //index of y coordinate in mesh table
       const EDGE_I = 0; //index of first vertex of edge 
       const EDGE_J = 1; //index of second vertex of edge

class MySimpleStraightPaths extends Component {
    constructor() {
        super();
        this.makemesh = this.makemesh.bind(this);
        this.eyreshNeoySymbantos = this.eyreshNeoySymbantos.bind(this);
        this.eyreshTomwnAVLTree = this.eyreshTomwnAVLTree.bind(this);
        this.eyreshNeoySymbantosHc = this.eyreshNeoySymbantosHc.bind(this);
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


        /** given line segments sl,sr and a point p, returns the intersection point of sl,sr below p. If does not exist such intersection point returns null */
        eyreshNeoySymbantosHc = () => {
          //https://www.geeksforgeeks.org/program-for-point-of-intersection-of-two-lines/
          //determine intersection of sl,sr
          
          let s1p1x=150,s1p1y=220,s1p2x=200,s1p2y=10;
          let s2p1x=150,s2p1y=7,s2p2x=225,s2p2y=140;

          ////let s1p1x=1,s1p1y=1,s1p2x=4,s1p2y=4;
          ////let s2p1x=1,s2p1y=8,s2p2x=2,s2p2y=4;

          ////let s1p1x=1,s1p1y=1,s1p2x=4,s1p2y=4;
          ////let s2p1x=2,s2p1y=0,s2p2x=2,s2p2y=5;


          //console.log("eyreshNeoySymbantos <" + segl + "::" + segr + ">");
             // Line AB represented as a1x + b1y = c1
             console.log("-----> " + s1p1x + "," + s1p1y + "," + s1p2x + "," + s1p2y);
             let a1 = s1p2y - s1p1y;
             let b1 = s1p1x -s1p2x;
             let  c1 = a1*(s1p1x) + b1*(s1p1y);
            console.log("eyreshNeoySymbantos line1 is <" + a1 + "x" + " + " + b1 + "y = " + c1 );
             // Line CD represented as a2x + b2y = c2
             console.log("----->> " + s2p1x + "," + s2p1y + "," + s2p2x + "," + s2p2y);
             let a2 = s2p2y - s2p1y;
             let b2 = s2p1x - s2p2x;
             let  c2 = a2*(s2p1x) + b2*(s2p1y);
             console.log("eyreshNeoySymbantos line2 is <" + a2 + "x" + " + " + b2 + "y = " + c2 );
    
             let  determinant = a1*b2 - a2*b1;
            if (determinant === 0) {
              //lines are parallel
              console.log("eyreshNeoySymbantos : parallel lines");
            } 
          
            if (determinant !== 0) {
              let xd =(b2*c1 - b1*c2)/determinant;
              let yd = (a1*c2 - a2*c1)/determinant;
              let x = parseInt(xd,10);
              let y = parseInt(yd,10);
              console.log("eyreshNeoySymbantos : determinant is " + determinant + " " + xd + " " + yd + " x and y are <" + x + "::" + y + ">");
              //ok we got the point, check if is inside the segments
              
              let xInsideSl = (Math.min(s1p1x,s1p2x) <= x) && (x <= Math.max(s1p1x,s1p2x));
              let yInsideSl = (Math.min(s1p1y,s1p2y) <= y) && (y <= Math.max(s1p1y,s1p2y));
              //...
              let xInsideSr = (Math.min(s2p1x,s2p2x) <= x) && (x <= Math.max(s2p1x,s2p2x));
              let yInsideSr = (Math.min(s2p1y,s2p2y) <= y) && (y <= Math.max(s2p1y,s2p2y));
              console.log(" " + Math.min(s1p1x,s1p2x) + " " + x + " " + Math.max(s1p1x,s1p2x) + " " + Math.min(s2p1x,s2p2x) + " " + x + " " + Math.max(s2p1x,s2p2x) );              
              console.log(" " + Math.min(s1p1y,s1p2y) + " " + y + " " + Math.max(s1p1y,s1p2y) + " " + Math.min(s2p1y,s2p2y) + " " + y + " " + Math.max(s2p1y,s2p2y) );              
              console.log("minmax <" + xInsideSl + " " + yInsideSr + " " + xInsideSr + " " + yInsideSr);
              //if its inside the segments, check if its below p
              if (xInsideSl && yInsideSl && xInsideSr && yInsideSr ) {
                console.log("Found intersectionPoint <" + x + "::" + y + ">");
              }
            } //of determinant != 0
            return null;
        } //of eyreshNeoySymbantos method


    /** given line segments sl,sr and a point p, returns the intersection point of sl,sr below p. If does not exist such intersection point returns null */
    eyreshNeoySymbantos = (segl,segr,pRef) => {
      //https://www.geeksforgeeks.org/program-for-point-of-intersection-of-two-lines/
      //determine intersection of sl,sr
      console.log("eyreshNeoySymbantos <" + segl + "::" + segr + ">");
       //
        let s1p1x =segl.X1() ,s1p1y =segl.Y1(),s1p2x = segl.X2(),s1p2y =segl.Y2();
        let s2p1x = segr.X1(), s2p1y = segr.Y1(), s2p2x =segr.X2(), s2p2y =segr.Y2();
         // Line AB represented as a1x + b1y = c1
         console.log("-----> " + s1p1x + "," + s1p1y + "," + s1p2x + "," + s1p2y);
         let a1 = s1p2y - s1p1y;
         let b1 = s1p1x -s1p2x;
         let  c1 = a1*(s1p1x) + b1*(s1p1y);
        console.log("eyreshNeoySymbantos line1 is <" + a1 + "x" + " + " + b1 + "y = " + c1 );
         // Line CD represented as a2x + b2y = c2
         console.log("----->> " + s2p1x + "," + s2p1y + "," + s2p2x + "," + s2p2y);
         let a2 = s2p2y - s2p1y;
         let b2 = s2p1x - s2p2x;
         let  c2 = a2*(s2p1x) + b2*(s2p1y);
         console.log("eyreshNeoySymbantos line2 is <" + a2 + "x" + " + " + b2 + "y = " + c2 );

         let  determinant = a1*b2 - a2*b1;
        if (determinant === 0) {
          //lines are parallel
          console.log("eyreshNeoySymbantos : parallel lines");
        } 
      
        if (determinant !== 0) {
          let x = parseInt((b2*c1 - b1*c2)/determinant,10);
          let y = parseInt((a1*c2 - a2*c1)/determinant,10);
          console.log("eyreshNeoySymbantos : x and y are <" + x + "::" + y + ">");
          //ok we got the point, check if is inside the segments
          let xInsideSl = (Math.min(s1p1x,s1p2x) <= x) && (x <= Math.max(s1p1x,s1p2x));
          let yInsideSl = (Math.min(s1p1y,s1p2y) <= y) && (y <= Math.max(s1p1y,s1p2y));
          //...
          let xInsideSr = (Math.min(s2p1x,s2p2x) <= x) && (x <= Math.max(s2p1x,s2p2x));
          let yInsideSr = (Math.min(s2p1y,s2p2y) <= y) && (y <= Math.max(s2p1y,s2p2y));
      
          //console.log(" " + Math.min(s1p1x,s1p2x) + " " + x + " " + Math.max(s1p1x,s1p2x) + " " + Math.min(s2p1x,s2p2x) + " " + x + " " + Math.max(s2p1x,s2p2x) );              
          //console.log(" " + Math.min(s1p1y,s1p2y) + " " + y + " " + Math.max(s1p1y,s1p2y) + " " + Math.min(s2p1y,s2p2y) + " " + y + " " + Math.max(s2p1y,s2p2y) );              
          //console.log("minmax <" + xInsideSl + " " + yInsideSr + " " + xInsideSr + " " + yInsideSr);
          //if its inside the segments, check if its below p
          if (xInsideSl && yInsideSl && xInsideSr && yInsideSr ) {
            console.log("eyreshNeoySymbantos: Found intersectionPoint <" + x + "::" + y + ">");
            let tn = new Point2DTreeNode(x,y,true,[],"IntersectionPoint."+segl .name+"."+segr.name);           
            if (tn.compareTo(pRef) > 0) {
              return tn;
            }
          }
        } //of determinant != 0
        return null;
    } //of eyreshNeoySymbantos method

 /** eyresh tomwn ey8ygrammwn tmhmatwn xrhsimopoiwntas arrays gia tis domes dedomenwn Q kai T */
 eyreshTomwnArrays = (mesh,edgesStartingFromVertex) => {
          let meshEdges = mesh.edges;
          let meshVertices = mesh.vertices;        
          //
          let setQ = new Set();
          let comparisonFunction = (a,b) => { return b.compareTo(a);}
          let getDataStructure = (aSet) => { return Array.from(aSet).sort(comparisonFunction); }
          let printNames = (aName,anIterableStruct) => { 
            let res = ""+ aName + " <<<";
            for (let item of anIterableStruct) {
              res += item.name + ","              
            }
            res += ">>>";
            console.log(res);
          }
          //add the initial data to the data structure      
          mesh.vertices.map((vertex,index) => {
            let tn = new Point2DTreeNode(vertex.X(),vertex.Y(),true,edgesStartingFromVertex[index],"point"+index);
            setQ.add(tn);
            return tn;
          })
          //for (let p of setQ) { console.log("::" + p.name)}
          let dataStructureQ =  getDataStructure(setQ);
          //...
          let setT = new Set();
          let p = dataStructureQ.shift();
          setQ.delete(p);
          while (p) {
            //bhma1:            
            let pSegments = p.getUserData();
            let up=[]; //segments starting with p
            for  (let pSeg of pSegments) {
              let aSegment = meshEdges[pSeg];
              let s1 = meshVertices[aSegment[EDGE_I]], s2 = meshVertices[aSegment[EDGE_J]];
              let x1 = s1.X(),y1=s1.Y(),x2=s2.X(),y2=s2.Y();
              let segForT = new TreeNodeWithLineSegment(x1,y1,x2,y2,p.name +".edge" + pSeg) ;
              console.log("created <" + segForT.name + ">");
              up.push(segForT);
              setT.add(segForT);
            }
            //bhma2:
            let pIndex = p.name.substring("point".length);
            let lp=[],cp=[];
              let tSegments =getDataStructure(setT);
              for (let currentSegment of tSegments) {
                let px = meshVertices[pIndex].X(),py = meshVertices[pIndex].Y();
                if (currentSegment.endsIn(px,py)) {  lp.push(currentSegment);
                } else if (currentSegment.isContaining(px,py)) { cp.push(currentSegment); }
              }
              printNames("U(p) of " + p.name, up);
              printNames("L(p) of " + p.name, lp);
              printNames("C(p) of " + p.name, cp);
              //bhma 3: An to L(p) U U(p) U C(p) periexei perissotera apo ena tmhmata
              let allTogether = lp.concat(cp).concat(up);                        
              let union = new Set(allTogether);              
              //console.log(" L(p) is <" + JSON.stringify(lp) + "> C(p) is <" + JSON.stringify(cp) + "> U(p) is <" + JSON.stringify(up) + "> alltoghether <" + JSON.stringify(allTogether)  + "> union is <" + JSON.stringify(Array.from(union)) + ">");
              //bhma 4: Anaferoyme to p ws shmeio tomhs ka8ws kai ta L(p),U(p) kai C(p)
              if (union.size > 1) {
                console.log ("SUCCESS !!! point <" + p.name + "> is an intersection point");
                return;
              }
              //bhma 5: Diagrafoyme apo thn T ta tmhmata toy L(p) u C(p)
              let lpUnionCp = lp.concat(up);
              for (let lpCpSeg of lpUnionCp) {
                setT.delete(lpCpSeg);
              }
              //bhma 6: Eisagoyme sthn T ta tmhmata toy U(p) u C(p)
              let UpUnionCp = up.concat(cp);
              for (let upcpSeg of UpUnionCp ) {
                setT.add(upcpSeg);
              }
              //bhma 8: 
              console.log("bhma8 U(p) U C(p) <" + UpUnionCp.length + ">");
              tSegments = getDataStructure(setT);
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
                    if (newPoint) {
                      setQ.add(newPoint);
                    }
                  }
                }
              }
              //bhma 11: estw s' to akraio aristero tmhma toy U(p) U C(p) sthn T
              //bhma 14: estw s'' to akraio de3io tmhma toy U(p) U C(p) sthn T
              else {
                let stonosIdx = tSegments.length;
                let sDystonosIdx = -1;
                for (let uiUp of UpUnionCp) {                  
                 console.log("bhma11,14: " + uiUp.name);
                for (let kkk = 0; kkk < tSegments.length; kkk++) {
                  if (tSegments[kkk].compareTo(uiUp) === 0) {
                  if (kkk < stonosIdx) {
                    stonosIdx = kkk;
                  }
                  if (kkk > sDystonosIdx) {
                    sDystonosIdx = kkk;
                  }
                  } //if found segment in leafs
                }  //for all segments known
                } //for all elements of U(p) u C(p)
                console.log("bhma11,14 s',s'' are " + stonosIdx + "," + sDystonosIdx);
                if (stonosIdx > -1) { 
                  console.log("leftmost element sTonos is <" + tSegments[stonosIdx])
                  let sTonos = tSegments[stonosIdx];
                  //bhma 12: estw sl o aristeros geitonas toy sTonos sthn T
                  if (stonosIdx > 0) {              
                    let sl = tSegments[stonosIdx-1]
                    console.log(" sl,s' are " + sl.name + "," + sTonos.name);
                    let newPoint = this.eyreshNeoySymbantos(sl,sTonos,p);
                    if (newPoint) { setQ.add(newPoint);}
                  }
                }
                //bhma 15:
                if (sDystonosIdx > -1 && sDystonosIdx < (tSegments.length-1)) {
                  console.log("rightmost element s''  is <" + tSegments[sDystonosIdx])
                  let sDystonos = tSegments[sDystonosIdx];
                  let sr = tSegments[sDystonosIdx+1];
                  console.log(" s'',sr' are " + sDystonos.name + "," + sr.name);
                  let newPoint = this.eyreshNeoySymbantos(sDystonos,sr,p);
                  if (newPoint) { setQ.add(newPoint);}
                }
              } //of bhmata 11,14
            //
            printNames("setTAfter::" + p.name,setT);            
            p = dataStructureQ.shift();
            setQ.delete(p);
          } //of while p
          //console.log("datastructureQ is <" + JSON.stringify(dataStructureQ) + ">");
          //console.log("after sort")
          //for (let Qiii = 0; Qiii< dataStructureQ.length;Qiii++) { let p = dataStructureQ[Qiii]; console.log("::" + p.name)  }

    } //of method eyreshTomwnArrays()


  eyreshTomwnAVLTree = (mesh,edgesStartingFromVertex) => {
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
      //THIS SHOULD RUN WHILE btreeq HAS POINTS
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
    } //of evreshTomwnAVLTree method

  makemesh = () => {      

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
          //this.eyreshTomwnAVLTree(mesh,edgesStartingFromVertex);
          //this.eyreshNeoySymbantosHc();
          this.eyreshTomwnArrays(mesh,edgesStartingFromVertex);
          
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
                  const strokeW = 1*(index+1);
                  let color = ((index ===2 ) || (index === 3)) ? 'red': 'blue';
                  console.log("drawing edge "  + index +  " = " + startpoint.X() + " " + startpoint.Y()  + " " + endpoint.X() + " " + endpoint.Y());
                  return (  <line key={index} x1={startpoint.X()} y1={startpoint.Y()} x2={endpoint.X()} y2={endpoint.Y()} style={{stroke:color,strokeWidth:strokeW}}/>);                      
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
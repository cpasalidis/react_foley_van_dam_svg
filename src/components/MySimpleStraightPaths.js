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
        this.eyreshTomwnBruteForce = this.eyreshTomwnBruteForce.bind(this);
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
        //eyreshNeoySymbantosHc = () => {
          eyreshNeoySymbantosHc = (s1p1x,s1p1y,s1p2x,s1p2y,s2p1x,s2p1y,s2p2x,s2p2y) => {
          //https://www.geeksforgeeks.org/program-for-point-of-intersection-of-two-lines/
          //determine intersection of sl,sr
          
          //let s1p1x=150,s1p1y=220,s1p2x=200,s1p2y=10;
          //let s2p1x=150,s2p1y=7,s2p2x=225,s2p2y=140;

          ////let s1p1x=1,s1p1y=1,s1p2x=4,s1p2y=4;
          ////let s2p1x=1,s2p1y=8,s2p2x=2,s2p2y=4;

          ////let s1p1x=1,s1p1y=1,s1p2x=4,s1p2y=4;
          ////let s2p1x=2,s2p1y=0,s2p2x=2,s2p2y=5;


          //console.log("eyreshNeoySymbantos <" + segl + "::" + segr + ">");
             // Line AB represented as a1x + b1y = c1
             //ok/console.log("-----> " + s1p1x + "," + s1p1y + "," + s1p2x + "," + s1p2y);
             let a1 = s1p2y - s1p1y;
             let b1 = s1p1x -s1p2x;
             let  c1 = a1*(s1p1x) + b1*(s1p1y);
            //ok/console.log("eyreshNeoySymbantosHc line1 is <" + a1 + "x" + " + " + b1 + "y = " + c1 );
             // Line CD represented as a2x + b2y = c2
             //ok/console.log("----->> " + s2p1x + "," + s2p1y + "," + s2p2x + "," + s2p2y);
             let a2 = s2p2y - s2p1y;
             let b2 = s2p1x - s2p2x;
             let  c2 = a2*(s2p1x) + b2*(s2p1y);
             //ok/console.log("eyreshNeoySymbantosHc line2 is <" + a2 + "x" + " + " + b2 + "y = " + c2 );
    
             let  determinant = a1*b2 - a2*b1;
            if (determinant === 0) {
              //lines are parallel
              //ok/console.log("eyreshNeoySymbantosHc : parallel lines");
            } 
          
            if (determinant !== 0) {
              let xd =(b2*c1 - b1*c2)/determinant;
              let yd = (a1*c2 - a2*c1)/determinant;
              let x = parseInt(xd,10);
              let y = parseInt(yd,10);
              //ok/console.log("eyreshNeoySymbantosHc : determinant is " + determinant + " " + xd + " " + yd + " x and y are <" + x + "::" + y + ">");
              //ok we got the point, check if is inside the segments
              
              let xInsideSl = (Math.min(s1p1x,s1p2x) <= x) && (x <= Math.max(s1p1x,s1p2x));
              let yInsideSl = (Math.min(s1p1y,s1p2y) <= y) && (y <= Math.max(s1p1y,s1p2y));
              //...
              let xInsideSr = (Math.min(s2p1x,s2p2x) <= x) && (x <= Math.max(s2p1x,s2p2x));
              let yInsideSr = (Math.min(s2p1y,s2p2y) <= y) && (y <= Math.max(s2p1y,s2p2y));
              //ok/console.log(" " + Math.min(s1p1x,s1p2x) + " " + x + " " + Math.max(s1p1x,s1p2x) + " " + Math.min(s2p1x,s2p2x) + " " + x + " " + Math.max(s2p1x,s2p2x) );              
              //ok/console.log(" " + Math.min(s1p1y,s1p2y) + " " + y + " " + Math.max(s1p1y,s1p2y) + " " + Math.min(s2p1y,s2p2y) + " " + y + " " + Math.max(s2p1y,s2p2y) );              
              //ok/console.log("eyreshNeoySymbantosHc: minmax <" + xInsideSl + " " + yInsideSr + " " + xInsideSr + " " + yInsideSr);
              //if its inside the segments, check if its below p
              if (xInsideSl && yInsideSl && xInsideSr && yInsideSr ) {
                //ok/console.log("eyreshNeoySymbantosHc: Found intersectionPoint <" + x + "::" + y + ">");
                return [x,y];
              }
            } //of determinant != 0
            return [];
        } //of eyreshNeoySymbantos method


/** eyresh tomwn ey8ygrammwn tmhmatwn xrhsimopoiwntas arrays gia tis domes dedomenwn Q kai T */
eyreshTomwnBruteForce = (mesh) => {
  let res = []; //contains arrays each with [x,y,e1,e2]
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
  for (let i = 0; i < meshEdges.length; i++) {
      let aSegment = meshEdges[i];
      let s1 = meshVertices[aSegment[EDGE_I]], s2 = meshVertices[aSegment[EDGE_J]];
      let e1x1 = s1.X(),e1y1=s1.Y(),e1x2=s2.X(),e1y2=s2.Y();
    for (let j = i+1; j < meshEdges.length;j++) {
      console.log("eyreshTomwnBruteForce checking edges <" + i + " and "  + j + ">");
      let anotherSegment = meshEdges[j];
      let s1 = meshVertices[anotherSegment[EDGE_I]], s2 = meshVertices[anotherSegment[EDGE_J]];
      let e2x1 = s1.X(),e2y1=s1.Y(),e2x2=s2.X(),e2y2=s2.Y();
      let intersectionPoint = this.eyreshNeoySymbantosHc(e1x1,e1y1,e1x2,e1y2,e2x1,e2y1,e2x2,e2y2);
      if (intersectionPoint.length > 0) {
        let x = intersectionPoint[0];
        let y = intersectionPoint[1];
        console.log("...point <"  + x  + "::" + y  + "> is intersection of edges <" + i + " and " + j + ">");
        res.push([x,y,i,j]);
      } else {
        console.log("... not found");
      }
    }
  }
  return res;  
} //of method eyreshTomwnBruteForce()


    /** given line segments sl,sr and a point p, returns the intersection point of sl,sr below p. If does not exist such intersection point returns null */
    eyreshNeoySymbantos = (segl,segr,pRef) => {
      //https://www.geeksforgeeks.org/program-for-point-of-intersection-of-two-lines/
      //determine intersection of sl,sr
      console.log("eyreshNeoySymbantos <" + this.segmentToString(segl) + "::" + this.segmentToString(segr) + ">");
      let res=[];
       //
        let s1p1x =segl.X1() ,s1p1y =segl.Y1(),s1p2x = segl.X2(),s1p2y =segl.Y2();
        let s2p1x = segr.X1(), s2p1y = segr.Y1(), s2p2x =segr.X2(), s2p2y =segr.Y2();
        let intersectionPoint = this.eyreshNeoySymbantosHc(s1p1x,s1p1y,s1p2x,s1p2y,s2p1x,s2p1y,s2p2x,s2p2y);
        if (intersectionPoint.length > 0) {
          let x = intersectionPoint[0];
          let y = intersectionPoint[1];
          console.log("...point <"  + x  + "::" + y  + "> is intersection of edges <" + segl + " and " +segr+ ">");
          segl.setContaining(x,y);
          segr.setContaining(x,y);
          res.push([x,y,segl.name,segr.name]);
        } else {
          console.log("... not found");
        }
        return res;   
    } //of eyreshNeoySymbantos method

    segmentToString = (aSeg) =>  {
      return aSeg.name + "," +  aSeg.X1() + "," + aSeg.Y1() + "," + aSeg.X2() + "," + aSeg.Y2()
    }

     isLeftOf = ( segment, askPoint) => {
      return ((segment.X2() - segment.X1())*(askPoint.Y() - segment.Y1()) - (segment.Y2() - segment.Y1())*(askPoint.X() - segment.X1())) > 0;
  }
   isRightOf = ( segment, askPoint) => {
    return ((segment.X2() - segment.X1())*(askPoint.Y() - segment.Y1()) - (segment.Y2() - segment.Y1())*(askPoint.X() - segment.X1())) < 0;
  }

 /** eyresh tomwn ey8ygrammwn tmhmatwn xrhsimopoiwntas arrays gia tis domes dedomenwn Q kai T */
 eyreshTomwnArrays = (mesh,edgesStartingFromVertex) => {
          let methodResult = []; //each result is an array [x,y,U(p),L(p),C(p)]
          let meshEdges = mesh.edges;
          let meshVertices = mesh.vertices;        
          //
          let setQ = new Set();
          let comparisonFunction = (a,b) => { 
            //ok/console.log("comparisonFuncttion <" + b.name + "> <" + a.name + ">" + " = " + a.compareTo(b));
            return b.compareTo(a); //if i put b.compareTo(a) i get sorting by y coordinate ascending order... 
          }
          let getDataStructure = (aSet) => { return Array.from(aSet).sort(comparisonFunction); }
          let printNames = (aName,anIterableStruct) => { 
            let res = ""+ aName + " <<<";
            for (let item of anIterableStruct) {
              res += item.name + ","              
            }
            res += ">>>";
            console.log(res);
          }
          
          let pointToString = (aPoint) => {
            return aPoint.name + "," + aPoint.X() + "," + aPoint.Y();
          }
          //add the initial data to the data structure      
          mesh.vertices.map((vertex,index) => {
            let tn = new Point2DTreeNode(vertex.X(),vertex.Y(),true,edgesStartingFromVertex[index],"point"+(index+1));
            setQ.add(tn);
            return tn;
          })
          //for (let p of setQ) { console.log("::" + p.name)}
          let dataStructureQ =  getDataStructure(setQ);
          printNames("eyreshTomwnArrays: initial Q",dataStructureQ);
          //just a test of the sorting of segments
          let testSetT = new Set();
          meshEdges.map((edge,index)  => {
            let s1 = meshVertices[edge[EDGE_I]], s2 = meshVertices[edge[EDGE_J]];
            let x1 = s1.X(),y1=s1.Y(),x2=s2.X(),y2=s2.Y();
            let segForT = new TreeNodeWithLineSegment(x1,y1,x2,y2,"tSE" +".edge" + (index) );
            testSetT.add(segForT);          
          })
          let testStructureT = getDataStructure(testSetT);
          printNames("eyreshTomwnArrays: testSetWithAllEdges",testStructureT);
          //...
          let setT = new Set();
          let p = dataStructureQ.shift();
          setQ.delete(p);
          while (p) {
            console.log("eyreshTomwnArrays: =====> e3etazw apo thn Q to shmeio <" + pointToString(p) + ">");
            //bhma1:            
            let pSegments = p.getUserData();
            let up=[]; //segments starting with p
            for  (let pSeg of pSegments) {
              let aSegment = meshEdges[pSeg];
              let s1 = meshVertices[aSegment[EDGE_I]], s2 = meshVertices[aSegment[EDGE_J]];
              let x1 = s1.X(),y1=s1.Y(),x2=s2.X(),y2=s2.Y();
              let segForT = new TreeNodeWithLineSegment(x1,y1,x2,y2,p.name +".edge" + pSeg) ;
              console.log("eyreshTomwnArrays:pros8etw sto T  <" + this.segmentToString(segForT) + ">");
              up.push(segForT);
              setT.add(segForT);
            }
            //bhma2:
            let pIndex = p.name.substring("point".length)-1;
            let lp=[],cp=[];
              let tSegments =getDataStructure(setT);
              for (let currentSegment of tSegments) {
                console.log("eyreshTomwnArrays: bhma2: koitazw to shmeio <" + pointToString(p) + "> kai to segment <" + this.segmentToString(currentSegment) + ">");
                let px = p.X(),py = p.Y();
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
                let anIntersectionPoint = [p.X(),p.Y(),up,lp,cp];
                methodResult.push(anIntersectionPoint);
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
              //se ka8e eswteriko kombo (v) elegxoyme an to shmeio (p) einai aristera h de3ia toy tmhmatos poy einai apo8hkeymeno ston (v) Analoga me
              //to apotelesma toy elegxoy akoloy8oyme to aristero h to de3io ypodentro toy (v) gia na katalh3oyme telika se kapoio fyllo. To tmhma poy anazhtoyme
              //einai apo8hkeymeno eite se ayto to fyllo eite se ekeino poy brisketai amesws sta aristera toy. Me paromoio tropo mporoyme na broyme kai to tmhma poy
              //brisketai akribws sta de3ia toy p h ta tmhmata poy periexoyn to p.
              console.log("bhma8 U(p) U C(p) <" + UpUnionCp.length + "> L(p) " + lp.length);
              tSegments = getDataStructure(setT);
              printNames("bhma 9:",tSegments);              
              if (UpUnionCp.length === 0) {
                //bhma 9:
                let ln = -1,rn=-1;
                if (lp.length > 0) {
                  for (let kk = 0; kk < tSegments.length; kk++) {
                    if (this.isLeftOf(tSegments[kk],p)) {
                      if (ln< 0) { ln = kk; } else { ln=Math.max(ln,kk); };
                    }
                    if (this.isRightOf(tSegments[kk],p)) {
                      if (rn < 0) { rn = kk;} else {rn=Math.min(ln,kk);}
                    }
                  }
                  console.log("bhma 8,9: aristeros kai de3ios geitonas toy p " + ln + "," + rn);
                  if (ln < 0) { ln = -1;}
                  if (rn > tSegments.length) { rn = -1;}
                  if (ln > 0 ) { console.log("bhma9: left neighbor is <" + tSegments[ln].name)}
                  if (rn > 0 && rn < tSegments.length) { console.log("bhma9: right neighbor is <" + tSegments[rn].name)}
                  if ((ln > 0) && (rn > 0 && rn<tSegments.length)) {
                    let sl = tSegments[ln];
                    let sr = tSegments[rn];
                    let newpoint = this.eyreshNeoySymbantos(sl,sr,p);
                    if (newpoint.length > 0) {
                      let newpTn = new Point2DTreeNode(newpoint[0],newpoint[1],true,[],"intersectionpoint."+ln+"_" + rn);  
                      console.log("eyreshTomwnArrays:bhma8,9: bazw sthn Q to <"+newpTn.name+">")
                      setQ.add(newpTn);
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
                  stonosIdx = Math.min(kkk,stonosIdx);
                  sDystonosIdx = Math.max(kkk,sDystonosIdx);
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
                    let newpoint = this.eyreshNeoySymbantos(sl,sTonos,p);
                    if (newpoint.length > 0) { 
                      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ bhma 14 ~~~~~~~~~~~~~~~~" + newpoint[0][0] + " " + newpoint[0][1]);
                      let newpTn = new Point2DTreeNode(newpoint[0][0],newpoint[0][1],true,[],"intersectionpoint."+(stonosIdx-1)+"_" + stonosIdx);  
                      console.log("eyreshTomwnArrays:bhma11,14: bazw sthn Q to <"+pointToString(newpTn)+">")
                      setQ.add(newpTn);
                    }
                  }
                }
                //bhma 15:
                if (sDystonosIdx > -1 && sDystonosIdx < (tSegments.length-1)) {
                  console.log("rightmost element s''  is <" + tSegments[sDystonosIdx])
                  let sDystonos = tSegments[sDystonosIdx];
                  let sr = tSegments[sDystonosIdx+1];
                  console.log(" s'',sr' are " + sDystonos.name + "," + sr.name);
                  let newpoint = this.eyreshNeoySymbantos(sDystonos,sr,p);
                  if (newpoint.length > 0) { 
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ bhma 15 ~~~~~~~~~~~~~~~~~~~~ " + newpoint[0][0] + " " + newpoint[0][1]);
                    let newpTn = new Point2DTreeNode(newpoint[0][0],newpoint[0][1],true,[],"intersectionpoint."+sDystonosIdx+"_" + (sDystonosIdx+1));
                    console.log("eyreshTomwnArrays:bhma15: bazw sthn Q to <"+pointToString(newpTn)+">")
                    setQ.add(newpTn);
                  }
                }
              } //of bhmata 11,14
            //
            printNames("setTAfter::" + p.name,setT);            
            dataStructureQ =  getDataStructure(setQ);
            printNames("=-==-==-==> eyreshTomwnArrays: after processing::"+p.name,dataStructureQ);  
            p = dataStructureQ.shift();
            setQ.delete(p);
          } //of while p
          //console.log("datastructureQ is <" + JSON.stringify(dataStructureQ) + ">");
          //console.log("after sort")
          //for (let Qiii = 0; Qiii< dataStructureQ.length;Qiii++) { let p = dataStructureQ[Qiii]; console.log("::" + p.name)  }
          return methodResult;
    } //of method eyreshTomwnArrays()


  eyreshTomwnAVLTree = (mesh,edgesStartingFromVertex) => {
    let methodResult = []; //array of elements its element is [x,y,U(p),L(p),C(p)]
    //
    let printNames = (aName,anIterableStruct,isPrintingContainingNodes) => { 
      let bfs = anIterableStruct.inOrderTraversalNew();
      let res = ""+ aName + " <<<";
      let item = bfs.shift();
      let count = 0;
      while (item) {
        if (isPrintingContainingNodes || item.isLeaf()) {
          res += item + ","              
        }
        item = bfs.shift();
      }
      res += ">>>";
      console.log(res);
    }
    let pointToString = (aPoint) => {
      return aPoint.name + "," + aPoint.X() + "," + aPoint.Y();
    }
    let printNamesOfArray = (aName,anArray) => { 
      let res = ""+ aName + " <<<";
      for (let item of anArray) {
        res += item.name + ","              
      }
      res += ">>>";
      console.log(res);
    }

    //this is the right structure for points...i just want to test the other btree/let btree = new AVLTree(); 
    let btreeQ = new AVLTree();
    let btreeT = new AVLTreeAlwaysLeafs(); 
    //
    let meshEdges = mesh.edges;
    let meshVertices = mesh.vertices;        
    //avltreeTests(mesh,btreeQ,btreeT)
    meshVertices.map((vertex,index) => {
      let tn = new Point2DTreeNode(vertex.X(),vertex.Y(),false,edgesStartingFromVertex[index],"point"+(index+1));
      btreeQ.insertNew(tn);
      //btree.printTree(true) ;
      //console.log("======> <===========");
      return tn;
    })

    printNames("eyreshTomwnAVLTree: initial Q",btreeQ,true);
    //just a test of the sorting of segments
    
    let testTreeT = new AVLTreeAlwaysLeafs();
    meshEdges.map((edge,index)  => {
      let s1 = meshVertices[edge[EDGE_I]], s2 = meshVertices[edge[EDGE_J]];
      let x1 = s1.X(),y1=s1.Y(),x2=s2.X(),y2=s2.Y();
      let segForT = new TreeNodeWithLineSegment(x1,y1,x2,y2,"tSE" +".edge" + (index) );
      testTreeT.insertNew(segForT);          
    })
    printNames("eyreshTomwnArrays: testSetWithAllEdges",testTreeT,false);
    
    //console.log("nodes bfs " + JSON.stringify(qnodes));
      //8elw mono thn arxh ka8e tmhmatos kai to mikrotero x paei aristera. An exoyn idio x, to mikrotero y paei aristera
      //THIS SHOULD RUN WHILE btreeq HAS POINTS
        let qnodes = btreeQ.inOrderTraversalNew();    
        let p = qnodes.shift();
        btreeQ.removeNew(p);                   
      while (p) {
        //bhma1. eyresh U(p)        
        let pIndex = p.name.substring("point".length);
        console.log('got pindex ' + pIndex);
        let pSegments = p.getUserData();        
        console.log(" ====> For point <" + pointToString(p) + "> i have <" + pSegments.length + "> line segments");
        let up=[]; //segments starting with p
        if (pSegments.length > 0) {
          for (let pSegi = 0; pSegi < pSegments.length;pSegi++)  {
            let aSegment = meshEdges[pSegments[pSegi]];
            let s1 = meshVertices[aSegment[EDGE_I]];
            let s2 = meshVertices[aSegment[EDGE_J]];
            let x1 = s1.X(),y1=s1.Y(),x2=s2.X(),y2=s2.Y();
            //console.log(" vertex1 is <" +pointToString(s1) + "> with vertex2 is <" + pointToString(s2) + "> coordinates are <" + x1 + "," + y1 + " - " + x2 + "," + y2 +">");
            let segForT = new TreeNodeWithLineSegment(x1,y1,x2,y2,p.name +".edge" + pSegments[pSegi]) ;
            up.push(segForT);
            console.log("Adding to T element <" +this.segmentToString(segForT) + ">");
            btreeT.insertNew(segForT);
          }
          printNames("bhma1 T <",btreeT,false);          
        }
        //bhma2. briskoyme anamesa sta tmhmata poy einai apo8hkeymena sthn T ekeina poy periexoyn to p
        let px = p.X(),py = p.Y();
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
        printNamesOfArray("U(p) is ",up);
        printNamesOfArray("L(p) is ",lp);
        printNamesOfArray("C(p) is ",cp);
        //bhma 4: Anaferoyme to p ws shmeio tomhs ka8ws kai ta L(p),U(p) kai C(p)
        if (union.length> 1) {
          console.log ("SUCCESS !!! point <" + p.name + "> is an intersection point");
          let anIntersectionPoint = [p.X(),p.Y(),up,lp,cp];
          methodResult.push(anIntersectionPoint);
        }
        //bhma 5: Diagrafoyme apo thn T ta tmhmata toy L(p) u C(p)
        let lpUnionCp = lp.concat(up);
        for (let iUnionIdx = 0; iUnionIdx < lpUnionCp.length; iUnionIdx++) {
          console.log("bhma5: removing from T <" +lpUnionCp[iUnionIdx]  + ">");
          btreeT.removeByName(lpUnionCp[iUnionIdx]);
        }
        //bhma 6: Eisagoyme sthn T ta tmhmata toy U(p) u C(p)
        let UpUnionCp = up.concat(cp);
        for (let iUpUnionCp = 0;iUpUnionCp < UpUnionCp.length; iUpUnionCp++) {
          console.log("bhma6: ready to re-insert <" +UpUnionCp[iUpUnionCp] + ">" );
          //if T does not contain an item, i add it
          if (btreeT.getLeaf(UpUnionCp[iUpUnionCp]).length === 0) {
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
            if (this.isLeftOf(tSegments[kk],p)) {
              if (ln< 0) { ln = kk; } else { ln=Math.max(ln,kk); };
            }
            if (this.isRightOf(tSegments[kk],p)) {
              if (rn < 0) { rn = kk;} else {rn=Math.min(ln,kk);}
            }
          }
          if (ln < 0) { ln = -1;}
          if (rn > tSegments.length) { rn = -1;}
          if (ln > 0 ) { console.log("bhma9: left neighbor is <" + tSegments[ln])}
          if (rn > 0 && rn < tSegments.length) { console.log("bhma9: right neighbor is <" + tSegments[rn])}
          if ((ln > 0) && (rn > 0 && rn<tSegments.length)) {
            let sl = tSegments[ln];
            let sr = tSegments[rn];
            console.log("bhma9: sl is  <" +sl  + "> sr is <" + sr + ">");
            let newpoint = this.eyreshNeoySymbantos(sl,sr,p);
            if (newpoint.length > 0) { 
              let newpTn = new Point2DTreeNode(newpoint[0][0],newpoint[0][1],false,[],"intersectionpoint."+ln+"_" + rn);  
              console.log("eyreshTomwnAVLTree:bhma9: bazw sthn Q to <"+newpTn+">")
              btreeQ.add(newpTn);
            }
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
            if (stonosIdx< 0) { stonosIdx = kkk;} else {stonosIdx = Math.min(kkk,stonosIdx);}
            if (sDystonosIdx < 0) { sDystonosIdx = kkk;}  else {sDystonosIdx = Math.max(kkk,sDystonosIdx);}
          } //if found segment in leafs
        }  //for all segments known
        } //for all elements of U(p) u C(p)
        if (stonosIdx > -1) { 
          console.log("leftmost element sTonos is <" + tSegments[stonosIdx])
          let sTonos = tSegments[stonosIdx];
          //bhma 12: estw sl o aristeros geitonas toy sTonos sthn T
          if (stonosIdx > 1) {              
            let sl = tSegments[stonosIdx-1]
            let newpoint = this.eyreshNeoySymbantos(sl,sTonos,p);
            if (newpoint.length > 0) { 
              let newpTn = new Point2DTreeNode(newpoint[0][0],newpoint[0][1],false,[],"intersectionpoint."+(stonosIdx-1)+"_" + stonosIdx);  
              console.log("evreshTomwnAVLTree:bhma12: bazw sthn Q to <"+newpTn+">")
              btreeQ.insertNew(newpTn);
            }
          }
        }
        //bhma 15:
        if (sDystonosIdx > -1 && sDystonosIdx < (tSegments.length-1)) {
          let sDystonos = tSegments[sDystonosIdx];
          let sr = tSegments[sDystonosIdx+1];
          console.log("bhma15: sDystonos is  <" +sDystonos  + "> sr is <" + sr + ">");
         let newpoint =  this.eyreshNeoySymbantos(sDystonos,sr,p);
         if (newpoint.length > 0) { 
          let newpTn = new Point2DTreeNode(newpoint[0][0],newpoint[0][1],false,[],"intersectionpoint."+(stonosIdx-1)+"_" + stonosIdx);  
          console.log("evreshTomwnAVLTree:bhma15: bazw sthn Q to <"+pointToString(newpTn)+">")
          btreeQ.insertNew(newpTn);
        }
        }
      }
      /******************/      
      printNames("=-=-=-=-=> after processing point <" + p.name + ">",btreeQ,true);
       qnodes = btreeQ.inOrderTraversalNew();   
       //printNamesOfArray("EEEEEEEEEEEEe=> ",qnodes);
       p = qnodes.shift();
       btreeQ.removeNew(p);
       if (p) { printNames("=-=-=-=-=> =-=-=-=-=> after removing point <" + p.name + ">",btreeQ);}
      } //of for in Qi

      return methodResult;
    } //of evreshTomwnAVLTree method

  makemesh = () => {      

          //
          let edgesStartingFromVertex=[]; //for each vertex contains edges starting on it. i have to make sure, that the end of the segment is after the start of the segment when epibatikh aktina is moving top to bottom
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
           //to be consisten with names of points staring from 1, i put here array subscribts starting form 1 (-1)
            let epn = (i) => i-1;
          mesh.addEdge(epn(1),epn(2));
          edgesStartingFromVertex[epn(1)]=[];
          edgesStartingFromVertex[epn(2)]=[0];
          mesh.addEdge(epn(3),epn(4));
          edgesStartingFromVertex[epn(3)]=[1];
          edgesStartingFromVertex[epn(4)]=[];
          mesh.addEdge(epn(7),epn(5));
          edgesStartingFromVertex[epn(7)]=[2];
          edgesStartingFromVertex[epn(5)]=[];
          mesh.addEdge(epn(6),epn(8));
          edgesStartingFromVertex[epn(6)]=[3];
          edgesStartingFromVertex[epn(8)]=[];
          mesh.addEdge(epn(9),epn(10));
          edgesStartingFromVertex[epn(9)]=[4];
          edgesStartingFromVertex[epn(10)]=[];
          //mesh.printInfo();
          let intersections = [];
          intersections = this.eyreshTomwnAVLTree(mesh,edgesStartingFromVertex);
          //this.eyreshNeoySymbantosHc();
          //intersections = this.eyreshTomwnArrays(mesh,edgesStartingFromVertex);          
          //intersections  = this.eyreshTomwnBruteForce(mesh);          
          console.log("=======================>");
          for (let inter of intersections) {
            console.log("Point " + inter[0] + "::" + inter[1] + " is intersection !!!! U(p) = " + inter[2] + " L(p) = " + inter[3] + "C(p) = " + [inter[4]]);
          }
          console.log("<=======================");

            const CANVAS_WIDTH=500;
            const CANVAS_HEIGHT=500;
        
            return (
              <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>"
              {
                mesh.vertices.map((vertex,index) => {
                  //return (  <circle key={index} cx={vertex.X()} cy={vertex.Y()} r={(index+1)*1} stroke="black" strokeWidth="1" fill="white"/>);                      
                  return (  <text key={index} x={vertex.X()} y={vertex.Y()} stroke="black" strokeWidth="1" fill="white">{index+1}</text>);                      
                })
              }
            
              <text key="100" x="185"y="70" stroke="black" strokeWidth="1" fill="white">I</text>
            
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
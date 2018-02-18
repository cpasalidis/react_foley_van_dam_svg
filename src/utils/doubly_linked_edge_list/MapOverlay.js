import {MeshDoublyLinkedListEdges} from '../doubly_linked_edge_list';
import {AVLTree,AVLTreeAlwaysLeafs,Point2DTreeNode,TreeNodeWithLineSegment} from '../../utils/avl_tree';

/** calculates the overlay of 2 maps, according to the algorithm of pg 38 */
class MapOverlay {

    /** s1,s2 are maps ... meshdoublylinkededges */
    constructor(s1,s2) {
        this.s1 = s1;
        this.s2 = s2;
        this.D = new MeshDoublyLinkedListEdges(true);
    }

    combineMaps = () => {
        
        this.s1.getVertices().map((vertex,index) => {
            this.D.addVertex(vertex.X(),vertex.Y(),vertex.getName());
            return this.D;
          })
          this.s2.getVertices().map((vertex,index) => {
            this.D.addVertex(vertex.X(),vertex.Y(),vertex.getName());
            return this.D;
          })
          this.s1.getEdges().map((edge,index) => {
              this.D.addEdge(edge.getStart().getName(),edge.getTwin().getStart().getName(),edge.getName(),edge.getTwin().getName());
              return this.D;
          })       
          this.s2.getEdges().map((edge,index) => {
            this.D.addEdge(edge.getStart().getName(),edge.getTwin().getStart().getName(),edge.getName(),edge.getTwin().getName());
            return this.D;
        })       
        this.s1.getFaces().map((face,index) => {
            let edgeName = face.getBoundingEdge() ? face.getBoundingEdge().getName() : '';
            let holeEdgeNames = [];
            for (let he of face.getHoleEdges()) {
                holeEdgeNames.push(he.getName());
            }
            this.D.addFace(edgeName,holeEdgeNames,face.getName());
            return this.D;
        })       
        this.s2.getFaces().map((face,index) => {
            let edgeName = face.getBoundingEdge() ? face.getBoundingEdge().getName() : '';
            let holeEdgeNames = [];
            for (let he of face.getHoleEdges()) {
                holeEdgeNames.push(he.getName());
            }
            this.D.addFace(edgeName,holeEdgeNames,face.getName());
            return this.D;
        })       
        this.s1.getEdges().map((edge,index) => {
            let previousName = edge.getPreviousInFace() ? edge.getPreviousInFace().getName() : '';
            let nextName = edge.getNextInFace() ? edge.getNextInFace().getName() : '';
            let faceName = edge.getFace() ? edge.getFace().getName() : '';
            this.D.setNextPreviousFaceOfEdge(edge.getName(),nextName,previousName,faceName);
            return this.D;
        })       
        this.s2.getEdges().map((edge,index) => {
            let previousName = edge.getPreviousInFace() ? edge.getPreviousInFace().getName() : '';
            let nextName = edge.getNextInFace() ? edge.getNextInFace().getName() : '';
            let faceName = edge.getFace() ? edge.getFace().getName() : '';
            this.D.setNextPreviousFaceOfEdge(edge.getName(),nextName,previousName,faceName);
            return this.D;
        })       

        return this;
    } //of method combineMaps

    printInfo = () => {
        this.D.printInfo();
    }

    eyreshTomwnAVLTree = (mesh,edgesStartingFromVertex) => {
        const XC = 0; //index of x coordinate in mesh table
       const YC = 1; //index of y coordinate in mesh table
       const EDGE_I = 0; //index of first vertex of edge 
       const EDGE_J = 1; //index of second vertex of edge
        //
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
        let meshEdges = mesh.getEdges();
        let meshVertices = mesh.getVertices();        
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

} //of class

export default MapOverlay;
import React, { Component } from 'react';
import Mesh1D from '../utils/Mesh1D';

class MySimpleBoundingPolygon extends Component {
    constructor() {
        super();
        this.makemesh = this.makemesh.bind(this);
        this.eyreshBoundingPolygon = this.eyreshBoundingPolygon.bind(this);
    }

    determinant3 = (matrix3by3) => {
      let result = matrix3by3[0][0]*matrix3by3[1][1]*matrix3by3[2][2]+
      matrix3by3[0][1]*matrix3by3[1][2]*matrix3by3[2][0]+
      matrix3by3[0][2]*matrix3by3[1][0]*matrix3by3[2][1]-
      matrix3by3[0][0]*matrix3by3[1][2]*matrix3by3[2][1]-
      matrix3by3[0][1]*matrix3by3[1][0]*matrix3by3[2][2]-
      matrix3by3[0][2]*matrix3by3[1][1]*matrix3by3[2][0];

      return result;
    }

    shmeioRseSxeshMeEy8eia = (r,p,q) => {
      let m = 
      [
        [1,p.X(),p.Y()],
        [1,q.X(),q.Y()],
        [1,r.X(),r.Y()]
      ];
      return this.determinant3(m);
    }
    
    eyreshBoundingPolygon = (mesh) => {
      let comparisonFunction = (p,q) => { 
        let res = p.Y() - q.Y();
        if (res === 0) { res = p.X() - q.X();}
        return res;
      }
      let getDataStructure = (aSet) => { return Array.from(aSet).sort(comparisonFunction); }
      let orderdVertices = new Set();
      //bhma1
      mesh.vertices.map((vertex,index) => {
        orderdVertices.add(vertex);
      })
      //bhma 2
      let oq = getDataStructure(orderdVertices);
      let Lanw = [oq[0],oq[1]];
      //bhma 3
      for (let i = 2; i<oq.length;i++) {
        //bhma4
        Lanw.push(oq[i]);
        //bhma5
        while((Lanw.length>2) && (this.shmeioRseSxeshMeEy8eia(Lanw[Lanw.length-1],Lanw[Lanw.length-2],Lanw[Lanw.length-3])<=0) ) {
          //bhma 6
          Lanw.splice(Lanw.length-2,1);
        }
      }
      //bhma 7
      let Lkatw=oq.slice(-2);
      //bhma 8
      for (let j=oq.length-3;j>0;j--) {
        Lkatw.push(oq[j]);
        while((Lkatw.length>2) && (this.shmeioRseSxeshMeEy8eia(Lkatw[Lkatw.length-1],Lkatw[Lkatw.length-2],Lkatw[Lkatw.length-3]) <= 0)) {
          Lkatw.splice(Lkatw.length-2,1);
        }
      }
      //bhma 12
      Lkatw.splice(0,1).splice(-1,1);
      //bhma 13 ... i am also inserting first vertex again, so i can draw the bounding polygon 
      let result = Lanw.concat(Lkatw).concat([oq[0]]);
      console.log("boundingPolygon is <" + JSON.stringify(result) + ">");
      return result;
    } //of eyreshBoundingPolygon

     makemesh = () => {
      //
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

      //mesh.addEdge(0,1);
      mesh.addVertex(220,140);
     // mesh.addEdge(0,2);
      //mesh.addEdge(1,2);
      mesh.printInfo();

      let boundingPolygon = this.eyreshBoundingPolygon(mesh);
      let prevX = boundingPolygon[0].X()
      let prevY = boundingPolygon[0].Y();

       //const XC = 0; //index of x coordinate in mesh table
      // const YC = 1; //index of y coordinate in mesh table
       const EDGE_I = 0; //index of first vertex of edge 
       const EDGE_J = 1; //index of second vertex of edge
        const CANVAS_WIDTH=500;
        const CANVAS_HEIGHT=500;
    
        return (
          <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>"
          {
            mesh.vertices.map((vertex,index) => {
              return (  <circle key={index} cx={vertex.X()} cy={vertex.Y()} r="2" stroke="black" strokeWidth="1" fill="white"/>);                      
              //return (  <text key={index} x={vertex.X()} y={vertex.Y()} stroke="black" strokeWidth="1" fill="white">{index+1}</text>);
            })
          }
          {
            mesh.edges.map((edge,index) => {
              const startpoint = mesh.vertices[edge[EDGE_I]];
              const endpoint = mesh.vertices[edge[EDGE_J]];
              return (  <line key={index} x1={startpoint.X()} y1={startpoint.Y()} x2={endpoint.X()} y2={endpoint.Y()} style={{stroke:'blue',strokeWidth:1}}/>);                      
            })          
          }
          {
            boundingPolygon.map((vertex,index) => {
              const line = <line key={index} x1={vertex.X()} y1={vertex.Y()} x2={prevX} y2={prevY} style={{stroke:'blue',strokeWidth:1}}/>;                      
              prevX = vertex.X();
              prevY = vertex.Y();
              return line;
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
      
export default MySimpleBoundingPolygon;
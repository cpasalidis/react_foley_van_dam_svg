import React, { Component } from 'react';
import {TrapezoidalMap} from '../utils/doubly_linked_edge_list';

class MySimpleTrapezoidalMap extends Component {
    constructor() {
        super();
        this.makemesh = this.makemesh.bind(this);
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
    

     makemesh = () => {
      //
      let tzmap = new TrapezoidalMap('');
      /*
      mesh2.addVertex(50,450,'u1');
      mesh2.addVertex(250,490,'u2');
      mesh2.addVertex(250,250,'u3');
      mesh2.addVertex(150,175,'u4');
      mesh2.addEdge("u1","u2","ee1,1","ee1,2");
      mesh2.addEdge("u2","u3","ee4,2","ee4,1");
      mesh2.addEdge("u3","u1","ee3,1","ee3,2");
      mesh2.addEdge("u3","u4","ee2,1","ee2,2");
      mesh2.addFace("",["e1,1"],"ff1");
      mesh2.addFace("e4,1",[],"ff2");
      mesh2.setNextPreviousFaceOfEdge("ee1,1","ee4,2","ee3,1","ff1");
      mesh2.setNextPreviousFaceOfEdge("ee1,2","ee3,2","ee4,1","ff2");
      mesh2.setNextPreviousFaceOfEdge("ee2,1","ee2,2","ee4,2","ff1");
      mesh2.setNextPreviousFaceOfEdge("ee2,2","ee3,1","ee2,1","ff1");
      mesh2.setNextPreviousFaceOfEdge("ee3,1","ee1,1","ee2,2","ff1");
      mesh2.setNextPreviousFaceOfEdge("ee3,2","ee4,1","ee1,2","ff2");
      mesh2.setNextPreviousFaceOfEdge("ee4,1","ee1,2","ee3,2","ff2"); //i could skip faceName hre, but i added it for readability...dont make me think...
      mesh2.setNextPreviousFaceOfEdge("ee4,2","ee2,1","ee1,1","ff1");
  */
 tzmap.printInfo();

  

       //const XC = 0; //index of x coordinate in mesh table
      // const YC = 1; //index of y coordinate in mesh table
       const EDGE_I = 0; //index of first vertex of edge 
       const EDGE_J = 1; //index of second vertex of edge
        const CANVAS_WIDTH=500;
        const CANVAS_HEIGHT=500;
    
        return (
          //https://hackernoon.com/how-to-map-a-map-12c6ef1c5b2e
          <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>"
          {
            tzmap.verticesArr.map((vertex,index) => {
              //return (  <circle key={index} cx={vertex.X()} cy={vertex.Y()} r="2" stroke="black" strokeWidth="1" fill="white"/>);                      
              return (  <text key={index} x={vertex.x} y={vertex.y} stroke="blue" strokeWidth="1" fill="white">{vertex.getName()}</text>);
            })
          }
          {
            tzmap.edgesArr.map((edge,index) => {
              return (  <line key={index} x1={edge.x1} y1={edge.y1} x2={edge.x2} y2={edge.y2} style={{stroke:'blue',strokeWidth:1}}/>);                      
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
      
export default MySimpleTrapezoidalMap;
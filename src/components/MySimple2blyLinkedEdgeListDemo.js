import React, { Component } from 'react';
import {MeshDoublyLinkedListEdges,MapOverlay} from '../utils/doubly_linked_edge_list';

class MySimple2blyLinkedEdgeListDemo extends Component {
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
      let mesh2 = new MeshDoublyLinkedListEdges(true);
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

      mesh2.printInfo();

      let mesh = new MeshDoublyLinkedListEdges(true);
      mesh.addVertex(0,400,'v1');
      mesh.addVertex(190,490,'v2');
      mesh.addVertex(200,200,'v3');
      mesh.addVertex(100,100,'v4');
      mesh.addEdge("v1","v2","e1,1","e1,2");
      mesh.addEdge("v2","v3","e4,2","e4,1");
      mesh.addEdge("v3","v1","e3,1","e3,2");
      mesh.addEdge("v3","v4","e2,1","e2,2");
      mesh.addFace("",["e1,1"],"f1");
      mesh.addFace("e4,1",[],"f2");
      mesh.setNextPreviousFaceOfEdge("e1,1","e4,2","e3,1","f1");
      mesh.setNextPreviousFaceOfEdge("e1,2","e3,2","e4,1","f2");
      mesh.setNextPreviousFaceOfEdge("e2,1","e2,2","e4,2","f1");
      mesh.setNextPreviousFaceOfEdge("e2,2","e3,1","e2,1","f1");
      mesh.setNextPreviousFaceOfEdge("e3,1","e1,1","e2,2","f1");
      mesh.setNextPreviousFaceOfEdge("e3,2","e4,1","e1,2","f2");
      mesh.setNextPreviousFaceOfEdge("e4,1","e1,2","e3,2","f2"); //i could skip faceName hre, but i added it for readability...dont make me think...
      mesh.setNextPreviousFaceOfEdge("e4,2","e2,1","e1,1","f1");

      mesh.printInfo();

      console.log("=========================================================");
      let ovl = new MapOverlay(mesh,mesh2).combineMaps();
      ovl.printInfo();


       //const XC = 0; //index of x coordinate in mesh table
      // const YC = 1; //index of y coordinate in mesh table
       const EDGE_I = 0; //index of first vertex of edge 
       const EDGE_J = 1; //index of second vertex of edge
        const CANVAS_WIDTH=500;
        const CANVAS_HEIGHT=500;
    
        return (
          <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>"
          {
            mesh.getVertices().map((vertex,index) => {
              //return (  <circle key={index} cx={vertex.X()} cy={vertex.Y()} r="2" stroke="black" strokeWidth="1" fill="white"/>);                      
              return (  <text key={index} x={vertex.X()} y={vertex.Y()} stroke="blue" strokeWidth="1" fill="white">{vertex.getName()}</text>);
            })
          }
          {
            mesh.getEdges().map((edge,index) => {
              let se = mesh.getVerticesOfEdge(edge.getName());
              const startpoint = se[EDGE_I];
              const endpoint = se[EDGE_J];
              return (  <line key={index} x1={startpoint.X()} y1={startpoint.Y()} x2={endpoint.X()} y2={endpoint.Y()} style={{stroke:'blue',strokeWidth:1}}/>);                      
            })          
          }
          {
            mesh2.getVertices().map((vertex,index) => {
              //return (  <circle key={index} cx={vertex.X()} cy={vertex.Y()} r="2" stroke="black" strokeWidth="1" fill="white"/>);                      
              return (  <text key={index} x={vertex.X()} y={vertex.Y()} stroke="red" strokeWidth="1" fill="white">{vertex.getName()}</text>);
            })
          }
          {
            mesh2.getEdges().map((edge,index) => {
              let se = mesh2.getVerticesOfEdge(edge.getName());
              const startpoint = se[EDGE_I];
              const endpoint = se[EDGE_J];
              return (  <line key={index} x1={startpoint.X()} y1={startpoint.Y()} x2={endpoint.X()} y2={endpoint.Y()} style={{stroke:'red',strokeWidth:1}}/>);                      
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
      
export default MySimple2blyLinkedEdgeListDemo;
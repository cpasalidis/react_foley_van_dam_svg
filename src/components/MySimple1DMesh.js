import React, { Component } from 'react';
import Mesh1D from '../utils/Mesh1D';

class MySimple1DMesh extends Component {
    constructor() {
        super();
        this.makemesh = this.makemesh.bind(this);
    }

     makemesh = () => {
      let mesh = new Mesh1D();
      mesh.addVertex(100,100);
      mesh.addVertex(200,200);
      mesh.addEdge(0,1);
      mesh.addVertex(220,140);
      mesh.addEdge(0,2);
      mesh.addEdge(1,2);
      mesh.printInfo();

       const XC = 0; //index of x coordinate in mesh table
       const YC = 1; //index of y coordinate in mesh table
       const EDGE_I = 0; //index of first vertex of edge 
       const EDGE_J = 1; //index of second vertex of edge
        const CANVAS_WIDTH=500;
        const CANVAS_HEIGHT=500;
    
        return (
          <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>"
          {
            mesh.vertices.map((vertex,index) => {
              return (  <circle key={index} cx={vertex[XC]} cy={vertex[YC]} r="2" stroke="black" strokeWidth="1" fill="white"/>);                      
            })
          }
          {
            mesh.edges.map((edge,index) => {
              const startpoint = mesh.vertices[edge[EDGE_I]];
              const endpoint = mesh.vertices[edge[EDGE_J]];
              return (  <line key={index} x1={startpoint[XC]} y1={startpoint[YC]} x2={endpoint[XC]} y2={endpoint[YC]} style={{stroke:'blue',strokeWidth:1}}/>);                      
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
      
export default MySimple1DMesh;
import React, { Component } from 'react';

class MySimpleCube extends Component {
    constructor() {
        super();
        this.cube = this.cube.bind(this);
    }

     cube = () => {
        const cube_vertices =[
          [-0.5,-0.5,2.5],
          [-0.5,0.5,2.5],
          [0.5,0.5,2.5],
          [0.5,-0.5,2.5],
          [-0.5,-0.5,3.5],
          [-0.5,0.5,3.5],
          [0.5,0.5,3.5],
          [0.5,-0.5,3.5]
        ];
        const cube_edges = [
          [0,1],
          [1,2],
          [2,3],
          [3,0],
          [0,4],
          [1,5],
          [2,6],
          [3,7],
          [4,5],
          [5,6],
          [6,7],
          [7,4],
        ];
    
        let cube_2d_vertices=[];
        const XMIN=-5;
        const XMAX=5;
        const YMIN = -5;
        const YMAX=5;
        const XC=0,YC=1,ZC=2;
        const NORMY=YMAX-YMIN;
        const NORMX=XMAX-XMIN;
        const SCALE=900.0;
        const CANVAS_WIDTH=500;
        const CANVAS_HEIGHT=500;
    
        cube_vertices.map(cube_vertex => {
           const newx = cube_vertex[XC]/cube_vertex[ZC];
           const newy = cube_vertex[YC]/cube_vertex[ZC];
           const doubleX = SCALE * (1 - (newx-XMIN)/NORMX);
           const doubleY = SCALE * ((newy-YMIN)/NORMY);
    
            const normX = parseInt(doubleX,10);
            const normY = parseInt(doubleY,10);
            let vertex2d = [normX,normY];
            cube_2d_vertices.push(vertex2d);
            return vertex2d;
        })
    
        return (
          <svg width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>"
          {
            cube_2d_vertices.map(vertex => {
              return (  <circle cx={vertex[XC]} cy={vertex[YC]} r="2" stroke="black" strokeWidth="1" fill="white"/>);                      
            })
          }
          {
            cube_edges.map(edge => {
              const startpoint = cube_2d_vertices[edge[0]];
              const endpoint = cube_2d_vertices[edge[1]];
              return (  <line x1={startpoint[XC]} y1={startpoint[YC]} x2={endpoint[XC]} y2={endpoint[YC]} style={{stroke:'blue',strokeWidth:1}}/>);                      
            })
          }
          </svg>
        )
    }



    render() {
        const aCube = this.cube();
        return (
                <div>
                {aCube}
                </div>
            );
    }

    } //of class
      
export default MySimpleCube;
import React, { Component } from 'react';
import { Grid, Navbar, Nav,NavItem,NavDropdown,MenuItem,Jumbotron, Button } from 'react-bootstrap';
//https://stackoverflow.com/questions/23402542/embedding-svg-into-reactjs

const myclock=() => {
  return (
  <svg width="100" height="100">
  <ellipse cx="30" cy="30" rx="20" ry="20" style={{fill:'lightgray'}} />
  <ellipse cx="30" cy="12" rx="1" ry="1" style={{fill:'blue'}} />
  <polygon points="28,30 32,30 30,48" style={{fill:'blue'}} />
  <polygon points="28,28 32,32 18,40" style={{fill:'blue'}} />
  <polygon points="28,28 32,32 48,20" style={{fill:'red'}} />
</svg>
  );
}
const cube = () => {
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
class App extends Component {
  render() {
    const myClock = myclock();
    const myCube = cube();
    return (
      <div>
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">React App</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
           <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">Link</NavItem>
                <NavItem eventKey={2} href="#">Link</NavItem>
                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Action</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">Link Right</NavItem>
                <NavItem eventKey={2} href="#">Link Right</NavItem>
              </Nav>
    </Navbar.Collapse>
        </Navbar>
        <Jumbotron>
          <Grid>
            <h1>Welcome to React</h1>
            <p>
              <Button
                bsStyle="success"
                bsSize="large"
                href="http://react-bootstrap.github.io/components.html"
                target="_blank">
                View React Bootstrap Docs
              </Button>
            </p>
            <h1>Graphics</h1>
            {myClock}
            {myCube}
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
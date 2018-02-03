import React, { Component } from 'react';
import { Grid, Navbar, Nav,NavItem,NavDropdown,MenuItem,Jumbotron, Button } from 'react-bootstrap';
//my components
//import {MySimpleStaticClock,MySimpleCube,MySimple1DMesh} from './components';
//import {MySimpleStraightPaths} from './components';
//import {MySimpleBoundingPolygon} from './components';
import {MySimple2blyLinkedEdgeList} from './components';
//https://stackoverflow.com/questions/23402542/embedding-svg-into-reactjs

class App extends Component {
  //In the future, i  will use react router, to setup which component to show
  
  render() {
    
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
            {/* works <MySimpleStaticClock/>  */}
            {/* works <MySimpleCube/>  */}
            {/* works <MySimple1DMesh/>  */}
            {/*works <MySimpleStraightPaths/>*/}
            {/* works <MySimpleBoundingPolygon/> */}
            <MySimple2blyLinkedEdgeList/>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default App;
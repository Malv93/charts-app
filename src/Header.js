import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Header = () => (
  <Navbar className="navbar" expand="lg">
    <Navbar.Brand as={Link} to="/">
      Charts-App
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>

        <NavDropdown title="Charts List" id="basic-nav-dropdown">
          <NavDropdown.Item as={Link} to="/charts/aids-choroplet-map">
            AIDS Choroplet Map
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/charts/covid-country-linechart">
            Covid by Country Linechart
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/charts/covid-linechart">
            Covid Linechart
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/charts/iris-flowers-scatterplot">
            Iris Flowers Scatterplot
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/charts/migrants-histogram">
            Migrants Histogram
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/charts/migrants-map">
            Migrants Map with Brushing
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/charts/population-barchart">
            Population Barchart
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/charts/temp-vs-time-linechart">
            Temp vs Time Linechart
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/charts/world-cities-map">
            World Cities Map
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/charts/world-map">
            World Map
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

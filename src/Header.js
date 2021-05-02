import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const Header = ({ chartsInfo }) => (
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
          {chartsInfo.map((info) => (
            <NavDropdown.Item
              key={uuidv4()}
              as={Link}
              to={"/charts/" + info.link}
            >
              {info.title}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

import React from 'react'
import { Button, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { BsCart } from 'react-icons/bs'
import { RxPerson } from 'react-icons/rx'

const Header = () => {
  return (
    <Navbar bg='info' expand='lg' className='m-3'>
      <Container>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='nav_bar_menu'>
          <Nav className='me-auto nav_bar_menu'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link>About</Nav.Link>
            <Nav.Link href='#link'>Category</Nav.Link>
            <Nav.Link href='#link'>Category</Nav.Link>
          </Nav>
          <Form className='d-flex'>
            <Form.Control type='search' placeholder='Search' className='me-2' aria-label='Search' />
            <Button variant='outline-success'>Search</Button>
          </Form>
          <Nav>
            <NavDropdown
              id='nav-dropdown-dark-example'
              title={
                <div style={{ minWidth: 30 }}>
                  <RxPerson />
                </div>
              }
              className={'profile-dropdown'}
            >
              <NavDropdown.Item href='/register'>Register</NavDropdown.Item>
              <NavDropdown.Item href='/login'>Login</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>
              <BsCart />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header

import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});



function App() {

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  //const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');







  useEffect(() => {
    client.get("http://127.0.0.1:8000/api/createUser")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);

    
  // const handleAuthorization = () => {
  //   // Выполняем запрос к API для авторизации
  //   axios.get('http://127.0.0.1:8000/api/getUser')
  //     .then(response => {
  //       if (response.status === 200) {
  //         setIsAuthenticated(true);
  //       } else if (response.status === 401) {
  //         // Предложить пользователю авторизоваться здесь, например, показав форму ввода логина и пароля.
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  // return (
  //   <div>
  //     {isAuthenticated ? (
  //       <p>Человек авторизован</p>
  //     ) : (
  //       <div>
  //         <p>Вы не авторизованы.</p>
  //         <button onClick={handleAuthorization}>Авторизоваться</button>
  //       </div>
  //     )}
  //   </div>
  // );

  // useEffect(() => {
  //   client.get("http://127.0.0.1:8000/api/createUser")
  //   .then(function(res) {
  //     setCurrentUser(true);
  //   })
  //   .catch(function(error) {
  //     setCurrentUser(false);
  //   });
  // }, []);

 

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "http://127.0.0.1:8000/api/createUser",
      {
        //email: email,
        username: username,
        password: password
      }
    ).then(function(res) {
      client.post(
        "http://127.0.0.1:8000/api/login", 
        {
         // email: email,
          username:username,
          password: password
        }
      ).then(function(res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "http://127.0.0.1:8000/api/login",
      {
      //  email: email,
      username:username,
        password: password
      }
    ).then(function(res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }

  if (currentUser) {
    return (
      
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Authentication App</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" variant="light">Log out</Button>
                </form>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
          <div className="center">
            <h2>You're logged in!</h2>
          </div>
        </div>
    //   <div>
    //   <h1>Страница авторизации</h1>
    //   {isLoggedIn ? (
    //     <p>Вы успешно вошли в систему. Переход на домашнюю страницу...</p>
    //   ) : (
    //     <button onClick={handleLogin}>Войти</button>
    //   )}
    // </div>
  );



    
  }
  return (
    <div>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Authentication App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {
      registrationToggle ? (
        <div className="center">
          <h2>Зарегистрироваться</h2>
          <Form onSubmit={e => submitRegistration(e)}>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
      </Form.Group> */}
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </Form>
        </div>        
      ) : (
        <div className="center">
          <Form onSubmit={e => submitLogin(e)}>
            <h2>Войти</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
              {/* <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} /> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </Form>
        </div>
      )
    }
    </div>
  );

  

  }


export default App;

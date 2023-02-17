
import React from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./css/stylelogin.css"
import "./js/loginjqery.js"
export function Home() {


  return (
    <div id="logreg-forms">
      <Form id="login-form" className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal "> Iniciar sesión</h1>
        <div className="social-login">
          <Button className="btn facebook-btn social-btn"><span><i
            className="fab fa-facebook-f"></i> Iniciar sesión con
            Facebook</span>
          </Button>
          <Button className="btn google-btn social-btn"><span><i className="fab fa-google-plus-g"></i> Iniciar sesión con Google</span>
          </Button>
        </div>
        <p className="d-flex justify-content-center "> O </p>

        <Form.Control type="email" id="email" name="email" className="form-control" placeholder="Email address" />
        <Form.Control type="password" id="password" name="password" className="form-control" placeholder="Password" required="" />

        <Button className="btn btn-success btn-block" type="submit"><i className="fas fa-sign-in-alt"></i>Iniciar Sesión</Button>
        <Link id="forgot_pswd" >Olvido su contraseña?</Link>
        <hr></hr>
        <Button className="btn btn-primary btn-block" type="button" id="btn-signup"><i class="fas fa-user-plus"></i>Iniciar con una cuenta nueva</Button>
      </Form>

      <Form className="form-reset">
      <Form.Control type="email" id="resetEmail" className="form-control" placeholder="Correo electronico" required="" />
          <Button className="btn btn-primary btn-block"type="submit"> Recuperar contraseña
          </Button>
          
        <Link id="cancel_reset" ><i class="fas fa-angle-left"></i> Volver</Link>
        </Form>
    </div>

  );
}

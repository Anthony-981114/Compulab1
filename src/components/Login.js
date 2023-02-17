import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "./Alert";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./css/stylelogin.css"
import "./js/loginjqery.js"
import $ from 'jquery';

const ocultamenu = () => {
  $('#sliders').removeClass('active');
  $('#sliders-background').removeClass('active');
};

export function Login() {
  useEffect(() => {
    document.title = "CompuLab: Iniciar Sesión"
 }, []);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle,loginWithFacebook, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/calendar");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/calendar");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleFacebookSignin = async () => {
    try {
      await loginWithFacebook();
      navigate("/calendar");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Ingresa un correo para resetear tu contraseña");
    try {
      await resetPassword(user.email);
      setError('Hemos enviado un correo a tu cuenta')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div class="main-pages">
      {error && <Alert message={error} />}
<div class="container-fluid">
    <div id="logreg-forms">
      <Form id="login-form" className="form-signin" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal d-flex justify-content-center "> Iniciar sesión</h1>
        <div className="social-login">
          <Button className="btn facebook-btn social-btn" type="button" onClick={handleFacebookSignin}><span><i
            class="fa fa-facebook"></i> Iniciar sesión con
            Facebook</span>
          </Button>

          <Button className="btn google-btn social-btn" type="button" onClick={handleGoogleSignin}><span><i className="fa fa-google"></i> Iniciar sesión con Google</span>
          </Button>
        </div>
        
        <p className="d-flex justify-content-center "> O </p>

        <Form.Control type="email" id="email" name="email" className="form-control" placeholder="Email address" onChange={handleChange}/>
        <Form.Control type="password" id="password" name="password" className="form-control" placeholder="Password" required="" onChange={handleChange}/>

        <Button className="btn btn-success btn-block" type="submit"><i className="fa fa-sign-in"></i>Iniciar Sesión</Button>
        <Link id="forgot_pswd" >Olvido su contraseña?</Link>
        <hr></hr>
        <Button className="btn btn-primary btn-block" type="button" id="btn-signup"><i className="fa fa-user-plus"></i> Iniciar con una cuenta nueva</Button>
      </Form>

      <Form className="form-reset">
      <Form.Control type="email" id="resetEmail" className="form-control" placeholder="Correo electronico" required="" />
          <Button className="btn btn-primary btn-block" onClick={handleResetPassword}> Recuperar contraseña
          </Button>
          
        <Link id="cancel_reset" ><i className="fa fa-angle-left"></i> Volver</Link>
        </Form>


        <Form className="form-signup">
        <div className="social-login">
            <Button className="btn facebook-btn social-btn" type="button"><span><i class="fa fa-facebook"></i>
                Registrarse con Facebook</span> </Button>
        </div>
        <div className="social-login">
            <Button className="btn google-btn social-btn" type="button"><span><i class="fa fa-google"></i>
                Registrarse con Google</span> </Button>
          </div>
          <p className="d-flex justify-content-center "> O </p>
      <Form.Control type="text" id="user-name" className="form-control" placeholder="Nombre completo" required autofocus="" />
      <Form.Control type="email" id="user-email" className="form-control" placeholder="Correo electronico" required  autofocus="" />
      <Form.Control type="password" id="user-pass" className="form-control" placeholder="Contraseña" required autofocus="" />
      <Form.Control type="password" id="user-repeatpass" className="form-control" placeholder="Repetir contraseña" required autofocus="" />
        
          <Button className="btn btn-primary btn-block" type="submit"> <i class="fa fa-user-plus"></i> Registrarse 
          </Button>
          
        <Link id="cancel_signup" ><i className="fa fa-angle"></i> Volver</Link>
        </Form>
    </div>
    </div>
    <div class="slider-background" id="sliders-background" onClick={ocultamenu}></div>
    </div>
  );
}

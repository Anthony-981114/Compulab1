
import React from "react";
import { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import "./js/index.js"
import { useAuth } from "../context/AuthContext";
import $ from 'jquery';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {
    Navbar,  NavItem, NavbarToggler, Collapse, NavLink, Nav,NavbarBrand} from 'reactstrap';
export function Navbarpage() {
    const [isActive, setIsActive] = useState(false);


    const ShowAlertComponent = () => {
        if($('#sliders').hasClass('active')){
            $('#sliders').removeClass('active');
            $('#sliders-background').removeClass('active');
        } else {
            $('#sliders').addClass('active');
            $('#sliders-background').addClass('active');
        }
    };
    
    const handleClick = event => {
        // 👇️ toggle isActive state on click
        setIsActive(current => !current);
      };
      


    const { logout, user } = useAuth();

    console.log(user);
    const handleLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.error(error.message);
      }
    };
    return (
      <>
            <div class="wrapper">
            <NotificationContainer/>
                <nav class="navbar navbar-expand-md navbar-light  py-1">
                    <div class="container-fluid">
                        <button class="btn btn-default" id="btn-slider" type="button" onClick={ShowAlertComponent}>
                            <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
                        </button>
                        <a class="navbar-brand me-auto text-danger" href="#"><span class="text-warning"></span></a>
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item dropleft">
                                <a class="nav-link text-white ps-3 pe-1 " href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <img src={user.photoURL || "http://cdn.onlinewebfonts.com/svg/img_184513.png"} alt="user" class="img-user"/>{user.displayName || user.email}
                                </a>
                                <div class="dropdown-menu mt-2 pt-0" aria-labelledby="navbarDropdown" >
                                    <div class="d-flex p-3 border-bottom mb-2">
                                        <img 
                                        src={user.photoURL || "http://cdn.onlinewebfonts.com/svg/img_184513.png"} 
                                        alt="user" class="img-user me-2"
                                        />
                                        <div class="d-block">
                                            <p class="fw-bold m-0 lh-1" id="nameuser">   {user.displayName || user.email}</p>
                                            <small id="emailuser">{user.email}</small>
                                        </div>
                                    </div>
                                    <a class="dropdown-item" href="#">
                                        <i class="fa fa-user fa-lg me-3" aria-hidden="true"></i> Perfil
                                    </a>
                                    <hr class="dropdown-divider"></hr>
                                    <a class="dropdown-item" onClick={handleLogout}>
                                        <i class="fa fa-sign-out fa-lg me-2" aria-hidden="true"></i> Salir
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div class="slider" id="sliders">
                    <div class="slider-head">
                        <div class="d-block pt-4 pb-3 px-5">
                            <img src="./images/logo compulab.png" alt="user" class="slider-img-user mb-2"></img>
                            <h3 class="fw-bold mb-0 lh-1 text-black">COMPU<font COLOR="blue">LAB</font></h3>
                        </div>
                    </div>
                    <hr class="dropdown-divider"></hr>
                    <div class="slider-body px-1">
                        <nav class="nav flex-column">
                            <a className={isActive ? 'nav-link px-3 active' : 'nav-link px-3'} onClick={handleClick}  href="#">
                                <i class="fa fa-home fa-lg box-icon" aria-hidden="true"></i>Inicio
                            </a>
                            <a className={isActive ? 'nav-link px-3 active' : 'nav-link px-3'} onClick={handleClick} href="#">
                                <i class="fa fa-user fa-lg box-icon" aria-hidden="true"></i>Perfil
                            </a>
                            <hr class="soft my-1 bg-white"></hr>
                                <a class="nav-link px-3" activeClassName="active" href="">
                                    <i class="fa fa-dropbox fa-lg box-icon" aria-hidden="true"></i>Estado
                                </a>
                               
                                <hr class="soft my-1 bg-white"></hr>
                                  
                                    <a class="nav-link px-3" activeClassName="active" href="/laboratorio">
                                        <i class="fa fa-envelope fa-lg box-icon" aria-hidden="true"></i>Reportar
                                    </a>
                                    <hr class="soft my-1 bg-white"></hr>
                                    
                                        <hr class="dropdown-divider"></hr>
                                        <a class="nav-link px-3" onClick={handleLogout}>
                                            <i class="fa fa-sign-out fa-lg box-icon" aria-hidden="true"></i>Salir
                                        </a>
                                    </nav>
                                </div>
                            </div>
                    </div>

                    <Outlet></Outlet>

                </>

 );
}

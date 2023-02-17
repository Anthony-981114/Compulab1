import React from "react";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import $ from 'jquery';

export function Navbar1() {
 

  const ShowAlertComponent = () => {
    if($('#sliders').hasClass('active')){
        $('#sliders').removeClass('active');
        $('#sliders-background').removeClass('active');
    } else {
        $('#sliders').addClass('active');
        $('#sliders-background').addClass('active');
    }
};



    return (
      <>
        <div class="wrapper">

    <nav class="navbar navbar-expand-md navbar-light  py-1">
      <div class="container-fluid">
        <button class="btn btn-default" id="btn-slider" type="button" onClick={ShowAlertComponent}>
          <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
        </button>
        <a class="navbar-brand me-auto text-danger" href="#"><span class="text-warning"></span></a>


      </div>
    </nav>
    <div class="slider" id="sliders">
      <div class="slider-head">
        <div class="d-block pt-4 pb-3 px-5">
          <img src="./images/logo compulab.png" alt="user" class="slider-img-user mb-2"></img>
          <p class="fw-bold mb-0 lh-1 text-black">COMPULAB</p>
        </div>
      </div>
      <hr class="dropdown-divider"></hr>
      <div class="slider-body px-1">
        <nav class="nav flex-column">
          <a class="nav-link px-3 active" href="#">
            <i class="fa fa-home fa-lg box-icon" aria-hidden="true"></i>Indentificate
          </a>

          <hr class="soft my-1 bg-white"></hr>
          <a class="nav-link px-3" href="#">
            <i class="fa fa-id-card fa-lg box-icon" aria-hidden="true"></i>Acerca
          </a>

        </nav>
      </div>
    </div>
  </div>


<Outlet></Outlet> 

</>

  );
}

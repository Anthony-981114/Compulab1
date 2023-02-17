import React, { useState, useRef, useEffect } from "react";
import "./css/stylec.css"
import 'react-notifications/lib/notifications.css';
import $ from "jquery";
import { Alert } from "./Alert";
import {
    Button, Modal, ModalFooter,
    ModalHeader, ModalBody
} from "reactstrap"
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export function Laboratoriopage() {
    useEffect(() => {
        document.title = "CompuLab: Reportar estado"
    }, []);

    const ocultamenu = () => {
        $('#sliders').removeClass('active');
        $('#sliders-background').removeClass('active');
    };
    const [numeq, setnumeq] = useState("");
    const [ideq, setideq] = useState("");

    const [modal, setModal] = React.useState(false);
    // Toggle for Modal
    const toggle = () => {
            window.addEventListener("click", e => {
              const id = e.target.getAttribute("id");
              console.log("Se ha clickeado el id "+id);
              setideq(id);
            });
        setModal(!modal)};
    

        
    return (
        <div class="main-pages">

            <div class="container-fluid">
                <div class="row g-2 mb-3">
                    <div class="col-12">
                        <div class="d-block ">

                            <div class="table-responsive-sm">

                                <table class="table">
                                    <thead>
                                        <tr>
                                            <td colspan="9">
                                                <h1 class="titulo"> Reportar estado de computador</h1>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="compu" id="000"><p onClick={toggle} id="000"><h5 id="000" class="dot">0</h5></p></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td class="compu" id="001"><p onClick={toggle} id="001"><h5 id="001" class="dot">1</h5></p></td>
                                            <td class="compu" id="002"><p onClick={toggle} id="002"><h5 id="002" class="dot">2</h5></p></td>
                                            <td class="compu" id="003"><p onClick={toggle} id="003"><h5 id="003" class="dot">3</h5></p></td>
                                            <td class="compu" id="004"><p onClick={toggle} id="004"><h5 id="004" class="dot">4</h5></p></td>

                                            <td class="espacio"></td>

                                            <td class="compu" id="005"><p onClick={toggle} id="005"><h5 id="005"  class="dot">5</h5></p></td>
                                            <td class="compu" id="006"><p onClick={toggle} id="006"><h5 id="006" class="dot">6</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">7</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">8</h5></p></td>
                                        </tr>
                                        <tr>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">9</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">10</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">11</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">12</h5></p></td>

                                            <td class="espacio"></td>

                                            <td class="compu"><p onClick={toggle}><h5 class="dot">13</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">14</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">15</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">16</h5></p></td>
                                        </tr>
                                        <tr>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">17</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">18</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">19</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">20</h5></p></td>

                                            <td class="espacio"></td>

                                            <td class="compu"><p onClick={toggle}><h5 class="dot">21</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">22</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">23</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">24</h5></p></td>
                                        </tr>
                                        <tr>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">25</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">26</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">27</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">28</h5></p></td>

                                            <td class="espacio"></td>

                                            <td ><p onClick={toggle}></p></td>
                                            <td ><p onClick={toggle}></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">29</h5></p></td>
                                            <td class="compu"><p onClick={toggle}><h5 class="dot">30</h5></p></td>
                                       
                                        </tr>
                                    </tbody>
                                </table>
                            </div>



                            <div>

                                <Modal isOpen={modal} toggle={toggle}>
                                    <ModalHeader
                                        toggle={toggle}>Reportar equipo</ModalHeader>
                                    <ModalBody>

                                        <Form>
                                            <FormGroup>
                                                <Label for="exampleEmail">ID del equipo:</Label>
                                                <Input type="text" name="text" id="exampleEmail" value={ideq} readOnly/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleSelect">Asignatura:</Label>
                                            </FormGroup>    
                                            <FormGroup>
                                                <Input type="select" name="select" id="exampleSelect" >
                                                    <option>Lengua y literatura</option>
                                                    <option>Matemática</option>
                                                    <option>Estudios sociales</option>
                                                    <option>Ciencias naturales</option>
                                                    <option>Ingles</option>
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleText">Observaciones:  </Label>
                                                <Input type="textarea" name="text" id="exampleText"  minlength="1" required/>
                                            </FormGroup>
                                            
                                        </Form>

                                    </ModalBody>
                                    <ModalFooter>
                                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                                    <Button color="success" onClick={toggle}>Guardar</Button>
                                
                                    
                                    </ModalFooter>
                                </Modal>
                            </div >




                        </div>
                    </div>
                </div>
            </div>

            <div class="slider-background" id="sliders-background" onClick={ocultamenu}></div>
        </div>
    );
}
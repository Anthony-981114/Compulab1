import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { Row, Col, Button, FormGroup, Label, Input, Container } from "reactstrap";
import "../css/stylec.css"
import { saveWebsite, updateWebsite, getWebsites, deletependiente, deleteWebsite, getsolicitud, onGetLinks, savependiente } from "../../database";
import Circle from '@uiw/react-color-circle';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Alert } from "../Alert";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
export function Useradmin() {
    const { user } = useAuth();
   
    //fin consulta de datos
    const [pendientes, setpendientes] = useState([])
    const mpendientes = async () => {

        const q1 = query(collection(db, "reservas-pendientes"));
        const unsubscribe = onSnapshot(q1, (data1) => {
            const docs2 = [];
            data1.forEach((doc) => {
                console.log("pendientes", doc.data())
                docs2.push({ ...doc.data(), id: doc.id });

            });
            setpendientes(docs2)
        })
    }
    useEffect(() => {
        mpendientes();
    }, [])
    {

        pendientes.map((blog) => {

            console.log(blog.title)
        })
    };
    
//guardar pendiente
const guardarpendiente = async (id) => {
    console.log(id);
    await saveWebsite(id);
    await deletependiente(id.id);
     
 }
 //eliminar pendientes
 const onDeleteLink = async (id) => {
     if (window.confirm("¿Estas seguro de rechazar esta solicitud?")) {
       await deletependiente(id);
       toast("Link Removed Successfully", {
         type: "error",
         autoClose: 2000,
       });
     }
   };
 
    return (
        <div class="reservas">
            <h4>Reservaciones por aprobar:</h4>
            {

                pendientes.map((blog) => {
                    return (
                        <dl>
                            <dt style={{ backgroundColor: blog.color }}>{blog.title}</dt>
                            <dd style={{ backgroundColor: blog.color }}>- {blog.start}</dd>
                            <Button color="danger" onClick={(e) => { e.stopPropagation(); onDeleteLink(blog.id); }}><i class="fa fa-times" aria-hidden="true"></i> Rechazar</Button>{' '}
                            <Button color="success" onClick={(e) => { e.stopPropagation(); guardarpendiente(blog); }}><i class="fa fa-times" aria-hidden="true"></i> Aprobar</Button>{' '}
                        </dl>

                    )
                })
            }

            

        </div>

    )
}
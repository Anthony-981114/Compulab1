import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Row, Col, Button, FormGroup, Label, Input, Container } from "reactstrap";
import "../css/stylec.css"
import { updateWebsite, getWebsites, deletependiente, deleteWebsite, getsolicitud } from "../../database";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Alert } from "../Alert";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
export function Userview() {
    const { user } = useAuth();
   
    //fin consulta de datos

    const [blogs, setBlogs] = useState([])
    const fetchBlogs = async () => {
       
        const q = query(collection(db, "reservas"), where("user_id", "==", user.uid));
        const unsubscribe = onSnapshot(q, (data) => {
        const docs1 = [];
        data.forEach((doc) => {
            docs1.push({ ...doc.data(), id: doc.id });
        });
        setBlogs(docs1)
  })}
    useEffect(() => {
        fetchBlogs();
    }, []);
    //fin consulta de datos
    const [pendientes, setpendientes] = useState([])
    const mpendientes = async () => {

        const q1 = query(collection(db, "reservas-pendientes"), where("user_id", "==", user.uid));
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
            <h4>Reservaciones pendientes:</h4>
            {

                pendientes.map((blog) => {
                    return (
                        <dl>
                            <dt style={{ backgroundColor: blog.color }}>{blog.title}</dt>
                            <dd style={{ backgroundColor: blog.color }}>- {user.email}</dd>
                            <Button color="danger" onClick={(e) => { e.stopPropagation(); onDeleteLink(blog.id); }}><i class="fa fa-times" aria-hidden="true"></i> Cancelar solicitud</Button>{' '}
                            </dl>

                    )
                })
            }

            <h4>Reservas aprobadas:</h4>
            {
                blogs.map((blog) => {
                    return (
                        <dl>
                            <dt style={{ backgroundColor: blog.color }}>{blog.title}</dt>
                            <dd style={{ backgroundColor: blog.color }}>- {user.email}</dd>
                        </dl>
                    )
                })
            }


        </div>

    )
}
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';
import { nanoid } from "nanoid";
import { Row, Col, Button, FormGroup, Label, Input, Container } from "reactstrap";
import Select from "react-select";
import "./css/stylec.css"
import DateRangePicker from "react-bootstrap-daterangepicker";
import { saveWebsite, updateWebsite, getWebsites, deletependiente, deleteWebsite, getsolicitud, onGetLinks, savependiente } from "../database";
import Circle from '@uiw/react-color-circle';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import events from "./js/Events";
import CustomModal from "./js/CustomModal";
import $ from "jquery";
import { async } from "@firebase/util";
import { Alert } from "./Alert";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Userview } from "./js/viewuser";
import { Useradmin } from "./js/viewadmin";
export function Calendarpage() {
    const { user } = useAuth();
    useEffect(() => {
        document.title = "CompuLab: Reservar laboratorio"
    }, []);
    const [hex, setHex] = useState('#FF5722');
    //consultar datos de reservas
    const [reservas, setWebsites] = useState([]);
    const getLinks = async () => {
        onGetLinks((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setWebsites(docs);
        })
    };
    useEffect(() => {
        getLinks();
    }, []);
    {
        reservas.map((link) => (

            {
                title: link.title,
                start: link.start,
                end: link.end
            } + ","
        ))
    };

    const ocultamenu = () => {
        $('#sliders').removeClass('active');
        $('#sliders-background').removeClass('active');
    };
    const [error, setError] = useState("");
    const [currentEvents, setCurrentEvents] = useState([]);
    const [modal, setModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const calendarRef = useRef(null);
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [color, setColor] = useState("");
    const handleCloseModal = () => {
        handleClose();
        setModal(false);
    };

    function handleDateClick(arg) {
        // bind with an arrow function
        // console.log(arg.dateStr);
    }

    function handleDateSelect(selectInfo) {
        // console.log(selectInfo.view.type);
        if (
            selectInfo.view.type === "timeGridWeek" ||
            selectInfo.view.type === "timeGridDay"
        ) {
            selectInfo.view.calendar.unselect();
            setState({ selectInfo, state: "create" });
            // Open modal create
            console.log("open modal create");
            // console.log(selectInfo);
            setStart(selectInfo.start);
            setEnd(selectInfo.end);
            setColor("#FF5722");
            setModal(true);
        }
    }
    function renderEventContent(eventInfo) {
        return (
            <div>
                {/* <b>{eventInfo.timeText}</b> */}
                <i
                    style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                >
                    {eventInfo.event.title}
                </i>
            </div>
        );
    }
    function handleEventClick(clickInfo) {
        var id_user = clickInfo.event._def.extendedProps.user_id;
        console.log("editarr", clickInfo.event._def.extendedProps.user_id)
        if (id_user == user.uid) {
            console.log("si es el autor")
            setState({ clickInfo, state: "update" });
            // set detail
            setTitle(clickInfo.event.title);
            setStart(clickInfo.event.start);
            setEnd(clickInfo.event.end);
            setColor(clickInfo.event.backgroundColor);
            setHex(clickInfo.event.backgroundColor);
            setModal(true);
        } else {

            NotificationManager.info('Este espacio ya esta reservado', 'Info!', 2000);

        }


    }
    function handleEvents(events) {
        setCurrentEvents(events);
    }
    //Arrastrar y mover
    async function handleEventDrop(checkInfo) {
        // 
        var id_user = checkInfo.event._def.extendedProps.user_id;
        console.log("editarr", checkInfo.event._def.extendedProps.user_id)
        if (id_user == user.uid) {
            setState({ checkInfo, state: "Mover a otro día" });
            console.log("hola", checkInfo)
            await updateWebsite(checkInfo.event._def.publicId, { start: checkInfo.event.startStr, end: checkInfo.event.endStr });
            setConfirmModal(true);
        } else {

            NotificationManager.warning('No tienes permiso para realizar esta acción', 'Info!', 2000);
            checkInfo.revert();
        }
    }
    // estizar con el cursor
    async function handleEventResize(checkInfo) {
        var id_user = checkInfo.event._def.extendedProps.user_id;
        console.log("editarr", checkInfo.event._def.extendedProps.user_id)
        if (id_user == user.uid) {
            setState({ checkInfo, state: "Reprogramar" });
            await updateWebsite(checkInfo.event._def.publicId, { start: checkInfo.event.startStr, end: checkInfo.event.endStr });
            setConfirmModal(true);
        } else {
            NotificationManager.warning('No tienes permiso para realizar esta acción', 'Info!', 2000);
            checkInfo.revert();
        }
    }
    //btn actualizar
    async function handleEdit() {
        state.clickInfo.event.setStart(start);
        state.clickInfo.event.setEnd(end);
        state.clickInfo.event.mutate({
            standardProps: { color }
        });
        console.log("t", state.clickInfo.event);
        await updateWebsite(state.clickInfo.event._def.publicId, { start: state.clickInfo.event.startStr, end: state.clickInfo.event.endStr, color: color });
        NotificationManager.success('Cambios realizados exitosamente', 'Info!', 2000);
        handleClose();
    }
    // guardar datos
    async function handleSubmit(e) {
        e.preventDefault();
        const newEvent = {
            id_r: nanoid(),
            user_id: user.uid,
            title: user.displayName || user.email,
            start: start.toISOString(),
            end: end.toISOString(),
            color: color,
            allDay: state.selectInfo?.allDay || false
        };
        await savependiente(newEvent);
        let calendarApi = calendarRef.current.getApi();
        NotificationManager.success('Reserva realizada exitosamente', 'Info!', 2000);
        handleClose();
    }

    //fin guardar datos
    //eliminar datos
    async function handleDelete() {
        var id = state.clickInfo.event._def;
        await deleteWebsite(id.publicId);
        state.clickInfo.event.remove();
        NotificationManager.error('Reservación eliminada', 'Info!', 3000);
        handleClose();
    }
    //fin eliminar datos
    function handleClose() {
        setTitle("");
        setStart(new Date());
        setEnd(new Date());
        setState({});
        setModal(false);
        setHex("#FF5722");
    }
    const [state, setState] = useState({});
    function onFilter(element) {
        console.log(element.value);
    }

    return (
        <div class="main-pages">
            {error && <Alert message={error} />}

            <div class="container-fluid">
                <div class="row g-2 mb-3">
                    <div class="col-12">
                        <div class="d-block ">


                            {user.email === "henry.j.acaro@unl.edu.ec" ? <Useradmin /> : <Userview />}

                            <div className="calendar">

                                <h1>Reservar salon</h1>

                                <Container>

                                    <Row>
                                        <Col md={12} >
                                            <FullCalendar
                                                ref={calendarRef}
                                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                                headerToolbar={{
                                                    left: "prev,today,next",
                                                    center: "title",
                                                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                                                }}
                                                locale={esLocale}
                                                slotMinTime={"07:00"}
                                                slotMaxTime={"14:00"}
                                                initialView="timeGridWeek"
                                                editable={true}
                                                selectable={true}
                                                selectMirror={true}
                                                dayMaxEvents={true}
                                                weekends={false}
                                                events={reservas}
                                                select={handleDateSelect}
                                                eventContent={renderEventContent}
                                                eventClick={handleEventClick}
                                                eventsSet={() => handleEvents(events)}
                                                eventDrop={handleEventDrop}
                                                eventResize={handleEventResize}
                                                dateClick={handleDateClick}
                                                eventAdd={(e) => {
                                                    console.log("eventAdd", e);
                                                }}
                                                eventChange={(e) => {

                                                    console.log("eventChange", e);
                                                }}
                                                eventRemove={(e) => {
                                                    console.log("eventRemove", e);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </Container>

                                <CustomModal
                                    title={state.state === "update" ? "Actualizar reservación" : "Crear reserva"}
                                    isOpen={modal}
                                    toggle={handleCloseModal}
                                    onCancel={handleCloseModal}
                                    onSubmit={state.clickInfo ? handleEdit : handleSubmit}
                                    submitText={state.clickInfo ? "Actualizar" : "Crear"}
                                    onDelete={state.clickInfo && handleDelete}
                                    deleteText="Eliminar"
                                >

                                    <FormGroup>
                                        <Label for="exampleEmail">Datos: Inico - Fin</Label>
                                        <DateRangePicker
                                            initialSettings={{
                                                locale: {
                                                    format: "YY/MM/DD hh:mm "
                                                },
                                                startDate: start,
                                                endDate: end,
                                                timePicker: true
                                            }}
                                            onApply={(event, picker) => {
                                                console.log(
                                                    "picker",
                                                    picker.startDate,
                                                    picker.endDate
                                                );
                                                setStart(new Date(picker.startDate));
                                                setEnd(new Date(picker.endDate));
                                            }}
                                        >
                                            <input className="form-control" type="text" />
                                        </DateRangePicker>
                                    </FormGroup>
                                    <Label for="example">Color de evento:</Label>
                                    <FormGroup tag="fieldset">
                                        <Circle
                                            colors={['#FF5722', '#FFC107', '#8BC34A', '#009688', '#2196F3', '#9c27b0']}
                                            color={hex}
                                            onChange={(color) => {
                                                setHex(color.hex);
                                                console.log(color.hex)
                                                setColor(color.hex);
                                            }}
                                        />


                                    </FormGroup>

                                </CustomModal>

                                <CustomModal
                                    title={state.state === "resize" ? "Reprogramar reserva" : "Arrastrar reserva"}
                                    isOpen={confirmModal}
                                    toggle={async () => {
                                        state.checkInfo.revert();
                                        await updateWebsite(state.checkInfo.event._def.publicId, { start: state.checkInfo.oldEvent.startStr, end: state.checkInfo.oldEvent.endStr });
                                        console.log("cancel", state.checkInfo)
                                        setConfirmModal(false);
                                    }}
                                    onCancel={async () => {
                                        state.checkInfo.revert();
                                        await updateWebsite(state.checkInfo.event._def.publicId, { start: state.checkInfo.oldEvent.startStr, end: state.checkInfo.oldEvent.endStr });
                                        console.log("cancel", state.checkInfo)
                                        setConfirmModal(false);
                                    }}
                                    cancelText="Cancelar"
                                    onSubmit={() => {
                                        setConfirmModal(false);
                                        NotificationManager.success('Cambios realizados exitosamente', 'Info!', 2000);
                                    }}
                                    submitText={"OK"}
                                >
                                    Estas seguro/a de {state.state} este evento?
                                </CustomModal>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="slider-background" id="sliders-background" onClick={ocultamenu}></div>
        </div>
    );
}
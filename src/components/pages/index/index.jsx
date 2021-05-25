import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import Form from 'react-bootstrap/Form'
import "./style.css"
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import ThirdRoomList from "../events/3rd-RoomList";
import SecondRoomList from "../events/2nd-RoomList";
import FourthRoomList from "../events/4th-RoomList";
import CalendarActions from './actions/form-actions';

const localizer = momentLocalizer(moment)
const Index = () => {
  const [roomListId, setRoomListId] = useState("2nd-room")
  const [roomList, setRoomList] = useState([])
  const hangeChange = (e) => {
    setRoomListId(e.target.value)
    if (roomListId === "2nd-room") {
      setRoomList(SecondRoomList)
    }
    else if (roomListId === "3rd-room") {
      setRoomList(ThirdRoomList)
    }
    else if (roomListId === "4rd-room") {
      setRoomList(FourthRoomList)
    }

  }
  useEffect(() => {
    CalendarActions.GetData(function (data) {
      // alert(JSON.stringify(data))
    })

  })

  return (
    <Container fluid >
      <Row className=" pt-2 ">
        <Col lg={12}>
          <ol className="breadcrumb mb-4 d-flex justify-content-center">
            <h1 className="breadcrumb-item text-center active ">  Hotel Calendar  </h1>
          </ol>
        </Col>
        <Col className="d-flex justify-content-center align-items-center" lg={12}>
          <Form>
            <Form.Group onChange={hangeChange} controlId="exampleForm.ControlSelect1">
              <Form.Control as="select">
                <option value="">All listing</option>
                <option value="2nd-room">  Unit LA-0064</option>
                <option value="3rd-room">Unit LA-0065</option>
                <option value="4rd-room">Unit LA-0066</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Col className="d-flex justify-content-center align-items-center" lg={12}>
          <Calendar
            localizer={localizer}
            events={roomList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}

          />
        </Col>
      </Row>
    </Container>


  );
};
export default Index;


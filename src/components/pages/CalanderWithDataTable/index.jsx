
import React, { useEffect, useState, useContext } from "react";
import Context from "../../../context/Context";
import { Form, Row, Col, Container, Modal, Table, Button, Toast, Badge, Spinner } from 'react-bootstrap'
import "./style.css"
import CalendarActions from './actions/form-actions';
import { TableHeaders } from "./data/roomPriceList";
import { validate } from "../../../helpers/validation/form-validation";
const CalanderWithDataTable = () => {


  /* context api State*/
  const { state, changeAlertStatus, changeAlertMsg, changeModalStatus, changeLoadingStatus } = useContext(Context);
  /* context api ended */

  /* Conponent Internal State Start*/
  const [singleCell, setSingleCell] = useState({});
  const [loadData, setLoadData] = useState(true);
  const [roomPriceList, setRoomPriceList] = useState([]);
  /* Conponent Internal Ended */

  useEffect(() => {
    CalendarActions.GetData(function (data) {
      setRoomPriceList(data)
      setLoadData(false)
    })
  }, []);

  /* Conponent Internal Method   Start*/
  const hangeChange = (e) => {
    setSingleCell({
      ...singleCell,
      [e.target.name]: e.target.value
    });
  }
  const handleClickCell = (cellData, roomId) => {
    var data = cellData
    data["roomId"] = roomId
    setSingleCell(data)
    changeModalStatus(true)
  }
  const handleUpdate = () => {
    if (validate(singleCell?.price)) {
      var tempData = roomPriceList;
      tempData.forEach((element, index) => {
        if (element?.roomId === singleCell?.roomId) {
          element?.roomData?.forEach((subElement, subIndex) => {
            if (subElement?.cellId === singleCell?.cellId) {
              tempData[index].roomData[subIndex] = {
                price: singleCell.price,
                status: singleCell.status,
                cellId: singleCell.cellId
              }
            }
          });
        }
      })
      const data = {
        price: singleCell.price,
        status: singleCell.status,
        cellId: singleCell.cellId
      }
      changeLoadingStatus(true)
      /*api call start for Update*/
      CalendarActions.UpdateData(data, function (response) {
        if (response === "Record Updated") {
          setRoomPriceList(tempData);
          changeModalStatus(false)
          changeLoadingStatus(false)
          changeAlertStatus(true)
          changeAlertMsg("Your price and status has been updated successfully")
          setTimeout(() => {
            changeAlertStatus(false)
          }, 1500);
        }
        else {
          changeAlertStatus(true)
          changeAlertMsg("Network Error")
          setTimeout(() => {
            changeAlertStatus(false)
          }, 1500);
        }
      })
      /*api call Ended  */
    }
    else {
      changeAlertStatus(true)
      changeAlertMsg("Please Fill the Fields you can't post empty data")
      setTimeout(() => {
        changeAlertStatus(false)
      }, 1500);
    }
  }
  /* Conponent Internal Method   Start*/


  return (
    <Container fluid >
      {/* Toast for Alert Start */}
      {state?.showAlertBit ?
        <Toast className="toast-position">
          <Toast.Header>
            <strong className="mr-auto">Hotel Calendar</strong>
          </Toast.Header>
          <Toast.Body>{state?.alertMsg}</Toast.Body>
        </Toast> : null
      }
      {/* Toast for Alert Start Ended */}
      <Row className=" pt-2 ">
        {/* Header Start */}
        <Col lg={12}>
          <ol className="breadcrumb mb-4 d-flex justify-content-center">
            <h1 className="breadcrumb-item text-center active ">  Hotel Calendar  </h1>
          </ol>
        </Col>
        {/* Header Ended*/}

        {/*  Room Calendar Start */}
        {loadData ? <Col className="d-flex justify-content-center align-items-center text-center" lg={12}> <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner></Col> :
          <Col className="d-flex justify-content-center align-items-center" lg={12}>
            <Table responsive>
              <thead>
                <tr>
                  <th style={{ position: "sticky" }} className="d-flex justify-content-center ">Room</th>
                  {TableHeaders?.map((item, index) => (
                    <th className="ml-5" key={index}> {item.day} {item.date}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roomPriceList.map((item, index) => (
                  <tr
                    key={index}>
                    <td style={{ position: "sticky" }}>
                      <img src={item?.roomImageUrl} className="room-image" alt="room-1" />
                      <h5 className="d-flex justify-content-center mt-1">
                        <Badge variant="secondary">  {item?.roomName}</Badge>
                      </h5>
                    </td>
                    {item?.roomData?.map((subItem, subindex) => (
                      <td
                        className="table-cell"
                        onClick={() => { handleClickCell(subItem, item.roomId) }}
                        key={subindex}>
                        <Badge pill variant="info d-flex justify-content-center mt-4">
                          {subItem.price}$
                      </Badge>{' '}
                        {subItem.status === "Available" ? <Badge pill variant="success ">
                          {subItem.status}
                        </Badge> : <Badge pill variant="danger">
                            {subItem.status}
                          </Badge>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>}
        {/*  Room Calendar Ended */}
      </Row>
      {/*  Model For Update Data Start */}
      <Modal show={state?.showModal} onHide={() => { changeModalStatus(false) }}>
        <Modal.Header closeButton>
          <Modal.Title>Hotel Room Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="priceField">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" defaultValue={singleCell?.price} onChange={hangeChange} type="number" placeholder="Price" />
            </Form.Group>
            <Form.Group onChange={hangeChange} controlId="exampleForm.ControlSelect1">
              <Form.Label>Status  </Form.Label>
              <Form.Control name="status" defaultValue={singleCell?.status} as="select">
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="d-flex justify-content-center w-100" variant="secondary" onClick={() => { changeModalStatus(false) }}>
            Close
          </Button>
          <Button className="d-flex justify-content-center w-100" variant="primary" onClick={handleUpdate}>
            {state?.loading ?
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner> : "  Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  Model For Update Data Ended */}
    </Container>


  );
};
export default CalanderWithDataTable;


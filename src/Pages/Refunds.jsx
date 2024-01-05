import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Dropdown, Row, Table } from "react-bootstrap";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import Filter from "./Filter";
import FilterDetails from "./FilterDetails";
import { AccountAction } from "../Redux/Actions/AccountAction";
import { RefundFilterDetailsAction } from "../Redux/Actions/FilterDetailsAction";
import { RefundFilterAction } from "../Redux/Actions/RefundFilterAction";

const Refunds = () => {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const [showFD, setShowFD] = useState(false)
  const [tableData, setTableData] = useState([]);
  const [reservationNumber, setReservationNumber] = useState('');
  const [name, setName] = useState(false);
  const [booking, setBooking] = useState(false);
  const [reservation, setReservation] = useState(false);

  const [bookingDate, setBookingDate] = useState({
    from: '',
    to: ''
  });

  const [reservationDate, setReservationDate] = useState
  ({
    from: '',
    to: ''
  });

  const handleReservationNumberChange = (e)=>{
    setReservationNumber(e.target.value)
  }

  const handleBookingDateChange = (event, type) => {
    setBookingDate({
      ...bookingDate,
      [type]: event.target.value
    });
  };

  const handleReservationDateChange = (event, type) => {
    setReservationDate({
      ...reservationDate,
      [type]: event.target.value
    });
  };

  const handleFilter = () => {setShowFilter(true)};
  
  const filterSelector = useSelector((state) => state?.RefundFilterReducer?.filter?.data?.content);

  const handleFilterDetails = (id)=>{
    setShowFD(true)
    dispatch(RefundFilterDetailsAction(id))
  }
  const handleNameChange = () => {
    setName(true);
    setBooking(false);
    setReservation(false);
  };
  
  const handleReservationChange = () => {
    setName(false);
    setBooking(false);
    setReservation(true);
  };
  
  const handleBookingChange = () => {
    setName(false);
    setBooking(true);
    setReservation(false);
  };
  const formattedBookingFromDate = bookingDate.from ? moment(bookingDate.from).utc().toISOString() : '';
    const formattedBookingToDate = bookingDate.to ? moment(bookingDate.to).utc().toISOString() : '';
    const formattedReservationFromDate = reservationDate.from ? moment(reservationDate.from).utc().toISOString() : '';
    const formattedReservationToDate = reservationDate.to ? moment(reservationDate.to).utc().toISOString() : '';

  const handleFormSubmit = () => {
    
      dispatch(
        RefundFilterAction(
          reservationNumber,
          formattedBookingFromDate,
          formattedBookingToDate,
          formattedReservationFromDate,
          formattedReservationToDate,
          name,booking,reservation
        )
      );
      setShowFilter(false)
      }

  useEffect(() => {
    setTableData(filterSelector || []);
    dispatch(AccountAction());
    // eslint-disable-next-line
  }, [filterSelector]);

  useEffect(() => {
    return () => {
      setTableData([]);
    };
    
  }, []);

  useEffect(()=>{
    if(name || booking || reservation){
      dispatch(
        RefundFilterAction(
          reservationNumber,
          formattedBookingFromDate,
          formattedBookingToDate,
          formattedReservationFromDate,
          formattedReservationToDate,
          name,booking,reservation
        )
      );
    }
    // eslint-disable-next-line
  },[name, booking, reservation, formattedBookingFromDate, formattedBookingToDate, formattedReservationFromDate, formattedReservationToDate])

  return (
    <>
      <div className="container-fluid">
        <Row className="mt-4">
          <Col lg={10}>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb fs-16">
                <li className="breadcrumb-item text-muted cursor-pointer">
                  Refunds
                </li>
                <li className="breadcrumb-item active text-dark fw-bold">
                  Pending
                </li>
              </ol>
            </nav>
          </Col>
        </Row>
        <hr className="mt-1 w-100 opacity-25" />
        <Row className="d-flex flex-row align-items-center">
          <Col className="d-flex">
            <ul className="nav nav-pill bg-white rounded-4 p-1 justify-content-around cursor-pointer" id="refund">
              <div className="nav-link text-center text-white px-2 py-1 active" >
                Process
              </div>
              <div className="nav-link text-center px-2 py-1">Claim</div>
              <div className="nav-link text-center px-2 py-1">Past</div>
            </ul>
          </Col>

          <Col className="d-flex flex-row align-items-center justify-content-end gap-3">
            <div className="bg-white p-1 rounded-3">
              <Icon
                icon="mdi:filter"
                color="#de342f"
                className="fs-4"
                hFlip={true}
                onClick={handleFilter}
              />
            </div>
            <div className="bg-white  rounded-3 dropdown">
              <Dropdown className="refund-drop">
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="bg-white border-0 p-1 "
                >
                  <Icon
                    icon="tabler:sort-descending-2"
                    color="#de342f"
                    className="fs-4 bg-white"
                    hFlip={true}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleNameChange}>Name</Dropdown.Item>
                  <Dropdown.Item onClick={handleBookingChange}>Booked</Dropdown.Item>
                  <Dropdown.Item onClick={handleReservationChange}>Reservation Date</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="container">
        <Card className="border-0 rounded-4 mt-2">
          <CardBody className="py-0">
            <div className="row">
              <Table
                className="table table-spacing table-borderless"
                responsive="sm"
              >
                <thead>
                  <tr className="bg-white tableheadrow">
                    <th className="pb-0 text-nowrap ps-4">Reservation number</th>
                    <th className="pb-0">Name</th>
                    <th className="pb-0">Booking date</th>
                    <th className="pb-0 text-nowrap">Reservation date</th>
                    <th className="pb-0">Amount</th>
                    <th className="pb-0">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((fill, index) => (
                    <tr key={index}>
                      <td className="text-nowrap pe-5">
                        <label className="text-decoration-none cursor-pointer text-primary" onClick={()=>handleFilterDetails(fill?.refundId)}>{fill?.reservationNumber}
                      </label>
                      </td>
                      <td className="fs-6">{fill?.name}</td>
                      <td>{(moment(fill?.bookedOn)).format('MMMM Do, YYYY h A')}</td>
                      <td>{(moment(fill?.reservationDate)).format('MMMM Do, YYYY h A')}</td>
                      <td>$ {fill?.amount}</td>
                      <td>{fill?.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="mt-3"></div>
            </div>
          </CardBody>
        </Card>
      </div>
      <Filter showFilter={showFilter} setShowFilter={setShowFilter} handleFormSubmit={handleFormSubmit} bookingDate={bookingDate} reservationDate={reservationDate} reservationNumber={reservationNumber} handleBookingDateChange={handleBookingDateChange} handleReservationNumberChange={handleReservationNumberChange} handleReservationDateChange={handleReservationDateChange} />
      <FilterDetails showFD ={showFD} setShowFD = {setShowFD}/>
    </>
  );
};

export default Refunds;
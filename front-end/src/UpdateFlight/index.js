import { useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Breadcrumb,  TimePicker} from 'antd'
import './index.scss'

const UpdateFlight = () => {

    const flightNumberRef = useRef();
    const departureDateRef = useRef();
    const arrivalDateRef = useRef();
    const departureTimeRef = useRef();
    const arrivalTimeRef = useRef();
    const departureAirportRef = useRef();
    const arrivalAirportRef = useRef();
    const currentPassengersRef = useRef();
    const passengerLimitRef = useRef();
    
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8085/upd',
                {
                    flightNumber: flightNumberRef.current.value,
                    departureDate: departureDateRef.current.value,
                    arrivalDate: arrivalDateRef.current.value,
                    departureTime: departureTimeRef.current.value,
                    arrivalTime: arrivalTimeRef.current.value,
                    departureAirport: departureAirportRef.current.value,
                    arrivalAirport: arrivalAirportRef.current.value,
                    currentPassengers: currentPassengersRef.current.value,
                    passengerLimit: passengerLimitRef.current.value
                });
            navigate('', { replace: true });
        } catch (error) {
            console.log('Something Went Wrong');
        }
    }

    return (
        <>
            <Card
                title={
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Update</Breadcrumb.Item>
                    </Breadcrumb>
                }>

                <div className="container" >

                    <form className="well form-horizontal" id="update_form" onSubmit={handleSubmit}>
                        <fieldset>
                            
                            <legend><center><h2><b>Update Form</b></h2></center></legend>

                            <div className="form-group">
                                <label className="col-md-4 control-label">Flight Number</label>
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-plane"></i></span>
                                        <input id="flightNumber" placeholder="Flight Number" className="form-control" type="text" ref={flightNumberRef} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label" >Departure Date</label>
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                                        <input id="departureDate" className="form-control" type="date" placeholder="Departure Date" ref={departureDateRef} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label" >Arrival Date</label>
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
                                        <input id="arrivalDate" className="form-control" type="date" placeholder="Arrival Date" ref={arrivalDateRef} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label" >Departure Time</label>
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-time"></i></span>
                                        <input id="departureTime" className="form-control" type="time" placeholder="Departure Time" ref={departureTimeRef} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label" >Arrival Time</label>
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-time"></i></span>
                                        <input id="arrivalTime" className="form-control" type="time" placeholder="Arrival Time" ref={arrivalTimeRef} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label">Departure Airport</label>
                                <div className="col-md-4 selectContainer">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-export"></i></span>
                                        <select name="departureAirport" className="form-control selectpicker" ref={departureAirportRef}>
                                            <option value="">Select Departure Airport</option>
                                            <option>IAD</option>
                                            <option>ORD</option>
                                            <option >JFK</option>
                                            <option >LAX</option>                                            
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label">Arrival Airport</label>
                                <div className="col-md-4 selectContainer">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-import"></i></span>
                                        <select name="arrivalAirport" className="form-control selectpicker" ref={arrivalAirportRef}>
                                            <option value="">Select Arrival Airport</option>
                                            <option>IAD</option>
                                            <option>ORD</option>
                                            <option >JFK</option>
                                            <option >LAX</option>                                            
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label" >Current Passengers</label>
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                        <input id="currentPassengers" className="form-control" type="text" placeholder="Current Passengers" ref={currentPassengersRef} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label" >Passenger Limit</label>
                                <div className="col-md-4 inputGroupContainer">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                        <input id="passengerLimit" className="form-control" type="text" placeholder="Arrival Time" ref={passengerLimitRef} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-4 control-label"></label>
                                <div className="col-md-4">
                                    <button type="submit" className="btn btn-success" >SUBMIT <span className="glyphicon glyphicon-send"></span></button>
                                    <span  style={{ marginLeft: "20px" }}></span>
                                    <button type="reset" className="btn btn-warning" >RESET <span className="glyphicon glyphicon-refresh"></span></button>
                                </div>
                            </div>
                            
                        </fieldset>
                    </form>
                </div>
            
        </Card>
        </>
    );
}

export default UpdateFlight;
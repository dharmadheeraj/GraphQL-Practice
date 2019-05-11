import React,{ Component } from 'react';
import BookingListItem from "./BookingListItem";
import axios from 'axios';


class OwnerBookings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            booking: [],
            isbooking: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getownerbookings', {params: {id: this.props.userid}})
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    this.setState({booking: response.data.ans});
                    if(response.data.ans.length>0)
                    {this.setState({isbooking: true});}
                }

            })
    }


    render() {
        if (this.state.isbooking) {

            const PropertyItems = this.state.booking.map((property) => {
                return <BookingListItem key={property.booking_id} property={property}/>
            });


            return (
                <div className='row'>
                    <ul className="col-md-8 list-group">
                        {PropertyItems}
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div className='row'>
                    You have no Bookings listed
                </div>
            )
        }
    }
}

export default OwnerBookings;


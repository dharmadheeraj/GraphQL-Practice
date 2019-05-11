import React,{ Component } from 'react';
import BookingListItem from "./BookingListItem";
import axios from 'axios';
import {graphql} from "react-apollo";
import {getUserBookings, getUserProfile, searchAllQuery} from "../queries/queries";
import withApollo from "react-apollo/withApollo";
import cookies from "react-cookies";


class UserBookings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            booking: [],
            isbooking: false
        }
    }

    componentDidMount() {
        // axios.get('http://localhost:3001/getuserbookings', {params: {id: this.props.userid}})
        //     .then((response) => {
        //         if (response.status === 200) {
        //             console.log(response.data);
        //             this.setState({booking: response.data.ans});
        //             if(response.data.ans.length>0)
        //             {this.setState({isbooking: true});}
        //         }
        //
        //     })

        this.props.client.query({
            query:getUserBookings,
            variables:{
                user_id : cookies.load('userid')
            }}
        ).then((response) =>{
                    if (response.data) {
                        console.log(response.data);
                        console.log(JSON.stringify(response.data));
                        this.setState({booking: response.data.bookings});
                        if(response.data.bookings.length>0)
                        {this.setState({isbooking: true});}
                    }

                })

    }


    render() {
        if (this.state.isbooking) {

            const PropertyItems = this.state.booking.map((booking) => {
                return <BookingListItem key={booking.booking_id} property={booking}/>
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


export default graphql(getUserBookings)(withApollo(UserBookings));


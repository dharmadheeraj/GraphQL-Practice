import React ,{Component } from 'react';
import '../css/PropertyListItem.css';
import axios from "axios";
import cookie from "react-cookies";

class BookingListItem extends Component{


    constructor(props)
    {
        super(props);

        this.state = {
            thumbnail : ''
        }
    }

    componentDidMount()
    {
        // axios.post(`http://localhost:3001/getpropertypicsingle/${this.props.property.name}`)
        //     .then(response => {
        //         console.log("Imgae Res : ",response);
        //         let imagePreview = 'data:image/jpg;base64, ' + response.data;
        //         this.setState({
        //             thumbnail : imagePreview
        //         })
        //     })

    }

    render()
    {
        return(

            <li className='list-group-item'>
                <div className="card flex-md-row mb-4 shadow-sm h-md-250">
                    <div className="card-body d-flex flex-column align-items-start">
                        <strong className="d-inline-block mb-2 text-primary">{this.props.property.property.type}</strong>
                        <h3 className="mb-0">
                            <a className="text-dark" href="#">{this.props.property.property.name}</a>
                        </h3>
                        { (cookie.load('cookie') ==='owner') && (
                            <div className="mb-1 text-muted">Booked By : {this.props.property.username}</div>
                        )
                        }
                        <div className="mb-1 text-muted">Booking dates : {this.props.property.booked_from + ' - ' + this.props.property.booked_to}</div>
                        <a href="#">Price : {this.props.property.property.price} $</a>
                    </div>
                    <img className="card-img-right flex-auto d-none d-lg-block"
                         alt="Thumbnail [200x250]"
                         src={this.state.thumbnail}
                    />
                </div>

            </li>


        );
    }

}

export default BookingListItem;

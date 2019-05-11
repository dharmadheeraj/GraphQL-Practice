import React ,{Component } from 'react';
import '../css/PropertyListItem.css';
import Link from "react-router-dom/es/Link";
import axios from "axios";

class PropertyListItem extends Component{


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
                <strong className="d-inline-block mb-2 text-primary">{this.props.property.type}</strong>
                    <h3 className="mb-0">
                        <a className="text-dark" href="#">{this.props.property.name}</a>
                    </h3>
                <div className="mb-1 text-muted">{this.props.property.from_date + ' - ' + this.props.property.to_date}</div>
                <p className="card-text mb-auto">{ 'It is a ' + this.props.property.bed + ' Bed and ' + this.props.property.bath + ' bath luxary ' + this.props.property.type}</p>
                    <a href="#">Price : {this.props.property.price} $</a>
                    <a href="/"><Link to={ '/property/' + this.props.property.id + '/' + this.props.searchdata.from + '/' + this.props.searchdata.to}  params={{searchdata : this.props.searchdata}}>Details</Link></a>
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

export default PropertyListItem;

import React,{Component} from 'react';
import axios from "axios";
import Navbarhome from "./Navbarhome";
import '../css/PropertyPage.css';
import Redirect from "react-router-dom/es/Redirect";
import cookies from "react-cookies";
import {compose, graphql} from "react-apollo";
import withApollo from "react-apollo/withApollo";
import {bookProperty} from "../mutation/mutations";
import {getUserProfile, singleProperty} from "../queries/queries";



class PropertyPage extends Component{

    constructor(props)
    {
        super(props);

        this.state = {
            property: null,
            ownerid : '',
            num : '',
            name : '',
            bath: '',
            bed: '',
            capacity: '',
            from_date: '',
            place: '',
            price: '',
            to_date: '',
            type: '',
            images : [],
            booked : false

        }

        console.log("In Proppage propname : " + this.props.match.params.from);
        this.bookprop =  this.bookprop.bind(this);

    }

    bookprop = (e) =>
    {
        let data = {
            propid : this.props.match.params.id,
            from : this.props.match.params.from,
            to : this.props.match.params.to,
            user_id : cookies.load('userid'),
            owner_id : this.state.ownerid

        }

        this.props.client.mutate({
            mutation:bookProperty,
            variables :{
                property_id : this.props.match.params.id,
                from : this.props.match.params.from,
                to : this.props.match.params.to,
                user_id : cookies.load('userid'),
                owner_id : this.state.ownerid
            }
        }).then(res => {
        alert("Response" + JSON.stringify(res));
        console.log("Data: " + JSON.stringify(res.data));
    });


        // axios.post('http://localhost:3001/bookprop',data)
        //     .then( (response) => {
        //         if(response.status === 200)
        //         {
        //             this.setState (
        //                 {booked : true}
        //             )
        //         }
        //     })

    }

    async componentDidMount()
    {
       // await axios.get('http://localhost:3001/getsingle',{params: {id: this.props.match.params.id}})
       //     .then( (response) => {
       //
       //         return new Promise((resolve, reject) => {
       //             console.log("daat", response.data);
       //             this.setState({
       //                 ownerid : response.data.ans[0].owner_id,
       //                 num: response.data.ans[0].num,
       //                 name: response.data.ans[0].name,
       //                 bath: response.data.ans[0].bath,
       //                 bed: response.data.ans[0].bed,
       //                 capacity: response.data.ans[0].capacity,
       //                 from_date: response.data.ans[0].from_date,
       //                 place: response.data.ans[0].place,
       //                 price: response.data.ans[0].price,
       //                 to_date: response.data.ans[0].to_date,
       //                 type: response.data.ans[0].type,
       //                 property: true
       //             })
       //
       //             if (this.state.property) {
       //                 console.log('Resolved');
       //                 resolve();
       //             }
       //             else {
       //                 reject('not updated state');
       //             }
       //         })
       //     }).then ( () => {
       //         axios.post(`http://localhost:3001/getpropertypic/${this.state.name}`)
       //             .then( (response) => {
       //                 console.log("Imgae Res : ",response.data);
       //                 let imagePreview = 'data:image/jpg;base64, ' + response.data[1];
       //                 this.setState({
       //                     images : response.data
       //                 })
       //             })
       //             .catch((err) => {console.log(err);})
       //
       //                  })
       //     .catch((err) => {console.log(err);})

        this.props.client.query({
            query:singleProperty,
            variables:{
                id : this.props.match.params.id
            }}
        ).then((response)=> {
            if (response.data) {
                this.setState({
                    ownerid: response.data.singleProperty.owner_id,
                    id: response.data.singleProperty.id,
                    name: response.data.singleProperty.name,
                    bath: response.data.singleProperty.bath,
                    bed: response.data.singleProperty.bed,
                    from_date: response.data.singleProperty.from_date,
                    place: response.data.singleProperty.place,
                    price: response.data.singleProperty.price,
                    to_date: response.data.singleProperty.to_date,
                    type: response.data.singleProperty.type,
                    property: true
                });

            }
        });
    }


    render() {
        if (!cookies.load('cookie')) {
            return (
                <Redirect to='/Userlogin' />
            )
        }
        else {
            if (!this.state.booked) {
                if (this.state.property) {

                    /*let slider = '';
                    let images = '';
                    const pre = '<div className=\"carousel-item\"><img className=\"second-slide\" src=';
                    const post = ' /></div>';
                    for(let i=1;i< this.state.images.length;i++)
                    {
                        slider = slider + '<li data-target="#myCarousel" data-slide-to=' + i + ' className=""></li>';
                        let imagePreview = 'data:image/jpg;base64, ' + this.state.images[i];
                        images = images +  pre + imagePreview + post;
                        console.log('image : ' + images);
                        console.log('slider : ' + slider);
                    }*/

                    return (
                        <div>
                            {this.state.property}
                            <Navbarhome/>
                            <div className="row">
                                <div className="col-md-7">
                                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                                        <ol className="carousel-indicators">
                                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                                            <li data-target="#myCarousel" data-slide-to="1" className=""></li>
                                            <li data-target="#myCarousel" data-slide-to="2" className=""></li>
                                        </ol>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img className="first-slide"
                                                     src={'data:image/jpg;base64, ' + this.state.images[0]}
                                                     alt="First slide"/>

                                            </div>
                                            <div className="carousel-item">
                                                <img className="second-slide"
                                                     src={'data:image/jpg;base64, ' + this.state.images[1]}
                                                />
                                            </div>
                                            <div className="carousel-item">
                                                <img className="second-slide"
                                                     src={'data:image/jpg;base64, ' + this.state.images[2]}
                                                />
                                            </div>
                                        </div>
                                        <a className="carousel-control-prev" href="#myCarousel" role="button"
                                           data-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href="#myCarousel" role="button"
                                           data-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-3">

                                    <div className="container-property">
                                        <h2>{this.state.name}</h2>
                                        <hr></hr>
                                        <p>{'It is a ' + this.state.bed + ' Bed and ' + this.state.bath + ' bath luxury ' + this.state.type}</p>
                                        <h2>{this.state.price}</h2>
                                        <p>
                                            <button className="btn btn-secondary" onClick={(e) => this.bookprop(e)}
                                                    role="button">Book
                                            </button>
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )
                }
                else {
                    return (<div>
                            LOading.....
                        </div>
                    )
                }
            }
            else {
                alert('You have succesfully booked property : ' + this.state.name);
                return (
                    <Redirect to='/'/>
                )
            }
        }
        }
  }

export default compose(
graphql(singleProperty),
graphql(bookProperty)
)
(withApollo(PropertyPage));
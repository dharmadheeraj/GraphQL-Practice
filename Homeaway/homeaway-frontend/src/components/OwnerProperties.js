import PropertyListItem from "./PropertyListItem";
import React, {Component} from "react";
import cookies from "react-cookies";
import axios from "axios";
import cookie from "react-cookies";
import {compose, graphql, withApollo} from "react-apollo";
import {getPropertiesOwnerQuery, getUserProfile} from "../queries/queries";
import {updateProfile} from "../mutation/mutations";


class OwnerProperties extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            property : [],
            isproperty : false
        }
    }

    componentDidMount()
    {
        // axios.get('http://localhost:3001/getownerproperties',{params: {id: this.props.userid}})
        //     .then((response) =>{
        //         if(response.status === 200)
        //         {
        //             console.log(response.data);
        //             this.setState({property : response.data.ans});
        //             if(response.data.ans.length > 0)
        //             {
        //                 this.setState({isproperty : true});
        //             }
        //
        //         }
        //
        //     })

        this.props.client.query({
            query:getPropertiesOwnerQuery,
            variables:{
                id : cookies.load('userid')
            }}
        ).then((response)=>{
            if(response.data){
                this.setState({property : response.data.properties});
                            if(response.data.properties > 0)
                            {
                                this.setState({isproperty : true});
                            }
            }
    });
    }


    render()
    {
        if(this.state.isproperty)
        {
                //var arr = [];
                //for (var key in this.state.properties) {
                  //  arr.push(this.state.properties[key]);
                //}

                const PropertyItems = this.state.property.map((property) => {
                    return <PropertyListItem key={property.num} property={property} searchdata={false}/>
                });


                return (
                    <div className='row'>
                        <ul className="col-md-8 list-group">
                            {PropertyItems}
                        </ul>
                    </div>
                )
        }
        else
        {
           return(
               <div className='row'>
               You have no properties listed
                </div>
           )
        }
    }

}

export default  graphql(getPropertiesOwnerQuery)(withApollo(OwnerProperties));
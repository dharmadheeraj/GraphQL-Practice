import React,{Component} from 'react';
import PropertyListItem from './PropertyListItem.js';

class SearchResult extends Component
{

    render()
    {
        var arr = [];
        for (var key in this.props.properties) {
            arr.push(this.props.properties[key]);
        }

        const PropertyItems = arr.map((property) => {
            return <PropertyListItem key={property.num} property={property} searchdata={this.props.searchdata} />
        });


        if(PropertyItems) {
            return (
                <div className='row'>
                    <ul className="col-md-8 list-group">
                        {PropertyItems}
                    </ul>
                    <div className="col-md-4">
                        <img src={require('../images/maps.jpg')}/>
                    </div>
                </div>
            )
        }
        else
        {
            return(
                <div className='row'>
                <ul className="col-md-8 list-group">
                    You Search will be loading here.
                </ul>
            </div>
            )
        }
    }
}

export default SearchResult;
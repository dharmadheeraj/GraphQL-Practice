import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import React,{ Component} from 'react';
import '../css/landing.css';
import SearchResult from "./SearchResult";


class LandingPage extends Component{

    constructor(props)
    {
        super(props);

        this.state = {
            properties : [],
            searchdata : {},
            success : false
        }

        console.log('Searchdata LAnding page: ' + this.state.searchdata);
        console.log('Prop Len: ' + this.state.properties.length);

    }

    render()
    {

        return(
            <div>
            <div className="jumbotron jumbotron-fluid">
                 <Navbar />
                <Searchbar
                    properties={ properties => this.setState({properties : properties})}
                    searchdata={searchdata => this.setState({searchdata : searchdata})}
                    success={() => this.setState({success : true})}/>

            </div>
                { (this.state.properties.length >0)  && (
                    <SearchResult
                    properties={this.state.properties}
                searchdata = {this.state.searchdata} />
                )}
                { (this.state.success && this.state.properties.length < 1)  && (
                    <div>
                        No Records found matching the search
                    </div>
                )}



            </div>
        )
    }
}

export default LandingPage;

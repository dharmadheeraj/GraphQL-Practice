import React, { Component } from 'react';

class ImageGenerator extends Component {

    constructor(props)
    {
        super(props);
    }
    componentDidMount(){

        console.log('Image Props: ' + this.props.images);
        //console.log('data:image/jpg;base64, ' + this.props.images[1]);
    }
    render()
    {
       /* let slider = '';
        let images = '';
        const pre = '<div className=\"carousel-item\"><img className=\"second-slide\" src=';
        const post = ' /></div>';
        for(let i=1;i< this.props.images.length;i++)
        {
            slider = slider + '<li data-target="#myCarousel" data-slide-to=' + i + ' className=""></li>';
            let imagePreview = 'data:image/jpg;base64, ' + this.props.images[i];
            images = images +  pre + imagePreview + post;
            console.log('image : ' + images);
            console.log('slider : ' + slider);
        }


        return(

            <div id="myCarousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    {slider}
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="first-slide"
                             src={'data:image/jpg;base64, ' + this.props.images[0]}
                             alt="First slide" />

                    </div>
                    {images}
                </div>
                <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

        )*/
       return(
           <div>

           </div>
       )
    }
}

export default ImageGenerator;
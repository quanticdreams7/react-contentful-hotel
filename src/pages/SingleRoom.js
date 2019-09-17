import React, { Component } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import {RoomContext} from '../context';
import StyledHero from '../components/StyledHero'

export default class SingleRoom extends Component {

    constructor(props) {
        super(props);
        // console.log('props', this.props)
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg
        };
    }

    componentDidMount(){

    }

    // access context via class
    static contextType = RoomContext;

    render() {
        // destructure getRoom fn from context.js
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        // console.log('singleRoom', room);

        // because if you dont' do this you get undefined in console.
        if(!room){
            return <div className="error">
                <h3>no such room could be found</h3>
                <Link className="btn-primary" to="/rooms">
                    back to rooms
                </Link>
            </div>
        }

        //div render part for if the room is defined
        const {name, description, capacity, size, price, extras, breakfast, pets, images} = room;
        
        // get 3 images
        const [mainImg, ...defaultImg] = images;

        
        return (
            // <Hero 
            //     hero='roomsHero'
            // >
            //     <Banner
            //         title={`${name} room`}
            //     >
            //         <Link className="btn-primary" to='rooms'>
            //             Back to rooms
            //         </Link>
            //     </Banner>      
             // not good practice because everytime  data changes you have to change css. -> use styled components instead so we can insert data dynamically --> 

            // </Hero>

            <>

                <StyledHero 
                    img={mainImg || this.state.defaultBcg}
                >
                    <Banner
                        title={`${name} room`}
                    >
                        <Link className="btn-primary" to='/rooms'>
                            Back to rooms
                        </Link>
                    </Banner>       

                </StyledHero>
                <section className="single-room">
                    <div className="single-room-images">
                        {/* 4 images */}
                        {/* {images.map((item, index) => {
                            return <img key={index} src={item} alt={name}/>; 
                        })} */}
                        {defaultImg.map((item, index) => {
                            return <img key={index} src={item} alt={name}/>; 
                        })}
                    </div>
                    <div className="single-room-info">
                        <article className="description">
                            <h3>Details</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>info</h3>
                            <h6>price: ${price}</h6>
                            <h6>size: ${size} SQFT</h6>

                            <h6>
                                max capacity : {" "} {
                                capacity.length > 1 ? `${capacity} people` : `${capacity} person`
                                }
                            </h6>
                            <h6>
                                {pets ? "pets allowed" : "no pets allowed"}
                            </h6>
                            {/* if breakfast is true, then get the string, otherwise if its false then you don't render that  */}
                            <h6>{breakfast && "free breakfast included"}</h6>
                        </article>
                    </div>
                </section>
                <section className="room-extras">
                    <h6>extras</h6>
                    <ul className="extras">
                        {extras.map((item, index) => {
                            return <li key={index}>- {item}</li>
                        })}
                    </ul>
                </section>
            </>  
        )
    }
}

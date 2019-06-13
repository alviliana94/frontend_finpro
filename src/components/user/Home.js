import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import "../carouselHome.css";

class Home extends Component {
    state = {
        image: [],
        transport: undefined,
        choose : 0
    };

    componentDidMount() {
        this.getImage();
        this.getImageTransport();
    }

    getImage = () => {
        axios.get("http://localhost:1995/home/show").then(res => {
            this.setState({ image: res.data });

        });
    };
    getImageTransport = async() => {
        await axios.get("http://localhost:1995/transport").then(res => {
            this.setState({ transport: res.data });
        });
    };

    chooseImage = (id) => {
        this.setState({choose:id})
    }
    renderImageTransport = () => {;
        
        
        return this.state.transport.map(item => {
            if(item.id !== this.state.choose){
                return(
                <label className="image-checkbox" >
                    <img className="img-responsive" src={item.transport_image} alt={item.transport_name} onClick={() => {this.chooseImage(item.id)}}/>
                </label>
                )
            }
                    return(
                    <label className="image-checkbox-checked" >
                        <img className="img-responsive" src={item.transport_image} alt={item.transport_name} onClick={() => {this.chooseImage(item.id)}}/>
                    </label>
                    )
            
        })
    }


    // renderList = () => {
    //     return this.state.productSearch.map(items => {
    //         return <ProductItems item={items} />;
    //     });
    // };
    render() {
        const settings = {
            dots: true,
            autoplay: true,
            infinite: true,
            slidesToShow: 2,
            slidesToScroll: 1
        };
        if(this.state.transport !== undefined){

            return (
                <div>
                    <div>
                        {/* NAVBAR */}
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="navbar-nav align-item-center">
                                <Link className="mr-4" to="/planeticket">
                                    <span className="align-content-center">
                                        <i class="fas fa-plane" />
                                    </span>
                                    <span className="ml-1 align-content-center text-dark">
                                        Pesawat
                  </span>
                                </Link>
    
                                <Link className="mr-4" to="/trainticket">
                                    <span className="align-content-center">
                                        <i class="fas fa-train" />
                                    </span>
                                    <span className="ml-1 align-content-center text-dark">
                                        Kereta Api
                  </span>
                                </Link>
    
                                <Link className="mr-4 mb-2" to="/trainticket">
                                    <span className="align-content-center">
                                        <i class="fas fa-bus" />
                                    </span>
                                    <span className="ml-1 align-content-center text-dark ">
                                        Bus
                  </span>
                                </Link>
                            </div>
                        </nav>
                        <div className="container-fluid">
                            <div className="row carousel mx-auto">
                                <Slider {...settings}>
                                    {this.state.image.map(item => {
                                        return (
                                            <img src={item.image} alt="HOMEIMAGE" />
                                        )
                                    })}
                                </Slider>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-10 card home mx-auto">
                                    <div className="card-header home d-flex justify-content-between">
                                        <p className="pl-4 pt-4 lead">Hey, Kamu Siapa??</p>
                                        <div className="pr-4 pt-4">
                                            {this.renderImageTransport()}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                    </div>
                                </div>
    
                            </div>
    
                        </div>
                    </div>
                </div >
            );
        }else{
            return(
                <h1>Loading</h1>
            )
        }
    }
}

export default Home;

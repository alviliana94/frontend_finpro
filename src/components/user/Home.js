import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Slider from 'react-slick';
import swal from '@sweetalert/with-react';
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import "../carouselHome.css";

class Home extends Component {
    state = {
        image: [],
        transport: undefined,
        city: [],
        searchCity: [],
        choose: 0,
        startDate: moment(),
        price: 0,
        additional: false,
        food:0,
        carrier:0
    };

    // handleChange(date) {
    //     this.setState({
    //       startDate: date
    //     });
    //   }

    componentDidMount() {
        this.getImage();
        this.getImageTransport();
        this.getCity();
    }

    getImage = () => {
        axios.get("http://localhost:1995/home/show").then(res => {
            this.setState({ image: res.data });

        });
    };
    getImageTransport = async () => {
        await axios.get("http://localhost:1995/transport").then(res => {
            this.setState({ transport: res.data });
        });
    };

    getCity = async () => {
        await axios.get(`http://localhost:1995/city`).then(res => {
            this.setState({ city: res.data.result, searchCity: res.data.result2 })
        })
    }

    renderCity = () => {
        return this.state.searchCity.map(item => {
            return (
                <option value={item.kabupaten}>{item.kabupaten}</option>
            )
        })
    }

    searchingCityOrigin = () => {
        const search = this.inputCityOrigin.value

        if (search.length > 1) {
            var arrSearch = this.state.city.filter(item => {
                return item.kabupaten.toLowerCase().includes(search);
            });
            this.setState({ searchCity: arrSearch });
        }
    }
    searchingCityDestination = () => {
        const search = this.inputCityDestination.value

        if (search.length > 1) {
            var arrSearch = this.state.city.filter(item => {
                return item.kabupaten.toLowerCase().includes(search);
            });
            this.setState({ searchCity: arrSearch });
        }
    }

    getPrice = async () => {
        const transport = this.state.choose
        const pets = this.pet.value
        const sizes = this.size.value
        const foods = this.state.food
        const carrier = this.state.carrier
        
        await axios.get(`http://localhost:1995/price/${pets}/${transport}/${sizes}`).then(res => {
            this.setState({ price: res.data[0].price })
            if(this.state.additional !== false){
                if (foods !== 0){
                    axios.get(`http://localhost:1995/price/${foods}/${transport}/${sizes}`).then(res =>{
                        this.setState({price:this.state.price + res.data[0].price})
                    })
                }
                if(carrier !== 0){
                    axios.get(`http://localhost:1995/price/${carrier}/${transport}/${sizes}`).then(res =>{
                        this.setState({price:this.state.price + res.data[0].price})
                    })
                }
            }

        })
    }

    booking = () => {
        const price = this.state.price
        const origin = this.inputCityOrigin.value
        const destination = this.inputCityDestination.value
        var pet = ''  
        if(this.pet.value == 1){
            pet = 'Anjing'
        }else if(this.pet.value == 2){
            pet = 'Kucing'
        }else if(this.pet.value == 3){
            pet = 'Kelinci'
        }else{
            pet = 'Burung'
        }
        var size = '' 
        if(this.size.value === 1){
            size = 'Kecil'
        }else if(this.size.value === 2){
            size = 'Sedang'
        }else{
            size = 'Besar'
        }
        var transport = ''
        if(this.state.choose === 1){
            transport = 'Pesawat'
        }else if(this.state.choose === 2){
            transport = 'Kereta'
        }else{
            transport = 'Bus'
        }
        const date = new Date(this.date.value).toDateString() 

        swal(
            <div>
                <p>Kamu mau kirim</p>
                <p>{pet} , {size} , pake {transport} </p>
                <p>Dari :</p>
                <p><i class="fas fa-map-marker-alt"></i> {origin} </p>
                <p>Ke :</p>
                <p> <i class="fas fa-map-marker-alt"></i> {destination} </p>
                <p>Tanggal : {date} </p>
                <p>Total Biayanya jadi Rp {price.toLocaleString()} </p>
            </div>
        )
    }

    additional = () => {
        this.setState({additional:!this.state.additional})
        const food = document.getElementById("tambahan")
        if(this.state.additional === false){
            food.setAttribute('style','display:block')
        }else if(this.state.additional === true){
            food.setAttribute('style','display:none')
        }
    }
    getFoodValue(event) {
        this.setState({food:event.target.value})
    }
    getCarrierValue(event) {
        this.setState({carrier:event.target.value})
    }

    cekOmbak = () => {
        
        if (this.state.choose !== 0 && this.pet.value !== undefined && this.size.value !== undefined) {
            return (
                <div className="row mt-5">
                    <div className="col">
                        <input type="text" value={`Rp ` + this.state.price.toLocaleString()} className="form-control" disabled />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-outline-primary" onClick={this.getPrice}>Cek Harga</button>
                    </div>

                </div>
            )
        }
                return (
                    <div className="row mt-5">
                        <div className="col">
                            <input type="text" value={`Rp ` + this.state.price.toLocaleString()} className="form-control" disabled />
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-outline-primary" onClick={this.getPrice} disabled >Cek Harga</button>
                        </div>
                    </div>
                )
    }

    chooseImage = (id) => {
        this.setState({ choose: id })
    }

    calendarOnChange = date => this.setState({ date })

    renderImageTransport = () => {
        
        return this.state.transport.map(item => {
            if (item.id !== this.state.choose) {
                return (
                    <label className="image-checkbox" >
                        <img className="img-responsive" src={item.transport_image} alt={item.transport_name} onClick={() => { this.chooseImage(item.id) }} />
                    </label>
                )
            }
            return (
                <label className="image-checkbox-checked" >
                    <img className="img-responsive" src={item.transport_image} alt={item.transport_name} onClick={() => { this.chooseImage(item.id) }} />
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
        if (this.state.transport !== undefined) {
            var d = new Date()
            

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
                        <div style={{ marginTop: 50 }}>
                            <div className="row">
                                <div className="col-10 card home mx-auto">
                                    <div className="card-header home d-flex justify-content-between">
                                        <p className="pl-4 pt-4 lead">Hei kamu <br /><strong className="text1">Mau Kirim Kemana?</strong></p>
                                        <div className="pr-4 pt-4">
                                            {this.renderImageTransport()}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p style= {{fontSize:"20px"}}>Cari Harga Di Sini</p>
                                        <div className="row">
                                            <div className="col form-group">
                                                <label for="city">Dari</label>
                                                <input list="city" ref={input => { this.inputCityOrigin = input }} type="text" className="fa form-control border border-light" onKeyUp={this.searchingCityOrigin} placeholder="&#xf3c5; Mau Kirim Darimana?" />
                                                <datalist className="form-control d-none" id="city">
                                                    {this.renderCity()}
                                                </datalist>
                                                <label className='mt-4'>Tanggal Pengiriman</label>
                                                <input type="date" min={d.toISOString().split('T')[0]} defaultValue={d.toISOString().split('T')[0]} className="form-control" ref={input=>{this.date = input}} />
                                            </div>
                                            <div className="col">
                                                <label for="city">Ke</label>
                                                <input list="city" ref={input => { this.inputCityDestination = input }} type="text" className="fa form-control border border-light" onKeyUp={this.searchingCityDestination} placeholder="&#xf3c5; Mau kirim kemana?" />
                                                <datalist className="form-control d-none" id="city">
                                                    {this.renderCity()}
                                                </datalist>
                                                <div className="row">
                                                    <div className="col-5">
                                                        <label className="mt-4" for="sell">Jenis Hewan</label>
                                                        <select className="form-control" id="sell" ref={input => { this.pet = input }} defaultValue="">
                                                            <option value="" disabled>Pilih jenis hewan</option>
                                                            <option value="1">Anjing</option>
                                                            <option value="2">Kucing</option>
                                                            <option value="3">Kelinci</option>
                                                            <option value="4">Burung</option>
                                                        </select>
                                                    </div>
                                                    <div className="col">
                                                        <label className="mt-4" for="sell">Size Hewan</label>
                                                        <select className="form-control" id="sell" ref={input => { this.size = input }} defaultValue="">
                                                            <option value="" disabled>Pilih size hewan</option>
                                                            <option value="1">Kecil</option>
                                                            <option value="2">Sedang</option>
                                                            <option value="3">Besar</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <label className="mt-4 ">
                                                Pilih Tambahan
                                                <input type="checkbox" className="form-check-input ml-3" onChange={this.additional}  />
                                                </label>
                                                <div className="form-check" id="tambahan" style={{display:'none'}}>
                                                    <label className="form-check-label">
                                                        <input type="checkbox" className="form-check-input" value="1"  onClick={this.getCarrierValue.bind(this)} />
                                                        Kandang
                                                     </label>
                                                    <label className="form-check-label ml-5">
                                                        <input type="checkbox" className="form-check-input" value="2" onClick={this.getFoodValue.bind(this)} />
                                                        Makanan
                                                     </label>
                                                </div>
                                            </div>
                                        </div>
                                        {this.cekOmbak()}
                                        <div className="row pt-3">
                                            <div className="col">
                                            </div>
                                            <div className="col-auto">
                                                <button className="btn btn-warning" onClick={this.booking}>BOOK</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <div className="row">
                                        <i className="fas fa-business-time fa-2x" />
                                    </div>
                                    <span></span>
                                </div>
                                <div className="col-6">

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            );
        } else {
            return (
                <h1>Loading</h1>
            )
        }
    }
}

export default Home;

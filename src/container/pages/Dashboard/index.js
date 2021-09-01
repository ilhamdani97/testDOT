import React, { Component } from 'react';
import {
    Footer,
    H1,
    H3,
    H4,
    TextBody,
    Button,
    Input,
    Popup,
    Notification
    
} from '../../../components';

import Background from '../../../assets/images/banner/bg-desktop.png';
import BackgroundMobile from '../../../assets/images/banner/bg-mobile.png';

import classname from 'classnames';
import PropTypes from 'prop-types';
// style
import './styles.scss';

//api
import { getProvice, getCityWithId, getResi } from '../../../services';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
          dataProvince: [],
          dataCity: [],
          dataResi: [],
          dataKurir: [
            {
                "value": "jne",
                "label": "JNE"
            },
            {
                "value": "pos",
                "label": "POS Indonesia"
            },
            {
                "value": "jnt",
                "label": "JNT"
            },
            {
                "value": "sicepat",
                "label": "SiCepat"
            },
            {
                "value": "tiki",
                "label": "Tiki"
            },
            {
                "value": "anteraja",
                "label": "AnterAja"
            },
            {
                "value": "wahana",
                "label": "Wahana"
            },
            {
                "value": "ninja",
                "label": "Ninja"
            },
            {
                "value": "lion",
                "label": "Lion"
            },
          ],
          valueResi: '',
          valueKurir: '',
          popupShow: false,
          notif: '',
          message: '',
          isLoading: false
        };

        this.handleChangeResi = this.handleChangeResi.bind(this);

    }
    
    componentDidMount() {
        this.getDataProvince();
    }
    
    componentWillUnmount() {}


    getDataProvince = () => {
        getProvice()
        .then((res)=> {
            console.log("resss", res)
            let options = res.data.value.map(function (city) {
                return { value: city.id, label: city.name };
            })
            this.setState({
                dataProvince: options
            })
        }) .catch((err) => {
            throw err;
        });
    }

    handleChangeProvince = (event) => {
        console.log('value', event.label)
        getCityWithId(`&id_provinsi=${event.value}`)
        .then((res)=> {
            console.log('value', res)
            let options = res.data.value.map(function (city) {
                return { value: city.id, label: city.name };
            })
            this.setState({
                dataCity: options,
            })
        }).catch((err) => {
            throw err;
        });
    }

    handleChangeKurir = (event) => {
        this.setState({valueKurir: event.value})
    }

    handleChangeResi(event) {
        this.setState({ valueResi: event.target.value });
    }

    handleShowPopup = (target, status) => {
        this.setState({
          [target]: !status
        });
    };
    
    handleClosePopup = (target, status) => {
        this.setState({
            [target]: !status
        });
    };

    handelCekResi = (event) => {
        const {
            handleShowPopup,
            state:{
                popupShow,
                valueKurir,
                valueResi
            }
        
        } = this

        this.setState({
            isLoading: true
        })

        if(valueResi.length === 0 || valueKurir.length === 0 ) {
            this.setState({
                notif: 'error',
                isLoading: false,
                message: 'Kurir atau Resi Tidak Boleh Kosong'
            })
        }

        getResi(`&courier=${valueKurir}&awb=${valueResi}`)
        .then((res) => {
            console.log('resi', res)

            if(res != undefined) {
                this.setState({
                    dataResi: res.data.data,
                    isLoading: false
                })

                
                handleShowPopup('popupShow', popupShow)
            } else {
                this.setState({
                    notif: 'error',
                    message: 'Data Tidak Ditemukan',
                    isLoading: false
                })
            }

        }).catch((err) => {
            console.log(err)
        });


        event.preventDefault();
    }

    render() {
        const nextClass = classname('inner-container', {});
        const classNames = classname('o-dashboard', {});
        const {
            handleChangeProvince,
            handleChangeResi,
            handelCekResi,
            handleClosePopup,
            handleChangeKurir,
            state: {
                dataProvince, 
                dataCity, 
                dataKurir,
                valueResi,
                popupShow,
                notif,
                message,
                dataResi,
                isLoading
                
            }
        } = this
        return (
            <div className={nextClass}>
                <Popup
                    showPopup={popupShow}
                    onClickClosePopup={() => handleClosePopup('popupShow', popupShow)}
                    >
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <TextBody color="black" weight="light">
                                    No.Resi
                                </TextBody>  
                                <H4 color="black" weight="black">
                                    {dataResi.summary && dataResi.summary.awb}
                                </H4>
                            </div>
                            <div className="col-sm-4">
                                <TextBody color="black" weight="light">
                                    Status
                                </TextBody>  
                                <H4 color="black" weight="black">
                                    {dataResi.summary && dataResi.summary.status}
                                </H4>
                            </div>
                            <div className="col-sm-4">
                                <TextBody color="black" weight="light">
                                    Penerima
                                </TextBody>  
                                <H4 color="black" weight="black">
                                    {dataResi.detail && dataResi.detail.receiver}
                                </H4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <TextBody color="black" weight="black">
                                    History
                                </TextBody> 
                                {dataResi && dataResi.history && dataResi.history.map((item, index) => (
                                    <TextBody color="black" weight="light">
                                        {`${item.date} - ${item.desc}`}
                                    </TextBody>  
                                ))}
                               
                            </div>
                            
                        </div>
                    </div>
                    
                                      
                </Popup>
                <div className={classNames}>
                    <div className="o-dashboard__image-wrapper o-card-dashboard__image-wrapper--d">
                        <img src={Background} alt="bg" />
                    </div>
                    <div className="o-dashboard__image-wrapper o-card-dashboard__image-wrapper--m">
                        <img src={BackgroundMobile} alt="bg" />
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 dashboard-title">
                                <H1 weight="bold" color="white" className="desktop-only">
                                    DOT KURIR
                                </H1>
                                <Notification status={notif} title={message} />
                                <form onSubmit={handelCekResi}>
                                    <div className="title-content">
                                        Silahkan masukkan Data Asal Pengiriman
                                    </div>
                                    <Input
                                        type="select"
                                        id="provinceAsal"
                                        placeholder="Pilih Provinsi"
                                        title="Provinsi"
                                        optionSelect={dataProvince}
                                        handleChange={handleChangeProvince}
                                    />
                                    <Input
                                        type="select"
                                        id="kabAsal"
                                        placeholder="Pilih Kabupaten atau Kota"
                                        title="Kabupaten atau Kota"
                                        isDisable = {dataCity.length ? false : true}
                                        optionSelect = {dataCity}
                                    />
                                    <div className="title-content">
                                        CEK RESI 
                                    </div>
                                    <Input
                                        type="select"
                                        id="kurir"
                                        placeholder="Pilih Kurir"
                                        title="Kurir"
                                        optionSelect = {dataKurir}
                                        handleChange={handleChangeKurir}
                                    />
                                
                                    <Input
                                        type="text"
                                        id="resi"
                                        placeholder="Masukkan Nomor Resi"
                                        title="Nomor Resi"
                                        handleChange={handleChangeResi}
                                        value={valueResi}
                                    />

                                    <Button variant="primary" type="submit">{isLoading ? 'Mohon tunggu ...' : 'Cek Resi'}</Button>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        );
    }
}

Dashboard.propTypes = {
    history: PropTypes.instanceOf(Object)
};
  
Dashboard.defaultProps = {
    history: { push: '/' }
};
export default Dashboard;


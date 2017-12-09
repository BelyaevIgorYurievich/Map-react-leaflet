import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import './style.less';
import { TileLayer, Map, MapControl, FeatureGroup } from 'react-leaflet';
import WrappedMarker from './WrappedMarker.js';
import LegendControl from './LegendControl.js';
import axios from 'axios';
import { EditControl } from 'react-leaflet-draw';

class SimpleExample extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 54.521764,
      lng: 36.281347,
      zoom: 10,
      geoObjects: [],
      quantityGeoObj: 0
    };
  }

  changeQuantityGeoObj = (type) => (event) => {
    const {quantityGeoObj} = this.state;
    event.stopPropagation();
    
    if (type === 'add') {

      this.setState({quantityGeoObj: quantityGeoObj + 1});
      return;
    }
    
    if (!this.state.quantityGeoObj) return;

    this.setState({quantityGeoObj: quantityGeoObj - 1});
  };


  addData = () => {
    const {quantityGeoObj} = this.state;
    
    if(!quantityGeoObj) return;

    axios.get(`http://itd-121.ru/figuresapi.php?figures=${quantityGeoObj}`).then(({data}) => {
      // Так-как решения для смены центра я не нашел
      // пришлось всегда немого менять центр (Math.random() * 0.00001)
      // так-как если деать lat: 54.521764, центр меняется только один раз  
      this.setState({
        geoObjects: data,
        lat: 54.521764 + Math.random() * 0.00001,
        lng: 36.281347 + Math.random() * 0.00001,
      });

      const geoObjects = JSON.stringify(data);

      localStorage.setItem('geoObjects', geoObjects);
    });
  };

  changeInputValue = (event) => { 
    let quantityGeoObj = +event.target.value;

    if (typeof(quantityGeoObj) !== 'number' || isNaN(quantityGeoObj)) {
       return alert('Разрешено вводить только цифры');
    }
    
    quantityGeoObj = Math.round(quantityGeoObj);

    this.setState({quantityGeoObj});
  };

  componentDidMount() {

    const geoObjects = JSON.parse(localStorage.getItem('geoObjects'));
    
    if (typeof(geoObjects) === 'object' && geoObjects) {
      const quantityGeoObj = geoObjects.length;

      this.setState({geoObjects, quantityGeoObj});
    }
  }

  render() {

    const position = [this.state.lat, this.state.lng];
    const {quantityGeoObj,zoom} = this.state;

    return (
      <div className='app-wrapper'>
        <div className='modal-window'>
          <p>Количество объектов</p>
          <input onChange={this.changeInputValue}
           value={quantityGeoObj}
           />
        </div>
        <Map center={position} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
          <WrappedMarker geoObjects={this.state.geoObjects}/>
          <LegendControl className="supportLegend">
            <div className='button-block'>
              <button className="control-bts" style={{borderBottom:"1px solid #ccc"}} onClick={this.addData}>↻</button>
              <button className="control-bts" style={{borderBottom:"1px solid #ccc"}} onClick={this.changeQuantityGeoObj('add')}>+</button>
              <button className="control-bts" style={{borderBottom:"1px solid #ccc"}} onClick={this.changeQuantityGeoObj('subtract')}>-</button>
            </div>
          </LegendControl>
          <FeatureGroup>
            <EditControl
              position='topleft'
              draw={{
                rectangle: false
              }}
            />
        </FeatureGroup>
        </Map>
      </div>
    )
  }
}   

export default SimpleExample;
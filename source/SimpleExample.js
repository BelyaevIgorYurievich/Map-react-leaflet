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

    this.setState({quantityGeoObj: quantityGeoObj - 1});
  }


  addData = () => {
    const {quantityGeoObj} = this.state;
    
    if(!quantityGeoObj) return;

    axios.get(`http://itd-121.ru/figuresapi.php?figures=${quantityGeoObj}`).then(({data}) => {
      this.setState({geoObjects: data});
    });
  };

  render() {

    const position = [this.state.lat, this.state.lng];
    const {quantityGeoObj} = this.state;

    return (
      <div className='app-wrapper'>
        <div className='modal-window'>
          кол-во объектов
          <input readOnly value={quantityGeoObj}/>
        </div>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
          <WrappedMarker geoObjects={this.state.geoObjects}/>
          <LegendControl className="supportLegend">
            <div className='button-block'>
              <button onClick={this.addData}>Обновть карту</button>
              <button onClick={this.changeQuantityGeoObj('add')}>+</button>
              <button onClick={this.changeQuantityGeoObj('subtract')}>-</button>
            </div>
          </LegendControl>
          <FeatureGroup>
            <EditControl
              position='topright'
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
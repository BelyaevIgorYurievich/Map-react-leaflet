import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import './style.less';
import { Map, Marker, Popup, Circle, Polygon, Polyline,  } from 'react-leaflet';

const CORRECTION_FACTOR_CIRCLE = 1000;
const CORRECTION_FACTOR_POLYGON_Y = 0.003;
const CORRECTION_FACTOR_POLYGON_X = 0.001;

class WrappedMarker extends React.Component {

  render() {

    const geoObjects = this.props.geoObjects.map((el,index) => {
      switch(el.type) {
        case 'circle':
          return (
            <Circle key={index} center={[el.x,el.y]} 
              radius={el.radius * CORRECTION_FACTOR_CIRCLE} 
              color={el.color}
            >
              <Popup>
                <span>{el.name}</span>
              </Popup>
            </Circle>
          );
        case "point":
          return (
            <Marker key={index} position={[el.x,el.y]}>
              <Popup>
                <span>{el.name}</span>
              </Popup>
            </Marker>
          );
        case "polygon":
          let pointsPolygon = [];
          el.x.forEach((point, index) => {
            pointsPolygon.push([point + index * CORRECTION_FACTOR_POLYGON_X, el.y[index] + index * CORRECTION_FACTOR_POLYGON_Y]);
          });

          return (
            <Polygon key={index} positions={pointsPolygon} color={el.color}>
              <Popup>
                <span>{el.name}</span>
              </Popup>
            </Polygon>
          );
        case "polyline":
          let pointsPolyline = [];
          el.x.forEach((point, index) => {
            pointsPolyline.push([point + index * CORRECTION_FACTOR_POLYGON_X, el.y[index] + index * CORRECTION_FACTOR_POLYGON_Y]);
          });

          return (
            <Polyline key={index} positions={pointsPolyline} color={el.color}>
              <Popup>
                <span>{el.name}</span>
              </Popup>
            </Polyline>
          );
      }
    });
    return (
      <div> 
          {geoObjects}
      </div>
    )
  }
}

export default WrappedMarker;

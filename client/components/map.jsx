import React from 'react';
import MapContainer from './MapContainer.jsx'
let GoogleMapsAPIKEY = require('../../config.js').GoogleMapsAPIKey;

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="map-section">
        <div>Map Placeholder</div>
        <div>LONG: {this.props.long}</div>
        <div>LAT: {this.props.lat}</div>
        {/* <MapContainer 
          isMarkerShown 
          lat={this.props.lat} 
          long={this.props.long} 
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPIKEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `350px`, width: `595px` }} />}
          mapElement={<div style={{ height: `100%` }} />} 
        /> */}
        <div>Exact location information is provided after a booking is confirmed.</div>
      </div>
    )
  }
}

export default Map;

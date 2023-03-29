import React from 'react'
import GoogleMapReact from 'google-map-react'
import './Map.css'

import { Icon } from '@iconify/react'

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={"ic:baseline-location-on"} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

const Map = ({ location, zoomLevel }) => (
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD7P6eUXrqDUQ3FutsRjTcFjt3kDIWFlZU' }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
  )

export default Map;
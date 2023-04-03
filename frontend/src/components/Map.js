import {useState, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from 'react-geocode';
import './Map.css';
import { Icon } from '@iconify/react'

const apiKey = 'AIzaSyD7P6eUXrqDUQ3FutsRjTcFjt3kDIWFlZU';

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={"ic:baseline-location-on"} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

const Map = ({ location, zoomLevel }) => {
  const [center, setCenter] = useState({lat: 0, lng: 0});
  
  Geocode.setApiKey(apiKey);

  useEffect(() => {
    Geocode.fromAddress(location.address).then(
      (response) => {
        const {lat, lng} = response.results[0].geometry.location;
        setCenter({lat: lat, lng: lng});
      },
      (error) => {
        console.error(error);
      }
    );
  }, [location.address])
  
    return (
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey}}
          center={center}
          defaultZoom={zoomLevel}
          zoom={zoomLevel}

          resetBoundsOnResize={true}
        >
          <LocationPin
            lat={center.lat}
            lng={center.lng}
          />
        </GoogleMapReact>
      </div>
  )
}

export default Map;
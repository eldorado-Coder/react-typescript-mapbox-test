import * as React from 'react';
import {FunctionComponent, useState, useMemo, Fragment} from "react";
import { hot } from "react-hot-loader/root";
import axios from 'axios';
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import Pin from './pin';

const TOKEN = 'pk.eyJ1IjoibW9raHRhbW9taW4iLCJhIjoiY2w2dXM1aGFhMWRhNDNkbGo3M2tsOThlNSJ9.BiALgWRNJ2dpRkSgxEhX3Q'; 


const App: FunctionComponent = () => {

  const [longFrom, setLongFrom] = useState<string>("0");
  const [longTo, setLongTo] = useState<string>("0");
  const [latFrom, setLatFrom] = useState<string>("0");
  const [latTo, setLatTo] = useState<string>("0");
  const [count, setCount] = useState<number>(1);
  const [coordinates, setCoordinates] = useState([]);
  const [visibleMap, setVisibleMap] = useState<boolean>(false);

  const postApi = async () => {
    const numLongFrom = parseFloat(longFrom);
    const numLongTo = parseFloat(longTo);
    const numLatFrom = parseFloat(latFrom);
    const numLatTo = parseFloat(latTo);

    if(numLongFrom < numLongTo && numLatFrom < numLatTo) {
      let postData = {
        longFrom: numLongFrom,
        longTo: numLongTo,
        latFrom: numLatFrom,
        latTo: numLatTo,
        count: count 
      };
      const result = await axios.post('/api/', postData);
      setCoordinates(result.data.successMessage);
      setVisibleMap(true);

    } else {
      return;
    }
  }
  
  const pins = useMemo(
    () =>
    coordinates.map((coordinate, index) => (
      <Marker
      key={`marker-${index}`}
      longitude={parseFloat(coordinate.long)}
          latitude={parseFloat(coordinate.lat)}
          anchor="bottom"
          onClick={e => {
            e.originalEvent.stopPropagation();
          }}
        >
          <Pin />
        </Marker>
      )),
    [coordinates]
    );

  return (
    <div>
      <div>
        <h4>LONGITUDE (-180 to + 180)</h4>
        <p>longitude_from</p>
        <input type='number' placeholder='longitude_from' value={longFrom} onChange={(e) => setLongFrom(e.target.value)}></input>
        <p>longitude_to</p>
        <input type='number' placeholder='longitude_to' value={longTo} onChange={(e) => setLongTo(e.target.value)}></input>
      </div>
      <div>
          <h4>LATITUDE (-90 to +90)</h4>
          <p>latitude_from</p>
          <input type='number' placeholder='latitude_from' value={latFrom}  onChange={(e) => setLatFrom(e.target.value)}></input>
          <p>latitude_to</p>
          <input type='number' placeholder='latitude_to'  value={latTo}  onChange={(e) => setLatTo(e.target.value)}></input>
      </div>
      <div>
        <h4>count</h4>  
        <input type='number' placeholder='count' value={count} step="1" min={1} onChange={(e) => setCount(parseFloat(e.target.value))} ></input>
        <br/>
      </div>
      <div style={{marginTop: 20}}>
        <button type='button' onClick={postApi}>Start</button>
      </div>
        {visibleMap && 
        <Fragment>
            <button style={{
              position:'absolute',
              top: 10,
              right: 10,
              zIndex: 10,
              borderRadius: '4px',
              cursor: 'pointer'
            }} 
            onClick={() => setVisibleMap(false)}>back</button>
          <div style={{
            position:'absolute',
            top:0,
            bottom:0,
            width:'100%'
          }}>
            <Map
              initialViewState={{
                latitude: 4,
                longitude: 10,
                zoom: 3.5,
                bearing: 0,
                pitch: 0
              }}
              mapStyle="mapbox://styles/mapbox/dark-v9"
              mapboxAccessToken={TOKEN}
            >
              <GeolocateControl position="top-left" />
              <FullscreenControl position="top-left" />
              <NavigationControl position="top-left" />
              <ScaleControl />
              {pins}
            </Map>
          </div>
        </Fragment>
      }
    </div>
  )
}

export default hot(App);

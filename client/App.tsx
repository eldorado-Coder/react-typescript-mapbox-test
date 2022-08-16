import * as React from 'react';
import {FunctionComponent, useState, useMemo, Fragment} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

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
import { useAlert } from 'react-alert';

const TOKEN = 'pk.eyJ1IjoibW9raHRhbW9taW4iLCJhIjoiY2w2dXM1aGFhMWRhNDNkbGo3M2tsOThlNSJ9.BiALgWRNJ2dpRkSgxEhX3Q'; 


const App: FunctionComponent = () => {

  const [longFrom, setLongFrom] = useState<string>("0");
  const [longTo, setLongTo] = useState<string>("0");
  const [latFrom, setLatFrom] = useState<string>("0");
  const [latTo, setLatTo] = useState<string>("0");
  const [count, setCount] = useState<number>(1);
  const [coordinates, setCoordinates] = useState([]);
  const [visibleMap, setVisibleMap] = useState<boolean>(false);

  const alert = useAlert();

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
      alert.show('Please check input range!')
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
    <Container maxWidth="sm">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h4>LONGITUDE (-180 to + 180)</h4>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-longitude-from"
            label="From"
            type="number"
            placeholder='longitude_from' 
            InputLabelProps={{
              shrink: true,
            }}
            value={longFrom} 
            onChange={(e) => setLongFrom(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
              id="outlined-longitude-to"
              label="To"
              type="number"
              placeholder='longitude_to' 
              InputLabelProps={{
                shrink: true,
              }}
              value={longTo} 
              onChange={(e) => setLongTo(e.target.value)}
              variant="outlined"
            />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h4>LATITUDE (-90 to +90)</h4>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-latitude-from"
            label="From"
            type="number"
            placeholder='latitude_from' 
            InputLabelProps={{
              shrink: true,
            }}
            value={latFrom} 
            onChange={(e) => setLatFrom(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-latitude-to"
            label="To"
            type="number"
            placeholder='latitude_to' 
            InputLabelProps={{
              shrink: true,
            }}
            value={latTo} 
            onChange={(e) => setLatTo(e.target.value)}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h4>COUNT (1 to ~)</h4>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-count"
            label="count"
            type="number"
            placeholder='count' 
            value={count}
            onChange={(e) => setCount(parseFloat(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </Grid>        
      </Grid>
        <Grid item xs={12} sm={6}>
          <div style={{marginTop: 20}}>
            <Button variant="contained" color="primary" onClick={postApi}>
              Start
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
        {visibleMap && 
        <Fragment>
            <Button 
              variant="contained" color="primary"
              style={{ position:'absolute', top: 10, right: 10, zIndex: 10, borderRadius: '4px', cursor: 'pointer' }} 
              onClick={() => setVisibleMap(false)}>
              Back
            </Button>
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
        </Grid>
    </Container>
  )
}

export default hot(App);

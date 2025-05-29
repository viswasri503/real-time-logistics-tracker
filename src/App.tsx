import React from 'react';

import DriverList from './components/DriverList';
//import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setDrivers } from './store/driverSlice';

import { connectWebSocket } from './utils/websocket';
import MapView from './components/MapView';
import 'mapbox-gl/dist/mapbox-gl.css';

const App: React.FC = () => {

  useEffect(() => {
    connectWebSocket();
  }, []);
  
  useEffect(() => {
    setDrivers([
      {
        driverId: '1',
        name: 'Alice',
        latitude: 43.6532,
        longitude: -79.3832,
        status: 'Delivering',
        eta: '12 min',
      },
      {
        driverId: '2',
        name: 'Bob',
        latitude: 43.7731,
        longitude: -79.2568,
        status: 'Idle',
        eta: '13 min',
      },
      {
        driverId: '3',
        name: 'John',
        latitude: 43.7181,
        longitude: -79.4427,
        status: 'Delivering',
        eta: 'N/A',
      },
    ])
  }, []);
  
  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <h1 className="text-xl font-bold p-4">Real-Time Logistics Tracker</h1>
      <DriverList />
      <MapView></MapView>
    </div>
  );
};








export default App;



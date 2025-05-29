const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
console.log('🚀 WebSocket server running on ws://localhost:8080');

const drivers = [
  {
    driverId: '1',
    name: 'Alice',
    latitude: 43.6532,
    longitude: -79.3832,
    status: 'Delivering',
    eta: '15 min',
  },
  {
    driverId: '2',
    name: 'Bob',
    latitude: 43.7731,
    longitude: -79.2568,
    status: 'Idle',
    eta: 'N/A',
  },
  {
    driverId: '3',
    name: 'John',
    latitude: 43.7181,
    longitude: -79.4427,
    status: 'Delivering',
    eta: '13 min',
  },
  {
    driverId: '4',
    name: "Tim",
    latitude: 43.6425662,
    longitude: -79.3870568,
    status: 'Idle',
    eta: 'N/A',
  },
  {
    driverId: '5',
    name: "Ryan",
    latitude: 43.6677107,
    longitude: -79.3947771,
    status: 'Delivering',
    eta: '13 min',
  },
  {
    driverId: '6',
    name: "George",
    latitude: 43.8176991,
    longitude: -79.1859306,
    status: 'Idle',
    eta: 'N/A',
  },
  {
    driverId: '7',
    name: "Ria",
    latitude: 43.6424033,
    longitude: -79.3863273,
    status: 'Pause',
    eta: '13 min',
  },
  {
    driverId: '8',
    name: "Alia",
    latitude: 43.6536061,
    longitude: -79.3925128,
    status: 'Delivering',
    eta: '13 min',
  },
  {
    driverId: '9',
    name: "Asya",
    latitude: 43.6465474,
    longitude: -79.4636906,
    status: 'Delivering',
    eta: '13 min',
  },
  {
    driverId: '10',
    name: "Neo",
    latitude: 43.6780254,
    longitude: -79.4094389,
    status: 'Pause',
    eta: '13 min',
  },
  
];

function getRandomDelta() {
  return (Math.random() - 0.5) * 0.002;
}

setInterval(() => {
  drivers.forEach((driver) => {
    driver.latitude += getRandomDelta();
    driver.longitude += getRandomDelta();
    if (driver.status === 'Idle') {
      driver.status = Math.random() > 0.5 ? 'Paused' : 'Delivering';
    }

    const message = JSON.stringify(driver);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
}, 3000);
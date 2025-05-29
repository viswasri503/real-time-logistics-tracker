import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { type DriverStatus, selectDriver,updateDriverStatus,markDeliveryComplete,reassignDelivery } from '../store/driverSlice';

const DriverList: React.FC = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state: RootState) => state.drivers.list);
  const selectedDriverId = useSelector((state: RootState) => state.drivers.selectedDriverId);

  const [filter, setFilter] = useState<DriverStatus | 'All'>('All');
 

  const filteredDrivers = filter === 'All'
    ? drivers
    : drivers.filter((d) => d.status === filter);

  const handleSelect = (driverId: string) => {
    dispatch(selectDriver(driverId));
  };

  
  


  return (
    <div className="row col-md-2">
      <h2 className="text-lg font-semibold mb-2">List of Drivers</h2>

      <div className="mb-4">
        <label className="mr-2 font-medium"><b className='text-head'>Filter: </b></label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as DriverStatus | 'All')}
          className="border px-2 py-1 rounded"
        >
          <option value="All">All</option>
          <option value="Delivering">Delivering</option>
          <option value="Paused">Paused</option>
          <option value="Idle">Idle</option>
        </select>
      </div>

      

    <div className='drivers-list divide-y divide-gray-100' role="list" >

   
    {filteredDrivers && filteredDrivers.length > 0 ? (

    <ul className="space-y-2">
        {filteredDrivers.map((driver) => (
          
          <><li  key={driver.driverId} 
             className={`flex justify-between gap-x-6 py-5 cursor-pointer p-3 border rounded-md transition-colors duration-200 ${
            driver.driverId === selectedDriverId
              ? 'bg-blue-100 border-blue-500'
              : 'hover:bg-gray-100'
          }`}
            onClick={() => handleSelect(driver.driverId)}>
            <div className="flex min-w-0 gap-x-4">
              <p className="text-sm/6 font-semibold text-gray-900"><b className='text-head'>Name:</b> {driver.name}</p>
              {driver.driverId === selectedDriverId && selectedDriverId && (
                <><div className="min-w-0 flex-auto">
                  <p className="mt-1 truncate text-xs/5 text-gray-500"><b className='text-head'>Status: </b>{driver.status}</p>
                  <p className="text-sm/6 text-gray-900"><b className='text-head'>Location: </b> {driver.latitude.toFixed(4)}, {driver.longitude.toFixed(4)}</p>
                  <p className="mt-1 text-xs/5 text-gray-500"><b className='text-head'>ETA: </b>{driver.eta ?? 'N/A'}</p>
                </div><div className="flex space-x-2 mt-2">
                    <button
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => dispatch(
                        updateDriverStatus({
                          driverId: driver.driverId,
                          status: driver.status === 'Paused' ? 'Delivering' : 'Paused',
                        })

                      )}>
                      {driver.status === 'Paused' ? 'Resume' : 'Pause'}
                    </button>

                    <button
                      className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                      onClick={() => dispatch(markDeliveryComplete(driver.driverId))}
                    >
                      Complete
                    </button>

                    <button
                      className="text-xs bg-yellow-600 text-white px-2 py-1 rounded"
                      onClick={() => {

                        const others = drivers.filter((d) => d.driverId !== driver.driverId);
                        if (others.length > 0) {
                          dispatch(reassignDelivery({ fromId: driver.driverId, toId: others[0].driverId }));
                        }
                      } }
                    >
                      Reassign
                    </button>
                  </div></>
              )}
              
            </div>
           

              
            </li></>
        ))}
      </ul>)
      :(
        <div className='no-drivers-found'>No Drivers Found</div>
      )}
    </div>
      
    </div>
     
  );
};

export default DriverList; 




 
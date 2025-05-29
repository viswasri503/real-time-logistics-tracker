import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type DriverStatus = 'Delivering' | 'Paused' | 'Idle';

export interface Driver {
  driverId: string;
  name: string;
  latitude: number;
  longitude: number;
  status: DriverStatus;
  eta?: string;
}

interface DriversState {
  list: Driver[];
  selectedDriverId: string | null;
}

const initialState: DriversState = {
  list: [],
  selectedDriverId: null,
};

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setDrivers(state, action: PayloadAction<Driver[]>) {
      state.list = action.payload;
    },
    updateDriver(state, action: PayloadAction<Driver>) {
      const index = state.list.findIndex((d) => d.driverId === action.payload.driverId);
      if (index !== -1) {
        state.list[index] = action.payload;
      } else {
        state.list.push(action.payload);
      }
    },
    selectDriver(state, action: PayloadAction<string>) {
      state.selectedDriverId = action.payload;
    },

    updateDriverStatus(state,action: PayloadAction<{ driverId: string; status: DriverStatus }>) {
        const driver = state.list.find((d) => d.driverId === action.payload.driverId);
        if (driver) {
          driver.status = action.payload.status;
        }
    },
      
      markDeliveryComplete(state, action: PayloadAction<string>) {
        const driver = state.list.find((d) => d.driverId === action.payload);
        if (driver) {
          driver.status = 'Idle';
          driver.eta = 'N/A';
        }
      },
      
      reassignDelivery(state, action: PayloadAction<{ fromId: string; toId: string }>) {
        const from = state.list.find((d) => d.driverId === action.payload.fromId);
        const to = state.list.find((d) => d.driverId === action.payload.toId);
        if (from && to) {
          from.status = 'Idle';
          from.eta = 'N/A';
          to.status = 'Delivering';
          to.eta = '20 min'; 
        }
      }
    
  },
});


  
export const { setDrivers, updateDriver, selectDriver, updateDriverStatus,markDeliveryComplete,reassignDelivery} = driversSlice.actions;
export default driversSlice.reducer;

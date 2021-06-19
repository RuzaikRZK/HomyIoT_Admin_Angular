export interface User {

  userId: number |undefined;
  userName: string |undefined;
  password: string |undefined;
  deviceId: string |undefined;
  email: string |undefined;
  contactNumber: string |undefined;
  activeStatus:number |undefined;
  userType:string |undefined;

  deviceStatusList : [{
   socket1_Status: number;
  socket2_Status: number;
  socket3_Status: number;
  socket4_Status: number;
  motionSensor_Status: number ;
  syncStatus: number ;
  lastSyncDate: string ;
  lastSyncTime: string ;
  id: number ;

 }]
}


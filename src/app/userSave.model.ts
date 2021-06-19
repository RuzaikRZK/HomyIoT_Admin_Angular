export class UserData{

  userName: string ;
  password: string ;
  deviceId: string ;
  email: string ;
  contactNumber: string ;
  activeStatus:number ;
  userType:string ;
  deviceStatus:DeviceStatus = new DeviceStatus();


}

export class  DeviceStatus {
  socket1_Status: number ;
  socket2_Status: number;
  socket3_Status: number;
  socket4_Status: number;
  motionSensor_Status: number;
  syncStatus: number;
  lastSyncDate: string ;
  lastSyncTime: string;
}








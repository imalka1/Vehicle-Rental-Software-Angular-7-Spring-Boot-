package lk.vrs.service;

import lk.vrs.entity.Driver;
import lk.vrs.entity.DriverVehicle;

import java.util.List;

public interface DriverVehicleService {

    DriverVehicle addDriver(DriverVehicle driverVehicle);

    DriverVehicle updateDriver(DriverVehicle driverVehicle);
}

package lk.vrs.controller;

import lk.vrs.entity.Driver;
import lk.vrs.entity.DriverVehicle;
import lk.vrs.service.DriverService;
import lk.vrs.service.DriverVehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/driver_vehicle")
public class DriverVehicleController {

    @Autowired
    private DriverVehicleService driverVehicleService;

    @PostMapping(value = "/admin/drivers/add")
    public DriverVehicle addDriver(@RequestBody DriverVehicle driverVehicle) {
        return driverVehicleService.addDriver(driverVehicle);
    }

    @PostMapping(value = "/admin/drivers/update")
    public DriverVehicle updateDriver(@RequestBody DriverVehicle driverVehicle) {
        return driverVehicleService.updateDriver(driverVehicle);
    }
}

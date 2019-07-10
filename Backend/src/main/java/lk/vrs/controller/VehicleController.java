package lk.vrs.controller;

import lk.vrs.entity.Vehicle;
import lk.vrs.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/vehicle")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping(value = "/admin/vehicles/add")
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.addVehicle(vehicle);
    }

    @PostMapping(value = "/admin/vehicles/update")
    public Vehicle updateVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.updateVehicle(vehicle);
    }

    @DeleteMapping(value = "/admin/vehicles/{id}")
    public void deletePlace(@PathVariable long id) {
        vehicleService.deleteVehicle(id);
    }

    @GetMapping(value = "/vehiclesViaCategory/{category}")
    public List<Vehicle> getVehiclesViaCategory(@PathVariable String category) {
        return vehicleService.getVehiclesViaCategory(category);
    }
}

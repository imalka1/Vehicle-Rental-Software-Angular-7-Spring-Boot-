package lk.vrs.controller;

import lk.vrs.entity.Vehicle;
import lk.vrs.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/vehicle")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping(value = "/vehicles")
    public Vehicle addVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.addVehicle(vehicle);
    }

    @PutMapping(value = "/vehicles/{id}")
    public Vehicle updateVehicle(@RequestBody Vehicle vehicle, @PathVariable int id) {
        return vehicleService.updateVehicle(vehicle, id);
    }

    @DeleteMapping(value = "/vehicles/{id}")
    public void deletePlace(@PathVariable int id) {
        vehicleService.deleteVehicle(id);
    }

    @GetMapping(value = "/vehiclesViaCategory/{category}")
    public ArrayList<Vehicle> getVehiclesViaCategory(@PathVariable String category) {
        return vehicleService.getVehiclesViaCategory(category);
    }
}

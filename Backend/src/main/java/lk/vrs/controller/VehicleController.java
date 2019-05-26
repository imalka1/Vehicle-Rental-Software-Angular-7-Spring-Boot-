package lk.vrs.controller;

import lk.vrs.entity.Vehicle;
import lk.vrs.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(path = "/vehicle")
public class VehicleController {

    @Autowired
    private VehicleRepository vehicleRepository;

    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }
}

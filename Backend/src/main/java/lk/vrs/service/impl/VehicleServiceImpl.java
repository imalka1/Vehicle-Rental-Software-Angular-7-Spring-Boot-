package lk.vrs.service.impl;

import lk.vrs.entity.Vehicle;
import lk.vrs.repository.VehicleRepository;
import lk.vrs.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    @Override
    public Vehicle updateVehicle(Vehicle vehicle, int id) {
        Vehicle vehicleObj = vehicleRepository.findById(id).get();
        vehicleObj.setVehicleName(vehicle.getVehicleName());
        vehicleObj.setVehicleTotalPassengers(vehicle.getVehicleTotalPassengers());
        return vehicleRepository.save(vehicleObj);
    }

    @Override
    public void deleteVehicle(int id) {
        vehicleRepository.deleteById(id);
    }

    @Override
    public List<Vehicle> getVehiclesViaCategory(String category) {
        return vehicleRepository.getVehiclesViaCategory(category);
    }
}

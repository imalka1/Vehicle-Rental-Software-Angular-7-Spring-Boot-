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
        return vehicleRepository.save(vehicleObj);
    }

    @Override
    public void deleteVehicle(int id) {
        vehicleRepository.deleteById(id);
    }

    @Override
    public ArrayList<Vehicle> getVehiclesViaCategory(String category) {
        List<Object[]> vehiclesViaCategory = vehicleRepository.getVehiclesViaCategory(category);
        ArrayList<Vehicle> vehicles = new ArrayList<>();
        for (Object[] vehicleViaCategory : vehiclesViaCategory) {
            Vehicle vehicle = new Vehicle();
            vehicle.setVehicleId(Integer.parseInt(vehicleViaCategory[0].toString()));
            vehicle.setVehicleName(vehicleViaCategory[1].toString());
            vehicles.add(vehicle);
        }
        return vehicles;
    }
}

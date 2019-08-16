package lk.vrs.service.impl;

import lk.vrs.entity.DriverVehicle;
import lk.vrs.entity.Vehicle;
import lk.vrs.repository.DriverVehicleRepository;
import lk.vrs.repository.VehicleRepository;
import lk.vrs.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;
    @Autowired
    private DriverVehicleRepository driverVehicleRepository;

    @Override
    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    @Override
    public Vehicle updateVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    @Override
    public void deleteVehicle(long id) {
        vehicleRepository.deleteById(id);
    }

    @Override
    public List<Vehicle> getFreeVehicles() {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        ArrayList<Vehicle> tempVehicles = new ArrayList<>(vehicles);
        Set<DriverVehicle> onDutyVehicles = driverVehicleRepository.getOnDutyVehicles();
        for (Vehicle vehicle : tempVehicles) {
            for (DriverVehicle onDutyVehicle : onDutyVehicles) {
                if (vehicle.getVehicleName().equals(onDutyVehicle.getVehicle().getVehicleName())) {
                    vehicles.remove(vehicle);
                }
            }
        }
        return vehicles;
    }

    @Override
    public List<Vehicle> getVehiclesViaCategory(String category) {
        return vehicleRepository.getVehiclesViaCategory(category);
    }

    @Override
    public List<Vehicle> getVehiclesViaCategoryForReservation(Vehicle vehicle) {
        return vehicleRepository.getVehiclesViaCategoryForReservation(vehicle.getVehicleCategory(), vehicle.getVehicleTotalPassengers());
    }

}

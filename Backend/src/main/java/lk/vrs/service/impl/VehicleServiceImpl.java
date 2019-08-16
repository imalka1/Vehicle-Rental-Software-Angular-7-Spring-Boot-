package lk.vrs.service.impl;

import lk.vrs.entity.Driver;
import lk.vrs.entity.DriverVehicle;
import lk.vrs.entity.Reservation;
import lk.vrs.entity.Vehicle;
import lk.vrs.repository.DriverRepository;
import lk.vrs.repository.VehicleRepository;
import lk.vrs.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

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
    public Set<Vehicle> getFreeVehicles() {
//        List<Vehicle> freeVehicles = vehicleRepository.findAll();
//        List<Vehicle> vehicles = new ArrayList<>(freeVehicles);
//        for (Vehicle freeVehicle : vehicles) {
////            if (freeVehicle.getDriver() != null) {
////                freeVehicles.remove(freeVehicle);
////            }
//        }
        Set<Vehicle> freeVehicles = new HashSet<>();
        List<Vehicle> vehicles = vehicleRepository.findAll(Sort.by("id").descending());
        for (Vehicle vehicle : vehicles) {
//            Iterator<DriverVehicle> driverVehicleIterator = vehicle.getDriverVehicles().iterator();
//            if (driverVehicleIterator.hasNext()) {
//                DriverVehicle driverVehicle = driverVehicleIterator.next();
//                if (driverVehicle.getVehicle() == null) {
//                    freeVehicles.add(driverVehicle.getVehicle());
//                }
//            } else {
                freeVehicles.add(vehicle);
//            }
        }
        return freeVehicles;
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

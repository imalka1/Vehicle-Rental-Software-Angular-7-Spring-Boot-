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
//        List<Vehicle> freeVehicles = vehicleRepository.findAll();
//        List<Vehicle> vehicles = new ArrayList<>(freeVehicles);
//        for (Vehicle freeVehicle : vehicles) {
////            if (freeVehicle.getDriver() != null) {
////                freeVehicles.remove(freeVehicle);
////            }
//        }

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


//            Set<DriverVehicle> driverVehicles = vehicle.getDriverVehicles();
//            for (DriverVehicle driverVehicle : driverVehicles) {
//                if(driverVehicle){
//
//                }
//            }
//
//
//            while (driverVehicleIterator.hasNext()) {
//                DriverVehicle driverVehicle = driverVehicleIterator.next();
////                if (driverVehicle.getVehicle() == null) {
////                    freeVehicles.add(driverVehicle.getVehicle());
////                }
//            }
//                freeVehicles.add(vehicle);


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

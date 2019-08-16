package lk.vrs.service;

import lk.vrs.entity.Reservation;
import lk.vrs.entity.Vehicle;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public interface VehicleService {
    Vehicle addVehicle(Vehicle vehicle);

    Vehicle updateVehicle(Vehicle vehicle);

    void deleteVehicle(long id);

    Set<Vehicle> getFreeVehicles();

    List<Vehicle> getVehiclesViaCategory(String category);

    List<Vehicle> getVehiclesViaCategoryForReservation(Vehicle vehicle);

}

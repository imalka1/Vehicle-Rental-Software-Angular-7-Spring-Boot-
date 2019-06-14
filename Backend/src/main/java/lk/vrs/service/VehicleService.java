package lk.vrs.service;

import lk.vrs.entity.Vehicle;

import java.util.ArrayList;
import java.util.List;

public interface VehicleService {
    Vehicle addVehicle(Vehicle vehicle);

    Vehicle updateVehicle(Vehicle vehicle, int id);

    void deleteVehicle(int id);

    List<Vehicle> getVehiclesViaCategory(String category);
}

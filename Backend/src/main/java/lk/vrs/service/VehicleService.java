package lk.vrs.service;

import lk.vrs.entity.Vehicle;

import java.util.ArrayList;

public interface VehicleService {
    Vehicle addVehicle(Vehicle vehicle);

    Vehicle updateVehicle(Vehicle vehicle, int id);

    void deleteVehicle(int id);

    ArrayList<Vehicle> getVehiclesViaCategory(String category);
}

package lk.vrs.repository;

import lk.vrs.entity.Vehicle;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface VehicleRepository extends CrudRepository<Vehicle, Integer> {

    @Query(value = "SELECT vehicleId,vehicleName,totalPassengers FROM Vehicle WHERE category=?1")
    List<Object[]> getVehiclesViaCategory(String category);
}

package lk.vrs.repository;

import lk.vrs.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {

    @Query(value = "SELECT v FROM Vehicle v WHERE category=?1")
    List<Vehicle> getVehiclesViaCategory(String category);
}

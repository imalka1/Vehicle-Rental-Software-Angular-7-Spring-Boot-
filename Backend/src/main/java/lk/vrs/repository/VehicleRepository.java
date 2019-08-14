package lk.vrs.repository;

import lk.vrs.entity.Reservation;
import lk.vrs.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    @Query(value = "FROM Vehicle WHERE vehicleCategory=?1")
    List<Vehicle> getVehiclesViaCategory(String vehicleCategory);

    @Query(value = "FROM Vehicle WHERE vehicleCategory=?1 AND vehicleTotalPassengers=?2 AND vehicleReserved=false")
    List<Vehicle> getVehiclesViaCategoryForReservation(String category, int totalPassengers);
}

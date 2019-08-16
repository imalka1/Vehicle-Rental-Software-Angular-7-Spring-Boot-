package lk.vrs.repository;

import lk.vrs.entity.DriverVehicle;
import lk.vrs.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface DriverVehicleRepository extends JpaRepository<DriverVehicle, Long> {

    @Query(value = "FROM DriverVehicle WHERE onDuty=true")
    Set<DriverVehicle> getOnDutyVehicles();
}

package lk.vrs.repository;

import lk.vrs.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DriverRepository extends JpaRepository<Driver, String> {

    @Query(value = "select count(id) from Vehicle ")
    int getTableRowCount();

    @Query(value = "from Driver where id=?1")
    Driver findDriverById(String id);
}

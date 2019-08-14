package lk.vrs.service;

import lk.vrs.entity.Driver;

import java.util.List;

public interface DriverService {

    Driver addDriver(Driver driver);

    Driver updateDriver(Driver driver);

    void deleteDriver(String id);

    List<Driver> getAllDrivers(int start, int limit);

    int getTableRowCount();

    Driver searchDriver(String id);
}

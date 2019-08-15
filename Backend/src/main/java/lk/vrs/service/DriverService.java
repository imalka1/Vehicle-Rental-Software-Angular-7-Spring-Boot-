package lk.vrs.service;

import lk.vrs.entity.Driver;

import java.util.List;

public interface DriverService {

    void deleteDriver(String id);

    List<Driver> getAllDrivers(int start, int limit);

    int getTableRowCount();

    Driver searchDriver(String id);

    Driver addDriver(Driver driver);
}

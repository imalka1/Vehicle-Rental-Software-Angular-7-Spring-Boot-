package lk.vrs.service.impl;

import lk.vrs.entity.Driver;
import lk.vrs.repository.DriverRepository;
import lk.vrs.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Override
    @Transactional
    public Driver addDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    @Override
    public Driver updateDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    @Override
    public void deleteDriver(long id) {
        driverRepository.deleteById(id);
    }

    @Override
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }
}

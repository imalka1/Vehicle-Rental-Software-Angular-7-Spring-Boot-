package lk.vrs.service.impl;

import lk.vrs.entity.Driver;
import lk.vrs.entity.DriverVehicle;
import lk.vrs.repository.DriverVehicleRepository;
import lk.vrs.service.DriverVehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DriverVehicleServiceImpl implements DriverVehicleService {

    @Autowired
    private DriverVehicleRepository driverVehicleRepository;

    @Override
    @Transactional
    public DriverVehicle addDriver(DriverVehicle driverVehicle) {
        return driverVehicleRepository.save(driverVehicle);
    }

    @Override
    @Transactional
    public DriverVehicle updateDriver(DriverVehicle driverVehicle) {
        return driverVehicleRepository.save(driverVehicle);
    }
}

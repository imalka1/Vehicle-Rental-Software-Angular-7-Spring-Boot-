package lk.vrs.service.impl;

import lk.vrs.entity.Driver;
import lk.vrs.repository.DriverRepository;
import lk.vrs.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Override
    public void deleteDriver(String id) {
        driverRepository.deleteById(id);
    }

    @Override
    public List<Driver> getAllDrivers(int start, int limit) {
         return driverRepository.findAll(PageRequest.of(start,limit,Sort.by("id").descending())).getContent();
    }

    @Override
    public int getTableRowCount() {
        return driverRepository.getTableRowCount();
    }

    @Override
    public Driver searchDriver(String id) {
        return driverRepository.findDriverById(id);
    }

    @Override
    public Driver addDriver(Driver driver) {
        return driverRepository.save(driver);
    }
}

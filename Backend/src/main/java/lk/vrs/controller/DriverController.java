package lk.vrs.controller;

import lk.vrs.entity.Driver;
import lk.vrs.entity.Place;
import lk.vrs.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/driver")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @PostMapping(value = "/admin/drivers/add")
    public Driver addDriver(@RequestBody Driver driver) {
        return driverService.addDriver(driver);
    }

    @PostMapping(value = "/admin/drivers/update")
    public Driver updateDriver(@RequestBody Driver driver) {
        return driverService.updateDriver(driver);
    }

    @DeleteMapping(value = "/admin/drivers/{id}")
    public void deleteDriver(@PathVariable String id) {
        driverService.deleteDriver(id);
    }

    @GetMapping(value = "/admin/drivers/{start}/{limit}")
    public List<Driver> getAllDrivers(@PathVariable int start, @PathVariable int limit) {
        return driverService.getAllDrivers(start, limit);
    }

    @GetMapping(value = "/admin/drivers/rowCount")
    public int getDriverTableRowCount() {
        return driverService.getTableRowCount();
    }

    @GetMapping(value = "/admin/drivers/{id}")
    public Driver searchDriver(@PathVariable String id) {
        return driverService.searchDriver(id);
    }
}

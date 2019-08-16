package lk.vrs.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;

@Entity
public class DriverVehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Date dateOfAssigned;

    @ManyToOne
    @JoinColumn(nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties("driverVehicles")
    private Driver driver;

    @ManyToOne
    @JoinColumn(nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties("driverVehicles")
    private Vehicle vehicle;

    private boolean onDuty;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isOnDuty() {
        return onDuty;
    }

    public void setOnDuty(boolean onDuty) {
        this.onDuty = onDuty;
    }

    public Date getDateOfAssigned() {
        return dateOfAssigned;
    }

    public void setDateOfAssigned(Date dateOfAssigned) {
        if (dateOfAssigned == null) {
            dateOfAssigned = new Date();
        }
        this.dateOfAssigned = dateOfAssigned;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }
}

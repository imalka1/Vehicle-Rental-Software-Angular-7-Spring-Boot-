package lk.vrs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Driver {
    @Id
    private String id;
    private String driverName;
    private String driverEmail;
    private String driverContactNumber;
    private boolean driverPresent;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "driver")
//    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties("driver")
    private Set<DriverVehicle> driverVehicles;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isDriverPresent() {
        return driverPresent;
    }

    public void setDriverPresent(boolean driverPresent) {
        this.driverPresent = driverPresent;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getDriverEmail() {
        return driverEmail;
    }

    public void setDriverEmail(String driverEmail) {
        this.driverEmail = driverEmail;
    }

    public String getDriverContactNumber() {
        return driverContactNumber;
    }

    public void setDriverContactNumber(String driverContactNumber) {
        this.driverContactNumber = driverContactNumber;
    }

    public Set<DriverVehicle> getDriverVehicles() {
        return driverVehicles;
    }

    public void setDriverVehicles(Set<DriverVehicle> driverVehicles) {
        for (DriverVehicle driverVehicle : driverVehicles) {
            driverVehicle.setDriver(this);
        }
        this.driverVehicles = driverVehicles;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Driver{" +
                "id='" + id + '\'' +
                ", driverName='" + driverName + '\'' +
                ", driverEmail='" + driverEmail + '\'' +
                ", driverContactNumber='" + driverContactNumber + '\'' +
                ", driverPresent=" + driverPresent +
                ", driverVehicles=" + driverVehicles +
                ", user=" + user +
                '}';
    }
}

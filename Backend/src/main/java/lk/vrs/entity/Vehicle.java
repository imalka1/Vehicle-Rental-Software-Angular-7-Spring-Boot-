package lk.vrs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String vehicleName;
    private Integer vehicleTotalPassengers;
    private String vehicleCategory;
    private boolean vehicleReserved;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "driver")
//    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties("driver")
    private Set<DriverVehicle> driverVehicles;

    public Set<DriverVehicle> getDriverVehicles() {
        return driverVehicles;
    }

    public void setDriverVehicles(Set<DriverVehicle> driverVehicles) {
        this.driverVehicles = driverVehicles;
    }

    public boolean isVehicleReserved() {
        return vehicleReserved;
    }

    public void setVehicleReserved(boolean vehicleReserved) {
        this.vehicleReserved = vehicleReserved;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getVehicleName() {
        return vehicleName;
    }

    public void setVehicleName(String vehicleName) {
        this.vehicleName = vehicleName;
    }

    public Integer getVehicleTotalPassengers() {
        return vehicleTotalPassengers;
    }

    public void setVehicleTotalPassengers(Integer vehicleTotalPassengers) {
        this.vehicleTotalPassengers = vehicleTotalPassengers;
    }

    public String getVehicleCategory() {
        return vehicleCategory;
    }

    public void setVehicleCategory(String vehicleCategory) {
        this.vehicleCategory = vehicleCategory;
    }

//    public Reservation getReservation() {
//        return reservation;
//    }
//
//    public void setReservation(Reservation reservation) {
//        this.reservation = reservation;
//    }

}

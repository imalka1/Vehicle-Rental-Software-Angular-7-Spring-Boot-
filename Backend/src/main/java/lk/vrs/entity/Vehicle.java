package lk.vrs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String vehicleName;
    private Integer vehicleTotalPassengers;
    private String vehicleCategory;

    @OneToOne(cascade = CascadeType.PERSIST, mappedBy = "reservationVehicle")
    @OnDelete(action = OnDeleteAction.CASCADE)
//    @JsonIgnore
    private Reservation reservation;

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

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    @Override
    public String toString() {
        return "Vehicle{" +
                "id=" + id +
                ", vehicleName='" + vehicleName + '\'' +
                ", vehicleTotalPassengers=" + vehicleTotalPassengers +
                ", vehicleCategory='" + vehicleCategory + '\'' +
                '}';
    }
}

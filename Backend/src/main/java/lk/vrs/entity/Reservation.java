package lk.vrs.entity;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;


@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reservationId;
    private Date dateOfReservation;
    private Time timeOfReservation;
    @OneToOne
    private Place place;
    @OneToOne
    private Vehicle vehicle;

    public int getReservationId() {
        return reservationId;
    }

    public void setReservationId(int reservationId) {
        this.reservationId = reservationId;
    }

    public Date getDateOfReservation() {
        return dateOfReservation;
    }

    public void setDateOfReservation(Date dateOfReservation) {
        this.dateOfReservation = dateOfReservation;
    }

    public Time getTimeOfReservation() {
        return timeOfReservation;
    }

    public void setTimeOfReservation(Time timeOfReservation) {
        this.timeOfReservation = timeOfReservation;
    }

    public Place getPlace() {
        return place;
    }

    public void setPlace(Place place) {
        this.place = place;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }
}

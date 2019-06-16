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
    private boolean completed;
    @OneToOne
    private Place placeFrom;
    @OneToOne
    private Place placeTo;
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

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public Place getPlaceFrom() {
        return placeFrom;
    }

    public void setPlaceFrom(Place placeFrom) {
        this.placeFrom = placeFrom;
    }

    public Place getPlaceTo() {
        return placeTo;
    }

    public void setPlaceTo(Place placeTo) {
        this.placeTo = placeTo;
    }
}

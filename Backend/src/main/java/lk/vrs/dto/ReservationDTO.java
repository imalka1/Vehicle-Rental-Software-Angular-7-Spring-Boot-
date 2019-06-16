package lk.vrs.dto;

import lk.vrs.entity.Place;
import lk.vrs.entity.Vehicle;

import java.sql.Time;
import java.sql.Date;

public class ReservationDTO {
    private int reservationId;
    private Date dateOfReservation;
    private String timeOfReservation;
    private String completed;
    private Place placeFrom;
    private Place placeTo;
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

    public String getTimeOfReservation() {
        return timeOfReservation;
    }

    public void setTimeOfReservation(String timeOfReservation) {
        this.timeOfReservation = timeOfReservation;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public String getCompleted() {
        return completed;
    }

    public void setCompleted(String completed) {
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

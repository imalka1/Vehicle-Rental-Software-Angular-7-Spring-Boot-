package lk.vrs.dto;

import lk.vrs.entity.Customer;
import lk.vrs.entity.Place;
import lk.vrs.entity.Vehicle;

import java.sql.Time;
import java.sql.Date;

public class ReservationDTO {
    private long id;
    private Date reservationDate;
    private String reservationTime;
    private String reservationCompleted;
    private Place reservationPlaceFrom;
    private Place reservationPlaceTo;
    private Vehicle reservationVehicle;
    private Customer reservationCustomer;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(Date reservationDate) {
        this.reservationDate = reservationDate;
    }

    public String getReservationTime() {
        return reservationTime;
    }

    public void setReservationTime(String reservationTime) {
        this.reservationTime = reservationTime;
    }

    public String getReservationCompleted() {
        return reservationCompleted;
    }

    public void setReservationCompleted(String reservationCompleted) {
        this.reservationCompleted = reservationCompleted;
    }

    public Place getReservationPlaceFrom() {
        return reservationPlaceFrom;
    }

    public void setReservationPlaceFrom(Place reservationPlaceFrom) {
        this.reservationPlaceFrom = reservationPlaceFrom;
    }

    public Place getReservationPlaceTo() {
        return reservationPlaceTo;
    }

    public void setReservationPlaceTo(Place reservationPlaceTo) {
        this.reservationPlaceTo = reservationPlaceTo;
    }

    public Vehicle getReservationVehicle() {
        return reservationVehicle;
    }

    public void setReservationVehicle(Vehicle reservationVehicle) {
        this.reservationVehicle = reservationVehicle;
    }

    public Customer getReservationCustomer() {
        return reservationCustomer;
    }

    public void setReservationCustomer(Customer reservationCustomer) {
        this.reservationCustomer = reservationCustomer;
    }
}

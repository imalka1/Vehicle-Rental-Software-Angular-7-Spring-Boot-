package lk.vrs.dto;

import lk.vrs.entity.Customer;
import lk.vrs.entity.Place;
import lk.vrs.entity.Vehicle;

import java.sql.Time;
import java.util.Date;

public class ReservationDTO {
    private long id;
    private String reservationDateAndTime;
    private String submissionDateAndTime;
    private boolean reservationCompleted;
    private Place reservationPlaceFrom;
    private Place reservationPlaceTo;
    private Vehicle reservationVehicle;
    private Customer reservationCustomer;
    private double reservationAmount;
    private int reservationPaymentKey;
    private String reservationDate;
    private String reservationTime;

    public boolean isReservationCompleted() {
        return reservationCompleted;
    }

    public String getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(String reservationDate) {
        this.reservationDate = reservationDate;
    }

    public String getReservationTime() {
        return reservationTime;
    }

    public void setReservationTime(String reservationTime) {
        this.reservationTime = reservationTime;
    }

    public String getReservationDateAndTime() {
        return reservationDateAndTime;
    }

    public void setReservationDateAndTime(String reservationDateAndTime) {
        this.reservationDateAndTime = reservationDateAndTime;
    }

    public String getSubmissionDateAndTime() {
        return submissionDateAndTime;
    }

    public void setSubmissionDateAndTime(String submissionDateAndTime) {
        this.submissionDateAndTime = submissionDateAndTime;
    }

    public double getReservationAmount() {
        return reservationAmount;
    }

    public void setReservationAmount(double reservationAmount) {
        this.reservationAmount = reservationAmount;
    }

    public int getReservationPaymentKey() {
        return reservationPaymentKey;
    }

    public void setReservationPaymentKey(int reservationPaymentKey) {
        this.reservationPaymentKey = reservationPaymentKey;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean getReservationCompleted() {
        return reservationCompleted;
    }

    public void setReservationCompleted(boolean reservationCompleted) {
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

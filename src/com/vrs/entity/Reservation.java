package com.vrs.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int trip;
    private Date reservationDateAndTime;
    private boolean reservationCompleted;
    private int reservationAdults;
    private int reservationChildren;
    private int reservationInfants;
    private double reservationAmount;

    @OneToOne
    @JoinColumn(nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private Customer reservationCustomer;

    @OneToOne
    @JoinColumn(nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private Place reservationPlaceFrom;

    @OneToOne
    @JoinColumn(nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private Place reservationPlaceTo;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getTrip() {
        return trip;
    }

    public void setTrip(int trip) {
        this.trip = trip;
    }

    public Date getReservationDateAndTime() {
        return reservationDateAndTime;
    }

    public void setReservationDateAndTime(Date reservationDateAndTime) {
        this.reservationDateAndTime = reservationDateAndTime;
    }

    public boolean isReservationCompleted() {
        return reservationCompleted;
    }

    public void setReservationCompleted(boolean reservationCompleted) {
        this.reservationCompleted = reservationCompleted;
    }

    public int getReservationAdults() {
        return reservationAdults;
    }

    public void setReservationAdults(int reservationAdults) {
        this.reservationAdults = reservationAdults;
    }

    public int getReservationChildren() {
        return reservationChildren;
    }

    public void setReservationChildren(int reservationChildren) {
        this.reservationChildren = reservationChildren;
    }

    public int getReservationInfants() {
        return reservationInfants;
    }

    public void setReservationInfants(int reservationInfants) {
        this.reservationInfants = reservationInfants;
    }

    public double getReservationAmount() {
        return reservationAmount;
    }

    public void setReservationAmount(double reservationAmount) {
        this.reservationAmount = reservationAmount;
    }

    public Customer getReservationCustomer() {
        return reservationCustomer;
    }

    public void setReservationCustomer(Customer reservationCustomer) {
        this.reservationCustomer = reservationCustomer;
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

    @Override
    public String toString() {
        return "Reservation{" +
                "id=" + id +
                ", trip=" + trip +
                ", reservationDateAndTime=" + reservationDateAndTime +
                ", reservationCompleted=" + reservationCompleted +
                ", reservationAdults=" + reservationAdults +
                ", reservationChildren=" + reservationChildren +
                ", reservationInfants=" + reservationInfants +
                ", reservationAmount=" + reservationAmount +
                ", reservationCustomer=" + reservationCustomer +
                ", reservationPlaceFrom=" + reservationPlaceFrom +
                ", reservationPlaceTo=" + reservationPlaceTo +
                '}';
    }
}

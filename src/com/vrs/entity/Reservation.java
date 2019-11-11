package com.vrs.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int reservationTrip;
    private Date reservationDateAndTime;
    private boolean reservationCompleted;
    private int reservationAdults;
    private int reservationChildren;
    private int reservationInfants;
    private String reservationComments;

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

    public int getReservationTrip() {
        return reservationTrip;
    }

    public void setReservationTrip(int reservationTrip) {
        this.reservationTrip = reservationTrip;
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

    public String getReservationComments() {
        return reservationComments;
    }

    public void setReservationComments(String reservationComments) {
        this.reservationComments = reservationComments;
    }

    @Override
    public String toString() {
        return "Reservation{" +
                "id=" + id +
                ", reservationTrip=" + reservationTrip +
                ", reservationDateAndTime=" + reservationDateAndTime +
                ", reservationCompleted=" + reservationCompleted +
                ", reservationAdults=" + reservationAdults +
                ", reservationChildren=" + reservationChildren +
                ", reservationInfants=" + reservationInfants +
                ", reservationComments='" + reservationComments + '\'' +
                ", reservationCustomer=" + reservationCustomer +
                ", reservationPlaceFrom=" + reservationPlaceFrom +
                ", reservationPlaceTo=" + reservationPlaceTo +
                '}';
    }
}

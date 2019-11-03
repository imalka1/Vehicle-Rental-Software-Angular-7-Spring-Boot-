package com.vrs.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String placeName;

//    @OneToOne(mappedBy = "reservationPlaceFrom")
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    @JsonIgnore
//    private Reservation reservationFrom;
//
//    @OneToOne(mappedBy = "reservationPlaceTo")
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    @JsonIgnore
//    private Reservation reservationTo;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }

    @Override
    public String toString() {
        return "Place{" +
                "id=" + id +
                ", placeName='" + placeName + '\'' +
                '}';
    }

    //    public Reservation getReservationFrom() {
//        return reservationFrom;
//    }
//
//    public void setReservationFrom(Reservation reservationFrom) {
//        this.reservationFrom = reservationFrom;
//    }
//
//    public Reservation getReservationTo() {
//        return reservationTo;
//    }
//
//    public void setReservationTo(Reservation reservationTo) {
//        this.reservationTo = reservationTo;
//    }

}

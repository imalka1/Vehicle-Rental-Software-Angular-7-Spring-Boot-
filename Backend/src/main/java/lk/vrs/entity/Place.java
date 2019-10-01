package lk.vrs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String placeName;
    private String placeCategory;
    private double latitude;
    private double longitude;

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

    public String getPlaceCategory() {
        return placeCategory;
    }

    public void setPlaceCategory(String placeCategory) {
        this.placeCategory = placeCategory;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    @Override
    public String toString() {
        return "Place{" +
                "id=" + id +
                ", placeName='" + placeName + '\'' +
                ", placeCategory='" + placeCategory + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
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

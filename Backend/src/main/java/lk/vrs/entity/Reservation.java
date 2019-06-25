package lk.vrs.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Date reservationDate;
    private Time reservationTime;
    private boolean reservationCompleted;

    @OneToOne
    @JoinColumn(nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Place reservationPlaceFrom;

    @OneToOne
    @JoinColumn(nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Place reservationPlaceTo;

    @OneToOne
    @JoinColumn(nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Vehicle reservationVehicle;

    @OneToOne
    @JoinColumn(nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
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

    public Time getReservationTime() {
        return reservationTime;
    }

    public void setReservationTime(Time reservationTime) {
        this.reservationTime = reservationTime;
    }

    public boolean isReservationCompleted() {
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

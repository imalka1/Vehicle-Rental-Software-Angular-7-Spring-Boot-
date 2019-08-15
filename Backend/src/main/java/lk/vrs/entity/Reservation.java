package lk.vrs.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;
import java.sql.Time;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
//    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "yyyy-MM-dd'T'HH:mm")
    private Date reservationDateAndTime;
    //    @Temporal(TemporalType.TIME)
//    private Date reservationTime;
//    @Temporal(TemporalType.TIMESTAMP)
//    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private Date submissionDateAndTime;
    private boolean reservationCompleted;
    private double reservationAmount;
    private int reservationPaymentKey;

    @OneToOne
    @JoinColumn(nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private Place reservationPlaceFrom;

    @OneToOne
    @JoinColumn(nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private Place reservationPlaceTo;

    @OneToOne
    @JoinColumn(nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private Vehicle reservationVehicle;

    @OneToOne
    @JoinColumn(nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private Customer reservationCustomer;

    public Date getReservationDateAndTime() {
        return reservationDateAndTime;
    }

    public void setReservationDateAndTime(Date reservationDateAndTime) {
        this.reservationDateAndTime = reservationDateAndTime;
    }

    public Date getSubmissionDateAndTime() {
        return submissionDateAndTime;
    }

    public void setSubmissionDateAndTime(Date submissionDateAndTime) {
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

//    public Date getReservationDate() {
//        return reservationDate;
//    }
//
//    public void setReservationDate(Date reservationDate) {
//        this.reservationDate = reservationDate;
//    }
//
//    public Date getReservationTime() {
//        return reservationTime;
//    }
//
//    public void setReservationTime(Date reservationTime) {
//        this.reservationTime = reservationTime;
//    }

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

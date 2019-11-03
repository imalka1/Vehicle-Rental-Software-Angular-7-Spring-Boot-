package com.vrs.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Date reservationDateAndTime;
    private boolean reservationCompleted;
    private double reservationAmount;

    @OneToOne
    @JoinColumn(nullable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private Customer reservationCustomer;
}

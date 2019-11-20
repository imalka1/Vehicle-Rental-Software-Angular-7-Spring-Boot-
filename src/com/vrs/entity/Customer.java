package com.vrs.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Customer {
    @Id
    private String customerEmail;
    private String customerTitle;
    private String customerName;
    private String customerContactNumber;

//    @OneToMany(mappedBy = "customer")
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    private Set<RentalSystem> customerComments;

//    @OneToOne(cascade = CascadeType.PERSIST, mappedBy = "reservationCustomer")
//    @OnDelete(action = OnDeleteAction.CASCADE)
////    @JsonIgnore
//    private Reservation reservation;

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerContactNumber() {
        return customerContactNumber;
    }

    public void setCustomerContactNumber(String customerContactNumber) {
        this.customerContactNumber = customerContactNumber;
    }

    public String getCustomerTitle() {
        return customerTitle;
    }

    public void setCustomerTitle(String customerTitle) {
        this.customerTitle = customerTitle;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "customerEmail='" + customerEmail + '\'' +
                ", customerTitle='" + customerTitle + '\'' +
                ", customerName='" + customerName + '\'' +
                ", customerContactNumber='" + customerContactNumber + '\'' +
                '}';
    }

    //    public Reservation getReservation() {
//        return reservation;
//    }
//
//    public void setReservation(Reservation reservation) {
//        this.reservation = reservation;
//    }

}

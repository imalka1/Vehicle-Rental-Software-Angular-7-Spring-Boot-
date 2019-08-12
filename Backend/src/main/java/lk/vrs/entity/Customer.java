package lk.vrs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String customerName;
    private String customerEmail;
    private String customerContactNumber;

    @OneToMany(mappedBy = "customer")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<Comment> customerComments;

//    @OneToOne(cascade = CascadeType.PERSIST, mappedBy = "reservationCustomer")
//    @OnDelete(action = OnDeleteAction.CASCADE)
////    @JsonIgnore
//    private Reservation reservation;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

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

    public Set<Comment> getCustomerComments() {
        return customerComments;
    }

    public void setCustomerComments(Set<Comment> customerComments) {
        this.customerComments = customerComments;
    }

    //    public Reservation getReservation() {
//        return reservation;
//    }
//
//    public void setReservation(Reservation reservation) {
//        this.reservation = reservation;
//    }

}

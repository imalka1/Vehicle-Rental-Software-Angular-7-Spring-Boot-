package com.vrs.entity;

import javax.persistence.*;

@Entity
public class RentalSystem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String address;
    private String telNumber;
    private String emailAddress;
    private String emailPassword;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTelNumber() {
        return telNumber;
    }

    public void setTelNumber(String telNumber) {
        this.telNumber = telNumber;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getEmailPassword() {
        return emailPassword;
    }

    public void setEmailPassword(String emailPassword) {
        this.emailPassword = emailPassword;
    }

    @Override
    public String toString() {
        return "RentalSystem{" +
                "id=" + id +
                ", address='" + address + '\'' +
                ", telNumber='" + telNumber + '\'' +
                ", emailAddress='" + emailAddress + '\'' +
                ", emailPassword='" + emailPassword + '\'' +
                '}';
    }
}

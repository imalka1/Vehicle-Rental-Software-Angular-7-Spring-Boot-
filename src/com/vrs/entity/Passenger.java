package com.vrs.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Passenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int passengersCount;
    private double passengersPrice;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getPassengersCount() {
        return passengersCount;
    }

    public void setPassengersCount(int passengersCount) {
        this.passengersCount = passengersCount;
    }

    public double getPassengersPrice() {
        return passengersPrice;
    }

    public void setPassengersPrice(double passengersPrice) {
        this.passengersPrice = passengersPrice;
    }

    @Override
    public String toString() {
        return "Passenger{" +
                "id=" + id +
                ", passengersCount=" + passengersCount +
                ", passengersPrice=" + passengersPrice +
                '}';
    }
}

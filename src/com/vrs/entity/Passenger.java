package com.vrs.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Passenger {
    @Id
    private int passengersCount;
    private double passengersPrice;

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
                ", passengersCount=" + passengersCount +
                ", passengersPrice=" + passengersPrice +
                '}';
    }
}

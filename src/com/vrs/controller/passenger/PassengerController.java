package com.vrs.controller.passenger;

import com.vrs.dao.PassengerDAO;

public class PassengerController {

    public String getPrice(int count) {
        return String.format("%.2f", new PassengerDAO().getPassengersPrice(Integer.valueOf(count)));
    }
}

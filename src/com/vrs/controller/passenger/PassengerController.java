package com.vrs.controller.passenger;

import com.vrs.dao.PassengerDAO;
import com.vrs.service.PassengerService;

public class PassengerController {

    public String getPrice(int count) {
        return new PassengerService().getPrice(count);
    }
}

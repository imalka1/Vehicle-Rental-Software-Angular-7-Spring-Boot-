package com.vrs.controller.reservation;

import com.vrs.dao.ReservationDAO;
import com.vrs.entity.Reservation;
import com.vrs.service.ReservationService;

public class ReservationController {
    public Reservation getReservation(long id) {
        return new ReservationService().getReservation(id);
    }
}

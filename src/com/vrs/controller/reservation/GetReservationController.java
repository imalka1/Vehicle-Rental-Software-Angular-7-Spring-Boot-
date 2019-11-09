package com.vrs.controller.reservation;

import com.vrs.dao.ReservationDAO;
import com.vrs.entity.Reservation;

public class GetReservationController {
    public Reservation getReservation(long id) {
        return new ReservationDAO().getReservation(id);
    }
}

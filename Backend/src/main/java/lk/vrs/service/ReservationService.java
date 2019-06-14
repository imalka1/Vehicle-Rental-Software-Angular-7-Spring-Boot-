package lk.vrs.service;

import lk.vrs.entity.Reservation;

import java.util.ArrayList;
import java.util.List;

public interface ReservationService {
    int getTableRowCount();

    List<Reservation> getReservationDates(int start,int limit);

//    List<Reservation> getReservationDates(int id);
}

package lk.vrs.service;

import lk.vrs.dto.ReservationDTO;
import lk.vrs.entity.Reservation;

import java.util.ArrayList;
import java.util.List;

public interface ReservationService {
    int getTableRowCount();

    List<ReservationDTO> getReservationDates(int start, int limit);

//    List<Reservation> getReservationDates(int id);
}

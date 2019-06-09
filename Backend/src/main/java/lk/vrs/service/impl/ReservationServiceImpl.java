package lk.vrs.service.impl;

import lk.vrs.entity.Reservation;
import lk.vrs.repository.ReservationRepository;
import lk.vrs.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public int getTableRowCount() {
        Object tableRowCount = reservationRepository.getTableRowCount();
        return Integer.parseInt(tableRowCount.toString());
    }

    @Override
    public List<Reservation> getReservationDates(int start, int limit) {
        List<Object[]> reservationDates = reservationRepository.getReservationDates(start, limit);
        List<Reservation> reservations = new ArrayList<>();
        for (Object[] reservationDate : reservationDates) {
            Reservation reservation = new Reservation();
            reservation.setReservationId(Integer.parseInt(reservationDate[0].toString()));
            reservation.setDateOfReservation(reservationDate[1].toString());
            reservations.add(reservation);
        }
        return reservations;
    }
}

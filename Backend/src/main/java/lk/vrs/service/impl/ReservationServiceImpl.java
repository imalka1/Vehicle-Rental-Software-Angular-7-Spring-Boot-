package lk.vrs.service.impl;

import lk.vrs.entity.Reservation;
import lk.vrs.repository.ReservationRepository;
import lk.vrs.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public int getTableRowCount() {
        return reservationRepository.getTableRowCount();
    }

    @Override
    public List<Reservation> getReservationDates(int start, int limit) {
        return reservationRepository.getReservationDates(PageRequest.of(start, limit));
    }

//    @Override
//    public List<Reservation> getReservationDates(int id) {
//        return reservationRepository.getReservationDates(id);
//    }
}

package lk.vrs.service.impl;

import lk.vrs.dto.ReservationDTO;
import lk.vrs.entity.Reservation;
import lk.vrs.repository.ReservationRepository;
import lk.vrs.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
    public List<ReservationDTO> getReservationDates(int start, int limit) {
        List<Reservation> reservationDates = reservationRepository.getReservationDates(PageRequest.of(start, limit));
        List<ReservationDTO> reservationDTOS = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
        SimpleDateFormat timeFormat = new SimpleDateFormat("KK:mm a");
        try {
            for (Reservation reservationDate : reservationDates) {
                Date dateObj = sdf.parse(reservationDate.getReservationTime().toString());
                ReservationDTO reservationDTO = new ReservationDTO();
                reservationDTO.setId(reservationDate.getId());
                reservationDTO.setReservationDate(reservationDate.getReservationDate());
                reservationDTO.setReservationTime(timeFormat.format(dateObj));
                if (reservationDate.isReservationCompleted()) {
                    reservationDTO.setReservationCompleted("Ended");
                } else {
                    reservationDTO.setReservationCompleted("Not yet");
                }
                reservationDTO.setReservationPlaceFrom(reservationDate.getReservationPlaceFrom());
                reservationDTO.setReservationPlaceTo(reservationDate.getReservationPlaceTo());
                reservationDTO.setReservationVehicle(reservationDate.getReservationVehicle());
                reservationDTOS.add(reservationDTO);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return reservationDTOS;
    }

//    @Override
//    public List<Reservation> getReservationDates(int id) {
//        return reservationRepository.getReservationDates(id);
//    }
}

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
                Date dateObj = sdf.parse(reservationDate.getTimeOfReservation().toString());
                ReservationDTO reservationDTO = new ReservationDTO();
                reservationDTO.setReservationId(reservationDate.getReservationId());
                reservationDTO.setDateOfReservation(reservationDate.getDateOfReservation());
                reservationDTO.setTimeOfReservation(timeFormat.format(dateObj));
                if (reservationDate.isCompleted()) {
                    reservationDTO.setCompleted("Ended");
                } else {
                    reservationDTO.setCompleted("Not yet");
                }
                reservationDTO.setPlaceFrom(reservationDate.getPlaceFrom());
                reservationDTO.setPlaceTo(reservationDate.getPlaceTo());
                reservationDTO.setVehicle(reservationDate.getVehicle());
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

package lk.vrs.service.impl;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Sku;
import lk.vrs.dto.PaymentDTO;
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
import java.util.*;

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


    @Override
    public PaymentDTO makeReservation(Reservation reservation) {
        reservation.setReservationPaymentKey(new Random().nextInt(1000000) + 1000000);
//        Reservation reservationObj = reservationRepository.save(reservation);

        Stripe.apiKey = "sk_test_qTewRRZA04hZEuCicmgIuKGO00gc8VvfHP";

        Map<String, Object> skuParams = new HashMap<String, Object>();
        skuParams.put("product", "prod_FYBhOvEBhw8eli");
//        skuParams.put("name", "van");
        skuParams.put("price", 1500);
        skuParams.put("currency", "eur");
        Map<String, Object> attributesParams = new HashMap<String, Object>();
        attributesParams.put("name", "Reservation");
        skuParams.put("attributes", attributesParams);
        Map<String, Object> metaDataParams = new HashMap<String, Object>();
        metaDataParams.put("from", "Galle");
        metaDataParams.put("to", "Colombo");
        metaDataParams.put("time", "9:45 AM");
        metaDataParams.put("total", "5");
        skuParams.put("metadata", metaDataParams);
        Map<String, Object> inventoryParams = new HashMap<String, Object>();
        inventoryParams.put("type", "infinite");
//        inventoryParams.put("quantity", 500);
        skuParams.put("inventory", inventoryParams);
        Sku sku = null;
        try {
            sku = Sku.create(skuParams);
        } catch (StripeException e) {
            e.printStackTrace();
        }

        return new PaymentDTO(sku.getId(), reservation);
    }

    @Override
    public Reservation getPaymentKey(Reservation reservation) {
        return reservationRepository.getPaymentKey(reservation.getId());
    }


//    @Override
//    public List<Reservation> getReservationDates(int id) {
//        return reservationRepository.getReservationDates(id);
//    }
}

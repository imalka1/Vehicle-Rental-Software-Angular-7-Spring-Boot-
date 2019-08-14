package lk.vrs.service.impl;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Sku;
import lk.vrs.dto.CreditcardDTO;
import lk.vrs.dto.PaymentDTO;
import lk.vrs.dto.ReservationDTO;
import lk.vrs.entity.Customer;
import lk.vrs.entity.Reservation;
import lk.vrs.entity.Vehicle;
import lk.vrs.repository.CustomerRepository;
import lk.vrs.repository.ReservationRepository;
import lk.vrs.repository.VehicleRepository;
import lk.vrs.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

//import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public int getTableRowCount() {
        return reservationRepository.getTableRowCount();
    }

    @Override
    public List<ReservationDTO> getReservationDates(int start, int limit) {
        List<Reservation> reservationDates = reservationRepository.findAll(PageRequest.of(start, limit)).getContent();
        List<ReservationDTO> reservationDTOS = new ArrayList<>();
        for (Reservation reservationDate : reservationDates) {
//                Date dateObj = sdf.parse(reservationDate.getReservationTime().toString());
            ReservationDTO reservationDTO = new ReservationDTO();
            reservationDTO.setId(reservationDate.getId());
            reservationDTO.setReservationDate(new SimpleDateFormat("yyyy-MM-dd").format(reservationDate.getReservationDateAndTime()));
            reservationDTO.setReservationTime(new SimpleDateFormat("KK:mm a").format(reservationDate.getReservationDateAndTime()));
            reservationDTO.setReservationCompleted(reservationDate.isReservationCompleted());
            reservationDTO.setReservationPlaceFrom(reservationDate.getReservationPlaceFrom());
            reservationDTO.setReservationPlaceTo(reservationDate.getReservationPlaceTo());
            reservationDTO.setReservationVehicle(reservationDate.getReservationVehicle());
            reservationDTOS.add(reservationDTO);
        }
        return reservationDTOS;
    }


    @Override
    public PaymentDTO makeReservation(CreditcardDTO creditcardDTO) {
        Reservation reservation = new Reservation();
        reservation.setReservationPaymentKey(new Random().nextInt(1000000) + 1000000);
//        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
//        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
        try {
            reservation.setReservationDateAndTime(new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(creditcardDTO.getReservationDTO().getReservationDateAndTime()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        reservation.setSubmissionDateAndTime(new Date());
        reservation.setReservationCompleted(creditcardDTO.getReservationDTO().getReservationCompleted());
        reservation.setReservationAmount(creditcardDTO.getReservationDTO().getReservationAmount());
        reservation.setReservationPlaceFrom(creditcardDTO.getReservationDTO().getReservationPlaceFrom());
        reservation.setReservationPlaceTo(creditcardDTO.getReservationDTO().getReservationPlaceTo());
        Vehicle vehicle = vehicleRepository.findById((long) 1).get();
        vehicle.setVehicleReserved(true);
        reservation.setReservationVehicle(vehicle);
        if (creditcardDTO.getReservationDTO().getReservationCustomer().getId() == 0) {
            reservation.setReservationCustomer(customerRepository.save(creditcardDTO.getReservationDTO().getReservationCustomer()));
        } else {
            reservation.setReservationCustomer(creditcardDTO.getReservationDTO().getReservationCustomer());
        }
        Reservation reservationObj = reservationRepository.save(reservation);

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
        metaDataParams.put("from", creditcardDTO.getReservationDTO().getReservationPlaceFrom().getPlaceName());
        metaDataParams.put("to", creditcardDTO.getReservationDTO().getReservationPlaceTo().getPlaceName());
        metaDataParams.put("date time", creditcardDTO.getReservationDTO().getReservationDateAndTime());
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

        return new PaymentDTO(sku.getId(), reservationObj);
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

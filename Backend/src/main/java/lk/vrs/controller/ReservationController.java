package lk.vrs.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Sku;
import lk.vrs.dto.CreditcardDTO;
import lk.vrs.dto.PaymentDTO;
import lk.vrs.dto.ReservationDTO;
import lk.vrs.entity.Reservation;
import lk.vrs.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/reservation")
public class ReservationController {

    @Value("${stripe.keys.public}")
    private String API_PUBLIC_KEY;

    @Autowired
    private ReservationService reservationService;

    @GetMapping(value = "/admin/reservations/rowCount")
    public int getReservationTableRowCount() {
        return reservationService.getTableRowCount();
    }

    @GetMapping(value = "/admin/reservationDates/{start}/{limit}")
    public List<ReservationDTO> getReservedDates(@PathVariable int start, @PathVariable int limit) {
        return reservationService.getReservationDates(start, limit);
    }

    @PostMapping("/make_reservation")
    public PaymentDTO makeReservation(@RequestBody CreditcardDTO creditcardDTO) {
        return reservationService.makeReservation(creditcardDTO);
    }

    @GetMapping("/get_payment_key")
    public Reservation getPaymentKey(@RequestBody Reservation reservation) {
        return reservationService.getPaymentKey(reservation);
    }

//    @PostMapping("/create_charge")
//    public PaymentDTO createCharge(@RequestBody CreditcardDTO creditcardDTO) {
////        //validate data
////        System.out.println(creditcardDTO.getKeyToken());
////        if (creditcardDTO.getKeyToken() == null) {
////            return new ResponseDTO(false, "Stripe payment token is missing. Please, try again later.");
////        }
////
////        creditcardDTO.setAmount(899);
////        String chargeId = stripeService.createCharge(creditcardDTO); //$9.99 USD
////        if (chargeId == null) {
////            return new ResponseDTO(false, "An error occurred while trying to create a charge.");
////        }
////
////        // You may want to store charge id along with order information
//
//        Stripe.apiKey = "sk_test_qTewRRZA04hZEuCicmgIuKGO00gc8VvfHP";
//
//        Map<String, Object> skuParams = new HashMap<String, Object>();
//        skuParams.put("product", "prod_FYBhOvEBhw8eli");
////        skuParams.put("name", "van");
//        skuParams.put("price", 1500);
//        skuParams.put("currency", "eur");
//        Map<String, Object> attributesParams = new HashMap<String, Object>();
//        attributesParams.put("name", "Reservation");
//        skuParams.put("attributes", attributesParams);
//        Map<String, Object> metaDataParams = new HashMap<String, Object>();
//        metaDataParams.put("from", "Galle");
//        metaDataParams.put("to", "Colombo");
//        metaDataParams.put("time", "9:45 AM");
//        metaDataParams.put("total", "5");
//        skuParams.put("metadata", metaDataParams);
//        Map<String, Object> inventoryParams = new HashMap<String, Object>();
//        inventoryParams.put("type", "infinite");
////        inventoryParams.put("quantity", 500);
//        skuParams.put("inventory", inventoryParams);
//        Sku sku = null;
//        try {
//            sku = Sku.create(skuParams);
//        } catch (StripeException e) {
//            e.printStackTrace();
//        }
//
//        return new PaymentDTO(sku.getId());
//    }

//    @GetMapping(value = "/admin/reservationDates/{start}")
//    public List<Reservation> getReservationDates(@PathVariable int start) {
//        return reservationService.getReservationDates(start);
//    }
}

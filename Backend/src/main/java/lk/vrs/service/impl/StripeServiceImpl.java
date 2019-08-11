package lk.vrs.service.impl;

import com.stripe.Stripe;
import com.stripe.model.Charge;
import lk.vrs.dto.CreditcardDTO;
import lk.vrs.repository.ReservationRepository;
import lk.vrs.service.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeServiceImpl implements StripeService {

    @Value("${stripe.keys.secret}")
    private String API_SECRET_KEY;

    @Autowired
    private ReservationRepository reservationRepository;

//    public String createCustomer(String email, String token) {
//        String id = null;
//        try {
//            Stripe.apiKey = API_SECRET_KEY;
//            Map<String, Object> customerParams = new HashMap<>();
//            // add customer unique id here to track them in your web application
//            customerParams.put("description", "Customer for " + email);
//            customerParams.put("email", email);
//
//            customerParams.put("source", token); // ^ obtained with Stripe.js
//            //create a new customer
//            Customer customer = Customer.create(customerParams);
//            id = customer.getId();
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        return id;
//    }

//    public String createSubscription(String customerId, String plan, String coupon) {
//        String id = null;
//        try {
//            Stripe.apiKey = API_SECRET_KEY;
//            Map<String, Object> item = new HashMap<>();
//            item.put("plan", plan);
//
//            Map<String, Object> items = new HashMap<>();
//            items.put("0", item);
//
//            Map<String, Object> params = new HashMap<>();
//            params.put("customer", customerId);
//            params.put("items", items);
//
//            //add coupon if available
//            if (!coupon.isEmpty()) {
//                params.put("coupon", coupon);
//            }
//
//            Subscription sub = Subscription.create(params);
//            id = sub.getId();
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        return id;
//    }
//
//    public boolean cancelSubscription(String subscriptionId) {
//        boolean status;
//        try {
//            Stripe.apiKey = API_SECRET_KEY;
//            Subscription sub = Subscription.retrieve(subscriptionId);
//            sub.cancel(null);
//            status = true;
//        } catch (Exception ex) {
//            ex.printStackTrace();
//            status = false;
//        }
//        return status;
//    }

//    public Coupon retrieveCoupon(String code) {
//        try {
//            Stripe.apiKey = API_SECRET_KEY;
//            return Coupon.retrieve(code);
//        } catch (Exception ex) {
//            ex.printStackTrace();
//        }
//        return null;
//    }

    //    public String createCharge(String email, String token, int amount,String card) {
    public String createCharge(CreditcardDTO creditcardDTO) {
        String id = null;
        try {
            Stripe.apiKey = API_SECRET_KEY;
            Map<String, Object> chargeParams = new HashMap<>();
//            chargeParams.put("type", "three_d_secure");
            chargeParams.put("amount", creditcardDTO.getAmount());
            chargeParams.put("currency", "usd");
            chargeParams.put("description", "Charge for " + creditcardDTO.getEmail());
            chargeParams.put("source", creditcardDTO.getKeyToken()); // ^ obtained with Stripe.js
//            chargeParams.put("type", "three_d_secure");
//            Map<String, Object> redirectParams = new HashMap<String, Object>();
//            redirectParams.put("return_url", "https://shop.example.com/crtA6B28E1");
//            chargeParams.put("redirect", redirectParams);
//            Map<String, Object> threeDSecureParams = new HashMap<String, Object>();
//            threeDSecureParams.put("card", creditcardDTO.getCard());
//            chargeParams.put("three_d_secure", threeDSecureParams);
//            Map<String, Object> chargeParams1 = new HashMap<>();
//            chargeParams1.put("three_d_secure", "automatic");
//            Map<String, Object> chargeParams2 = new HashMap<>();
//            chargeParams2.put("card", chargeParams1);
//            chargeParams.put("payment_method_details", chargeParams2);

//            Map<String, Object> sourceParams = new HashMap<String, Object>();
//            sourceParams.put("amount", 999);
//            sourceParams.put("currency", "usd");
//            sourceParams.put("type", "three_d_secure");
//            Map<String, Object> redirectParams = new HashMap<String, Object>();
//            redirectParams.put("return_url", "https://shop.example.com/crtA6B28E1");
//            sourceParams.put("redirect", redirectParams);
//            Map<String, Object> threeDSecureParams = new HashMap<String, Object>();
//            threeDSecureParams.put("card", creditcardDTO.getCard());
//            sourceParams.put("three_d_secure", threeDSecureParams);
//            sourceParams.put("source", creditcardDTO.getKeyToken()); // ^ obtained with Stripe.js
//            Source source = Source.create(sourceParams);

            //create a charge
            Charge charge = Charge.create(chargeParams);
            id = charge.getId();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return id;
    }

}

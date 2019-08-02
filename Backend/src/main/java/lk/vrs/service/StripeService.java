package lk.vrs.service;

import com.stripe.exception.*;
import com.stripe.model.Charge;
import com.stripe.model.Coupon;
import lk.vrs.dto.CardDTO;

public interface StripeService {

//    public String createCustomer(String email, String token);

//    public String createSubscription(String customerId, String plan, String coupon);

//    public boolean cancelSubscription(String subscriptionId);

    public Coupon retrieveCoupon(String code);

    public String createCharge(CardDTO cardDTO);
}

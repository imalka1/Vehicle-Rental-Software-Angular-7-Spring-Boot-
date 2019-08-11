package lk.vrs.service;

import lk.vrs.dto.CreditcardDTO;

public interface StripeService {

//    public String createCustomer(String email, String token);

//    public String createSubscription(String customerId, String plan, String coupon);

//    public boolean cancelSubscription(String subscriptionId);

//    Coupon retrieveCoupon(String code);

    String createCharge(CreditcardDTO creditcardDTO);
}

package lk.vrs.service;

import com.stripe.exception.*;
import com.stripe.model.Charge;
import lk.vrs.dto.ChargeRequest;

public interface StripeService {
    Charge charge(ChargeRequest chargeRequest) throws AuthenticationException, InvalidRequestException, APIConnectionException, CardException, APIException;
}

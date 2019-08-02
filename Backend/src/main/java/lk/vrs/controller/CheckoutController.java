package lk.vrs.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Coupon;
import com.stripe.model.Sku;
import lk.vrs.dto.CardDTO;
import lk.vrs.dto.ResponseDTO;
import lk.vrs.dto.SkuDTO;
import lk.vrs.service.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/checkout")
public class CheckoutController {

    @Value("${stripe.keys.public}")
    private String API_PUBLIC_KEY;

    @Autowired
    private StripeService stripeService;

//    @GetMapping("/")
//    public String homepage() {
//        return "homepage";
//    }

//    @GetMapping("/subscription")
//    public String subscriptionPage(Model model) {
//        model.addAttribute("stripePublicKey", API_PUBLIC_KEY);
//        return "subscription";
//    }

//    @GetMapping("/charge")
//    public String chargePage(Model model) {
//        model.addAttribute("stripePublicKey", API_PUBLIC_KEY);
//        return "charge";
//    }

    /*========== REST APIs for Handling Payments ===================*/

//    @PostMapping("/create-subscription")
//    public ResponseDTO createSubscription(String email, String token, String plan, String coupon) {
//        //validate data
//        if (token == null || plan.isEmpty()) {
//            return new ResponseDTO(false, "Stripe payment token is missing. Please, try again later.");
//        }
//
//        //create customer first
//        String customerId = stripeService.createCustomer(email, token);
//
//        if (customerId == null) {
//            return new ResponseDTO(false, "An error occurred while trying to create a customer.");
//        }
//
//        //create subscription
//        String subscriptionId = stripeService.createSubscription(customerId, plan, coupon);
//        if (subscriptionId == null) {
//            return new ResponseDTO(false, "An error occurred while trying to create a subscription.");
//        }
//
//        // Ideally you should store customerId and subscriptionId along with customer object here.
//        // These values are required to update or cancel the subscription at later stage.
//
//        return new ResponseDTO(true, "Success! Your subscription id is " + subscriptionId);
//    }
//
//    @PostMapping("/cancel-subscription")
//    public @ResponseBody
//    ResponseDTO cancelSubscription(String subscriptionId) {
//        boolean status = stripeService.cancelSubscription(subscriptionId);
//        if (!status) {
//            return new ResponseDTO(false, "Failed to cancel the subscription. Please, try later.");
//        }
//        return new ResponseDTO(true, "Subscription cancelled successfully.");
//    }

    @PostMapping("/coupon-validator")
    public @ResponseBody
    ResponseDTO couponValidator(String code) {
        Coupon coupon = stripeService.retrieveCoupon(code);
        if (coupon != null && coupon.getValid()) {
            String details = (coupon.getPercentOff() == null ? "$" + (coupon.getAmountOff() / 100) : coupon.getPercentOff() + "%") +
                    " OFF " + coupon.getDuration();
            return new ResponseDTO(true, details);
        } else {
            return new ResponseDTO(false, "This coupon code is not available. This may be because it has expired or has " +
                    "already been applied to your account.");
        }
    }

    @PostMapping("/create_charge")
    public SkuDTO createCharge(@RequestBody CardDTO cardDTO) {
//        //validate data
//        System.out.println(cardDTO.getKeyToken());
//        if (cardDTO.getKeyToken() == null) {
//            return new ResponseDTO(false, "Stripe payment token is missing. Please, try again later.");
//        }
//
//        cardDTO.setAmount(899);
//        String chargeId = stripeService.createCharge(cardDTO); //$9.99 USD
//        if (chargeId == null) {
//            return new ResponseDTO(false, "An error occurred while trying to create a charge.");
//        }
//
//        // You may want to store charge id along with order information

        Stripe.apiKey = "sk_test_qTewRRZA04hZEuCicmgIuKGO00gc8VvfHP";

        Map<String, Object> skuParams = new HashMap<String, Object>();
        skuParams.put("product", "prod_FYBhOvEBhw8eli");
//        skuParams.put("name", "van");
        skuParams.put("price", 1500);
        skuParams.put("currency", "eur");
        Map<String, Object> attributesParams = new HashMap<String, Object>();
        attributesParams.put("name", "Bus");
//        attributesParams.put("size", "Medium");
//        attributesParams.put("gender", "Unisex");
        skuParams.put("attributes", attributesParams);
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

        return new SkuDTO(sku.getId());
    }
}

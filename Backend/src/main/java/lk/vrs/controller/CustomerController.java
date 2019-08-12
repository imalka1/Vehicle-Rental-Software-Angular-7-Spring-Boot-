package lk.vrs.controller;

import lk.vrs.entity.Customer;
import lk.vrs.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping(value = "/customer_via_email/{emailAddress}")
    public Customer getCustomerViaEmail(@PathVariable String emailAddress){
        return customerService.getCustomerViaEmail(emailAddress);
    }
}

package lk.vrs.service;

import lk.vrs.entity.Customer;

public interface CustomerService {
    Customer getCustomerViaEmail(String emailAddress);
}

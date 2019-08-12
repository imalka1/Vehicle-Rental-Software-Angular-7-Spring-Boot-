package lk.vrs.service.impl;

import lk.vrs.entity.Customer;
import lk.vrs.repository.CustomerRepository;
import lk.vrs.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Customer getCustomerViaEmail(String emailAddress) {
        return customerRepository.getCustomerViaEmail(emailAddress);
    }
}

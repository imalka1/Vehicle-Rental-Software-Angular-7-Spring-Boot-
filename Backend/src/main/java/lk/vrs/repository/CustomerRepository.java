package lk.vrs.repository;

import lk.vrs.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query(value = "from Customer where customerEmail=?1")
    Customer getCustomerViaEmail(String email);
}

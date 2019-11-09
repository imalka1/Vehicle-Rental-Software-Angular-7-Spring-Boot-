package com.vrs.dao;

import com.vrs.entity.Customer;
import com.vrs.entity.Passenger;
import com.vrs.hibernate.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.ArrayList;
import java.util.List;

public class CustomerDAO {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public Customer getCustomerViaEmail(String email) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        try {
            tx = session.beginTransaction();
            List customers = session.createQuery("from Customer where customerEmail=?1")
                    .setParameter(1, email)
                    .list();
            tx.commit();
            if (customers.size() > 0) {
                return (Customer) customers.get(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return null;
    }

    public Customer getCustomer(long id) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        Customer customer = null;
        try {
            tx = session.beginTransaction();
            customer = session.get(Customer.class, id);
            tx.commit();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return customer;
    }
}

package com.vrs.dao;

import com.vrs.entity.Passenger;
import com.vrs.hibernate.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.ArrayList;
import java.util.List;

public class PassengerDAO {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public double getPassengersPrice(int passengersCount) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        try {
            tx = session.beginTransaction();
            List passengers = session.createQuery("from Passenger where passengersCount=?1")
                    .setParameter(1, passengersCount)
                    .list();
            tx.commit();
            if (passengers.size() > 0) {
                Passenger passenger = (Passenger) passengers.get(0);
                return passenger.getPassengersPrice();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return 0;
    }
}

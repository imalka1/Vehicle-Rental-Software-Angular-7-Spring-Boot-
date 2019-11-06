package com.vrs.dao;

import com.vrs.entity.Passenger;
import com.vrs.hibernate.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import java.util.List;

public class PassengerDAO {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public double getPassengersPrice(int passengersCount) {
        Session session = sessionFactory.openSession();
        session.getTransaction().begin();
        List passengers = session.createQuery("from Passenger where passengersCount=?1")
                .setParameter(1, passengersCount)
                .list();
        session.getTransaction().commit();
        session.close();
        if (passengers.size() > 0) {
            Passenger passenger = (Passenger) passengers.get(0);
            return passenger.getPassengersPrice();
        } else {
            return 0;
        }
    }
}

package com.vrs.dao;

import com.vrs.entity.Customer;
import com.vrs.entity.Reservation;
import com.vrs.hibernate.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

public class ReservationDAO {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public Reservation saveRegistration(Reservation reservation) {
        Session session = sessionFactory.openSession();
        Transaction tx = null;
        try {
            tx = session.beginTransaction();
            session.saveOrUpdate(reservation.getReservationCustomer());
            session.save(reservation);
            tx.commit();
        } catch (Exception e) {
            if (tx != null) {
                tx.rollback();
            }
            e.printStackTrace();
        } finally {
            session.close();
        }
        return reservation;
    }
}

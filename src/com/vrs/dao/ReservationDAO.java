package com.vrs.dao;

import com.vrs.entity.Customer;
import com.vrs.entity.Reservation;
import com.vrs.hibernate.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.text.SimpleDateFormat;
import java.util.List;

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

    public Reservation getReservation(long id) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        Reservation reservation = null;
        try {
            tx = session.beginTransaction();
            reservation = session.get(Reservation.class, id);
            tx.commit();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return reservation;
    }

    public List<Reservation> getReservations(Reservation reservation) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        List reservations = null;
        try {
            tx = session.beginTransaction();
            reservations = session.createQuery("from Reservation where date(reservationDateAndTime)=?1 order by id desc")
                    .setParameter(1, reservation.getReservationDateAndTime())
                    .list();
            tx.commit();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return reservations;
    }

    public Reservation updateReservation(Reservation reservation) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        Reservation reservationObj;
        try {
            tx = session.beginTransaction();
            reservationObj = session.get(Reservation.class, reservation.getId());
            reservationObj.setReservationCompleted(reservation.isReservationCompleted());
            session.update(reservationObj);
            tx.commit();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            session.close();
        }
        return reservationObj;
    }

    public boolean removeReservation(Reservation reservation) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        try {
            tx = session.beginTransaction();
            session.delete(reservation);
            tx.commit();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            session.close();
        }
        return true;
    }
}

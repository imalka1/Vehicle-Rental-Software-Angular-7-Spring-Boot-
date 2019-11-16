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

    public Passenger getPassenger(int id) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        Passenger passenger = null;
        try {
            tx = session.beginTransaction();
            passenger = session.get(Passenger.class, id);
            tx.commit();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return passenger;
    }

    public int getMaxPassengersCount() {
        Session session = sessionFactory.openSession();
        Transaction tx;
        try {
            tx = session.beginTransaction();
            List maxValues = session.createQuery("select max(passengersCount) from Passenger").list();
            tx.commit();
            if (maxValues.size() > 0) {
                return (int) maxValues.get(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return 0;
    }

    public Passenger addPassenger(Passenger passenger) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        try {
            tx = session.beginTransaction();
            session.saveOrUpdate(passenger);
            tx.commit();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return passenger;
    }

    public boolean removePassenger(Passenger passenger) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        try {
            tx = session.beginTransaction();
            Passenger passengerObj = session.get(Passenger.class, passenger.getPassengersCount());
            session.delete(passengerObj);
            tx.commit();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            session.close();
        }
        return true;
    }

    public List<Passenger> getPassengers() {
        Session session = sessionFactory.openSession();
        Transaction tx;
        List passengers = null;
        try {
            tx = session.beginTransaction();
            passengers = session.createQuery("from Passenger")
                    .list();
            tx.commit();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return passengers;
    }
}

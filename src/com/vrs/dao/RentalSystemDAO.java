package com.vrs.dao;

import com.vrs.entity.Place;
import com.vrs.entity.RentalSystem;
import com.vrs.hibernate.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.ArrayList;
import java.util.List;

public class RentalSystemDAO {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public RentalSystem getRentalSystem() {
        Session session = sessionFactory.openSession();
        Transaction tx;
        try {
            tx = session.beginTransaction();
            List rentalSystem = session.createQuery("from RentalSystem")
                    .list();
            tx.commit();
            if (rentalSystem.size() > 0) {
                return (RentalSystem) rentalSystem.get(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return null;
    }
}

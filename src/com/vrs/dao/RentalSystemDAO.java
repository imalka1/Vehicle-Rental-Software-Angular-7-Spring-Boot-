package com.vrs.dao;

import com.vrs.entity.Place;
import com.vrs.entity.RentalSystem;
import com.vrs.hibernate.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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

    public boolean updateRentalSystem(RentalSystem rentalSystem) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        try {
            tx = session.beginTransaction();
            RentalSystem rentalSystemObj = session.get(RentalSystem.class, rentalSystem.getId());
            rentalSystemObj.setAddress(rentalSystem.getAddress());
            rentalSystemObj.setTelNumber(rentalSystem.getTelNumber());
            session.update(rentalSystemObj);
            tx.commit();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            session.close();
        }
    }

    public boolean updateSystemEmail(RentalSystem rentalSystem) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        try {
            tx = session.beginTransaction();
            RentalSystem rentalSystemObj = session.get(RentalSystem.class, rentalSystem.getId());
            rentalSystemObj.setEmailAddress(rentalSystem.getEmailAddress());
            rentalSystemObj.setEmailPassword(rentalSystem.getEmailPassword());
            session.update(rentalSystemObj);
            tx.commit();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            session.close();
        }
    }
}

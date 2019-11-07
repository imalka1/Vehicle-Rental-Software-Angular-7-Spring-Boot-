package com.vrs.dao;

import com.vrs.entity.Place;
import com.vrs.hibernate.HibernateUtil;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.ArrayList;
import java.util.List;

public class PlaceDAO {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public List<Place> getAllPlaces() {
        Session session = sessionFactory.openSession();
        List places = new ArrayList();
        try {
            session.getTransaction().begin();
            places = session.createQuery("from Place")
                    .list();
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return places;
    }
}

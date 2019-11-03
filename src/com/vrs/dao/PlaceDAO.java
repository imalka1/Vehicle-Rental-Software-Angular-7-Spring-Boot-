package com.vrs.dao;

import com.vrs.entity.Place;
import com.vrs.hibernate.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import java.util.List;

public class PlaceDAO {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public List<Place> getAllPlaces() {
        Session session = sessionFactory.openSession();
        session.getTransaction().begin();
        List places = session.createQuery("from Place")
                .list();
        session.getTransaction().commit();
        session.close();
        return places;
    }
}

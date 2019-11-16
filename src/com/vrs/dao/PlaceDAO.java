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
        Transaction tx;
        List places = new ArrayList();
        try {
            tx = session.beginTransaction();
            places = session.createQuery("from Place")
                    .list();
            tx.commit();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return places;
    }

    public Place getPlace(long id) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        Place place = null;
        try {
            tx = session.beginTransaction();
            place = session.get(Place.class, id);
            tx.commit();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return place;
    }

    public Place addPlace(Place place) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        try {
            tx = session.beginTransaction();
            session.saveOrUpdate(place);
            tx.commit();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return place;
    }

    public boolean removePlace(Place place) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        try {
            tx = session.beginTransaction();
            Place placeObj = session.get(Place.class, place.getId());
            session.delete(placeObj);
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

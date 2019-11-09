package com.vrs.dao;

import com.vrs.hibernate.HibernateUtil;
import org.hibernate.SessionFactory;

public class ReservationDAO {
    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
}

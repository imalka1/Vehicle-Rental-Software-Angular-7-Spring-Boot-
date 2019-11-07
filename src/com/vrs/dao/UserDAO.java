package com.vrs.dao;

import com.vrs.entity.User;
import com.vrs.hibernate.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import java.util.ArrayList;
import java.util.List;

public class UserDAO {

    private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();

    public List getAllUsers() {
        Session session = sessionFactory.openSession();
        List users = new ArrayList();
        try {
            session.getTransaction().begin();
            users = session.createQuery("from User where id=?1")
                    .setParameter(1, Long.parseLong("2"))
                    .list();
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return users;
    }

//    public static void main(String[] args) {
//        List<User> allUsers = new UserDAO().getAllUsers();
//        for (User allUser : allUsers) {
//            System.out.println(allUser);
//        }
//
//    }
}

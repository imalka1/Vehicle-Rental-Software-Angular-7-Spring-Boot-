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

    public boolean checkUser(User user) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        try {
            tx = session.beginTransaction();
            List users = session.createQuery("from User where userEmail=?1 and userPassword=?2")
                    .setParameter(1, user.getUserEmail())
                    .setParameter(2, user.getUserPassword())
                    .list();
            tx.commit();
            if (users.size() > 0) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            session.close();
        }
        return false;
    }

//    public static void main(String[] args) {
//        List<User> allUsers = new UserDAO().getAllUsers();
//        for (User allUser : allUsers) {
//            System.out.println(allUser);
//        }
//
//    }
}

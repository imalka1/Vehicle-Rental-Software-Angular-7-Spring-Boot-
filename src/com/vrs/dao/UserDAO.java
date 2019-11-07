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

    public boolean checkUser(String email, String password) {
        Session session = sessionFactory.openSession();
        try {
            session.getTransaction().begin();
            List users = session.createQuery("from User where userEmail=?1 and userPassword=?2")
                    .setParameter(1, email)
                    .setParameter(2, password)
                    .list();
            session.getTransaction().commit();
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

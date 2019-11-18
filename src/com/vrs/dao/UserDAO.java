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

    public boolean checkEmail(User user) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        try {
            tx = session.beginTransaction();
            List users = session.createQuery("from User where userEmail=?1")
                    .setParameter(1, user.getUserEmail())
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

    public boolean updateUser(User user) {
        Session session = sessionFactory.openSession();
        Transaction tx;
        try {
            tx = session.beginTransaction();
            List usersList = session.createQuery("from User where userEmail=?1")
                    .setParameter(1, user.getUserEmail())
                    .list();
            if (usersList.size() > 0) {
                User userObj = (User) usersList.get(0);
                userObj.setUserPassword(user.getUserPassword());
                session.update(userObj);
            }
            tx.commit();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            session.close();
        }
    }

//    public static void main(String[] args) {
//        List<User> allUsers = new UserDAO().getAllUsers();
//        for (User allUser : allUsers) {
//            RentalSystem.out.println(allUser);
//        }
//
//    }
}

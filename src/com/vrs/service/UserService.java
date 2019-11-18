package com.vrs.service;

import com.vrs.dao.UserDAO;
import com.vrs.entity.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class UserService {

    private UserDAO userDAO = new UserDAO();

    public void userLogin(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user = new User();
        user.setUserEmail(req.getParameter("userEmail"));
        user.setUserPassword(req.getParameter("userPassword"));
        if (userDAO.checkUser(user)) {
            HttpSession sessionLogin = req.getSession(true);
            sessionLogin.setAttribute("accountType", "logged");
            resp.sendRedirect("index.jsp");
        } else {
            resp.sendRedirect("view/admin/login.jsp?error=error");
        }
    }

    public void userLogout(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession sessionLogin = req.getSession(false);//---Load the current session
        if (sessionLogin != null) {
            sessionLogin.invalidate();//---Remove the current session
        }
        resp.sendRedirect("view/admin/login.jsp");
    }

    public void checkEmail(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user = new User();
        user.setUserEmail(req.getParameter("userEmail").trim());
        if (userDAO.checkEmail(user)) {
            resp.getWriter().println(true);
        } else {
            resp.getWriter().println(false);
        }
    }

    public void updateUser(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user = new User();
        user.setId(Long.parseLong(req.getParameter("userId").trim()));
        user.setUserEmail(req.getParameter("userEmail").trim());
        user.setUserPassword(req.getParameter("userPassword").trim());
        if (userDAO.updateUser(user)) {
            resp.getWriter().println(true);
        } else {
            resp.getWriter().println(false);
        }
    }

    public void resetPassword(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user = new User();
        user.setUserEmail(req.getParameter("userEmail").trim());
        user.setUserPassword(req.getParameter("userPassword").trim());
        if (userDAO.resetPassword(user)) {
            resp.getWriter().println(true);
        } else {
            resp.getWriter().println(false);
        }
    }

    public User getUser() {
        return userDAO.getUser();
    }
}

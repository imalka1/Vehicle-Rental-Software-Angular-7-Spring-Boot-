package com.vrs.controller.user;

import com.vrs.dao.UserDAO;
import com.vrs.entity.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = "/login")
public class LoginController extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        User user = new User();
        user.setUserEmail(req.getParameter("userEmail"));
        user.setUserPassword(req.getParameter("userPassword"));
        if (new UserDAO().checkUser(user)) {
            resp.sendRedirect("index.jsp");
        } else {
            resp.sendRedirect("index.jsp?error=error");
        }
    }
}

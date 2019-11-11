package com.vrs.controller.user;

import com.vrs.dao.UserDAO;
import com.vrs.entity.User;
import com.vrs.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet(urlPatterns = {"/login", "/logout"})
public class UserURLController extends HttpServlet {

    private void userLogin(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new UserService().userLogin(req, resp);
    }

    private void userLogout(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new UserService().userLogout(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }

    private void processRequest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String path = req.getServletPath();
        switch (path) {
            case "/login":
                userLogin(req, resp);
                break;
            case "/logout":
                userLogout(req, resp);
                break;
//
//            case SERLVET_TWO:
//                // ... call your function3
//                break;
            default:
                break;
        }
    }
}

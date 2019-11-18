package com.vrs.controller.user;

import com.vrs.service.UserService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = {"/login", "/logout", "/forgot_password", "/reset_password", "/update_password", "/get_user"})
public class UserURLController extends HttpServlet {

    private void userLogin(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new UserService().userLogin(req, resp);
    }

    private void userLogout(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new UserService().userLogout(req, resp);
    }

    private void forgotPassword(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new UserService().checkEmail(req, resp);
    }

    private void updateUser(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new UserService().updateUser(req, resp);
    }

    private void resetPassword(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new UserService().resetPassword(req, resp);
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
            case "/forgot_password":
                forgotPassword(req, resp);
                break;
            case "/reset_password":
                resetPassword(req, resp);
                break;
            case "/update_password":
                updateUser(req, resp);
                break;
            default:
                break;
        }
    }
}

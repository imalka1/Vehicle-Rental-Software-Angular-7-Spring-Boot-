package com.vrs.controller.rental_system;

import com.vrs.dao.RentalSystemDAO;
import com.vrs.entity.RentalSystem;
import com.vrs.service.RentalSystemService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = {"/update_system_details", "/update_system_email"})
public class RentalSystemURLController extends HttpServlet {

    private RentalSystemService rentalSystemService = new RentalSystemService();

    private void updateRentalSystem(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        rentalSystemService.updateRentalSystem(req, resp);
    }

    private void updateSystemEmail(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        rentalSystemService.updateSystemEmail(req, resp);
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
            case "/update_system_details":
                updateRentalSystem(req, resp);
                break;
            case "/update_system_email":
                updateSystemEmail(req, resp);
                break;
            default:
                break;
        }
    }
}

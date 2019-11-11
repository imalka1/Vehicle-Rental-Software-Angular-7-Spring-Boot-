package com.vrs.controller.reservation;

import com.vrs.dao.PlaceDAO;
import com.vrs.dao.ReservationDAO;
import com.vrs.entity.Customer;
import com.vrs.entity.Place;
import com.vrs.entity.Reservation;
import com.vrs.service.EmailService;
import com.vrs.service.ReservationService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = {"/make_reservation"})
public class ReservationURLController extends HttpServlet {

    private void makeReservation(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new ReservationService().makeReservation(req, resp);
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
            case "/make_reservation":
                makeReservation(req, resp);
                break;
//            case SERLVET_ONE:
//                // ... call your function2
//                break;
//
//            case SERLVET_TWO:
//                // ... call your function3
//                break;
            default:
                break;
        }
    }
}

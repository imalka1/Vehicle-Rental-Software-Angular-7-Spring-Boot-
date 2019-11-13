package com.vrs.controller.reservation;

import com.vrs.service.ReservationService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = {"/make_reservation", "/get_reservations", "/set_reservation_complete", "/remove_reservation"})
public class ReservationURLController extends HttpServlet {

    private void makeReservation(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new ReservationService().makeReservation(req, resp);
    }

    private void getReservations(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new ReservationService().getReservations(req, resp);
    }

    private void setReservationComplete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new ReservationService().setReservationComplete(req, resp);
    }

    private void removeReservation(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new ReservationService().removeReservation(req, resp);
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
            case "/get_reservations":
                getReservations(req, resp);
                break;
            case "/set_reservation_complete":
                setReservationComplete(req, resp);
                break;
            case "/remove_reservation":
                removeReservation(req, resp);
                break;
            default:
                break;
        }
    }
}

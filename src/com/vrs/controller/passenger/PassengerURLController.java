package com.vrs.controller.passenger;

import com.vrs.dao.PassengerDAO;
import com.vrs.service.PassengerService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = {"/get_passengers_price", "/get_max_passenger_count", "/get_passengers", "/add_passenger", "/remove_passenger"})
public class PassengerURLController extends HttpServlet {

    private void getPassengersPrice(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new PassengerService().getPassengersPrice(req, resp);
    }

    private void getMaxPassengersCount(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new PassengerService().getMaxPassengersCount(req, resp);
    }

    private void getPassengers(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new PassengerService().getPassengers(req, resp);
    }

    private void addPassenger(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new PassengerService().addPassenger(req, resp);
    }

    private void removePassenger(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        new PassengerService().removePassenger(req, resp);
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
            case "/get_passengers_price":
                getPassengersPrice(req, resp);
                break;
            case "/get_max_passenger_count":
                getMaxPassengersCount(req, resp);
                break;
            case "/get_passengers":
                getPassengers(req, resp);
                break;
            case "/add_passenger":
                addPassenger(req, resp);
                break;
            case "/remove_passenger":
                removePassenger(req, resp);
                break;
            default:
                break;
        }
    }
}

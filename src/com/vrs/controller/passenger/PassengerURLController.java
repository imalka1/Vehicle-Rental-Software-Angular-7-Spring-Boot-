package com.vrs.controller.passenger;

import com.vrs.dao.PassengerDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = {"/get_passengers_price"})
public class PassengerURLController extends HttpServlet {

    private void getPassengersPrice(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        resp.getWriter().println(String.format("%.2f", new PassengerDAO().getPassengersPrice(Integer.valueOf(req.getParameter("passengersCount")))));
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

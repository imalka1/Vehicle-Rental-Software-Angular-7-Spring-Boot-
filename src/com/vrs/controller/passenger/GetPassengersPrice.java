package com.vrs.controller.passenger;

import com.vrs.dao.PassengerDAO;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = "/get_passengers_price")
public class GetPassengersPrice extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().println(String.format("%.2f", new PassengerDAO().getPassengersPrice(Integer.valueOf(req.getParameter("passengersCount")))));
    }
}

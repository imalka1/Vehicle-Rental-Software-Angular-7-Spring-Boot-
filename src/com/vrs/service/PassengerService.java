package com.vrs.service;

import com.vrs.dao.PassengerDAO;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class PassengerService {

    public void getPassengersPrice(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().println(String.format("%.2f", new PassengerDAO().getPassengersPrice(Integer.valueOf(req.getParameter("passengersCount")))));
    }

    public String getPrice(int count) {
        return String.format("%.2f", new PassengerDAO().getPassengersPrice(Integer.valueOf(count)));
    }
}

package com.vrs.service;

import com.vrs.dao.PassengerDAO;
import com.vrs.entity.Passenger;
import com.vrs.entity.Place;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class PassengerService {

    private PassengerDAO passengerDAO = new PassengerDAO();

    public void getPassengersPrice(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().println(String.format("%.2f", passengerDAO.getPassengersPrice(Integer.valueOf(req.getParameter("passengersCount")))));
    }

    public void getMaxPassengersCount(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().println(passengerDAO.getMaxPassengersCount());
    }

    public void getPassengers(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Passenger> passengers = passengerDAO.getPassengers();

        JSONArray placesJson = new JSONArray();
        for (Passenger passenger : passengers) {
            placesJson.add(getJsonPassenger(passenger));
        }
        resp.getWriter().println(placesJson.toJSONString());//---Print and reply JSON as a text
    }

    public void addPassenger(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Passenger passenger = new Passenger();
        passenger.setPassengersCount(Integer.parseInt(req.getParameter("passengersCount").trim()));
        passenger.setPassengersPrice(Double.parseDouble(req.getParameter("passengersPrice").trim()));
        passenger = passengerDAO.addPassenger(passenger);
        resp.getWriter().println(getJsonPassenger(passenger));//---Print and reply JSON as a text
    }

    public void removePassenger(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Passenger passenger = new Passenger();
        passenger.setPassengersCount(Integer.parseInt(req.getParameter("passengersCount").trim()));
        boolean removePassenger = passengerDAO.removePassenger(passenger);
        resp.getWriter().println(removePassenger);//---Print and reply JSON as a text
    }

    private JSONObject getJsonPassenger(Passenger passengerObj) {
        JSONObject passengerJson = new JSONObject();
        passengerJson.put("PassengersCount", passengerObj.getPassengersCount());
        passengerJson.put("PassengersPrice", passengerObj.getPassengersPrice());
        return passengerJson;
    }
}

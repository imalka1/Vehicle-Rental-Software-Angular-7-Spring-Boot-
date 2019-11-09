package com.vrs.controller.reservation;

import com.vrs.dao.CustomerDAO;
import com.vrs.dao.PlaceDAO;
import com.vrs.entity.Comment;
import com.vrs.entity.Customer;
import com.vrs.entity.Place;
import com.vrs.entity.Reservation;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = "/makeReservation")
public class MakeReservationController extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        int adults = Integer.parseInt(req.getParameter("adults"));
        int children = Integer.parseInt(req.getParameter("children"));
        int infants = Integer.parseInt(req.getParameter("infants"));

        int customerId = Integer.parseInt(req.getParameter("customerId"));

        Place placeFrom = new PlaceDAO().getPlace(Integer.parseInt(req.getParameter("placeFrom")));
        Place placeTo = new PlaceDAO().getPlace(Integer.parseInt(req.getParameter("placeTo")));

        Customer customer;
        if (customerId == 0) {
            customer = new Customer();
            customer.setCustomerEmail(req.getParameter("customerEmail"));
            customer.setCustomerContactNumber(req.getParameter("customerContact"));
            customer.setCustomerName(req.getParameter("customerName"));
            customer.setCustomerComments(req.getParameter("customerComments"));
        } else {
            customer = new CustomerDAO().getCustomer(customerId);
        }

        Reservation reservation = new Reservation();
        reservation.setReservationPlaceFrom(placeFrom);
        reservation.setReservationPlaceTo(placeTo);
        reservation.setReservationCustomer(customer);
        reservation.setTrip(Integer.parseInt(req.getParameter("trip")));
    }
}

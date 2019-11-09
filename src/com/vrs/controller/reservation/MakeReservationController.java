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
        int placeFrom = Integer.parseInt(req.getParameter("placeFrom"));
        int placeTo = Integer.parseInt(req.getParameter("placeTo"));
        int trip = Integer.parseInt(req.getParameter("trip"));

        int adults = Integer.parseInt(req.getParameter("adults"));
        int children = Integer.parseInt(req.getParameter("children"));
        int infants = Integer.parseInt(req.getParameter("infants"));

        int customerId = Integer.parseInt(req.getParameter("customerId"));
        String customerEmail = req.getParameter("customerEmail");
        String customerContact = req.getParameter("customerContact");
        String customerName = req.getParameter("customerName");
        String customerComments = req.getParameter("customerComments");

        Place placeFromObj = new PlaceDAO().getPlace(placeFrom);
        Place placeToObj = new PlaceDAO().getPlace(placeTo);

        Customer customer;
        if (customerId == 0) {
            customer = new Customer();
            customer.setCustomerEmail(customerEmail);
            customer.setCustomerContactNumber(customerContact);
            customer.setCustomerName(customerName);
            customer.setCustomerComments(customerComments);
        } else {
            customer = new CustomerDAO().getCustomer(customerId);
        }

        Reservation reservation = new Reservation();
        reservation.setReservationPlaceFrom(placeFromObj);
        reservation.setReservationPlaceTo(placeToObj);
        reservation.setReservationCustomer(customer);
    }
}

package com.vrs.service;

import com.vrs.dao.PlaceDAO;
import com.vrs.dao.ReservationDAO;
import com.vrs.entity.Customer;
import com.vrs.entity.Place;
import com.vrs.entity.Reservation;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;

public class ReservationService {

    private Reservation savedRegistration;

    public void makeReservation(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Thread currentThread = Thread.currentThread();

        Date dateAndTime = null;
        try {
            dateAndTime = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").parse(req.getParameter("pickupDate") + " " + req.getParameter("pickupTime") + ":00");
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Place placeFrom = new PlaceDAO().getPlace(Integer.parseInt(req.getParameter("placeFrom")));
        Place placeTo = new PlaceDAO().getPlace(Integer.parseInt(req.getParameter("placeTo")));

        Customer customer = new Customer();
        customer.setCustomerEmail(req.getParameter("customerEmail").trim());
        customer.setCustomerContactNumber(req.getParameter("customerContact").trim());
        customer.setCustomerName(req.getParameter("customerName").trim());

        Reservation reservation = new Reservation();
        reservation.setReservationPlaceFrom(placeFrom);
        reservation.setReservationPlaceTo(placeTo);
        reservation.setReservationCustomer(customer);
        reservation.setReservationTrip(Integer.parseInt(req.getParameter("trip")));
        reservation.setReservationAdults(Integer.parseInt(req.getParameter("adults")));
        reservation.setReservationChildren(Integer.parseInt(req.getParameter("children")));
        reservation.setReservationInfants(Integer.parseInt(req.getParameter("infants")));
        reservation.setReservationComments(req.getParameter("customerComments").trim());
        reservation.setReservationDateAndTime(dateAndTime);

        savedRegistration = new ReservationDAO().saveRegistration(reservation);

        String registrationId = savedRegistration.getId() + "";

        if (savedRegistration.getId() != 0) {
            String emailAddress = req.getParameter("customerEmail").trim();
            registrationId = Base64.getUrlEncoder().encodeToString(registrationId.getBytes());
//            new Thread(() -> {
//                try {
//                    currentThread.join();
//                } catch (InterruptedException e) {
//                    e.printStackTrace();
//                }
//                new EmailService().sendEmailReservation(emailAddress, savedRegistration);
//            }).start();
            new EmailService().sendEmailReservation(emailAddress, savedRegistration);
        }

        resp.sendRedirect("view/customer/success_page.jsp?reservation=" + registrationId);
    }

    public Reservation getReservation(long id) {
        return new ReservationDAO().getReservation(id);
    }
}

package com.vrs.service;

import com.vrs.dao.PlaceDAO;
import com.vrs.dao.ReservationDAO;
import com.vrs.entity.Customer;
import com.vrs.entity.Place;
import com.vrs.entity.Reservation;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.List;

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

    public void getReservations(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Reservation reservation = new Reservation();
        try {
            reservation.setReservationDateAndTime(new SimpleDateFormat("yyyy-MM-dd").parse(req.getParameter("reservationDate").trim()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        reservation.setReservationCompleted(Boolean.parseBoolean(req.getParameter("isCompleted").trim()));
        List<Reservation> reservations = new ReservationDAO().getReservations(reservation);

//        JSONObject obj = new JSONObject();
        JSONArray reservationsJson = new JSONArray();
        for (Reservation reservationObj : reservations) {
            JSONObject reservationJson = new JSONObject();
            reservationJson.put("ReservationNumber", "R" + reservationObj.getId());
            reservationJson.put("ReservationTime", new SimpleDateFormat("hh:MM a").format(reservationObj.getReservationDateAndTime()));

            reservationJson.put("CustomerName", reservationObj.getReservationCustomer().getCustomerName());
            reservationJson.put("CustomerEmail", reservationObj.getReservationCustomer().getCustomerEmail());
            reservationJson.put("CustomerTelNo", reservationObj.getReservationCustomer().getCustomerContactNumber());
            reservationJson.put("CustomerComments", reservationObj.getReservationComments());

            reservationJson.put("ReservationPickupFrom", reservationObj.getReservationPlaceFrom().getPlaceName());
            reservationJson.put("ReservationDropTo", reservationObj.getReservationPlaceTo().getPlaceName());
            reservationJson.put("ReservationTrip", reservationObj.getReservationTrip() == 1 ? "One way" : "Round trip");
//            reservationJson.put("ReservationDate", new SimpleDateFormat("yyyy-MM-dd").format(reservationObj.getReservationDateAndTime()));
            reservationJson.put("ReservationAdults", reservationObj.getReservationAdults());
            reservationJson.put("ReservationChildren", reservationObj.getReservationChildren());
            reservationJson.put("ReservationInfants", reservationObj.getReservationInfants());
            reservationJson.put("ReservationNoOfPassengers", reservationObj.getReservationAdults() + reservationObj.getReservationChildren() + reservationObj.getReservationInfants());
            reservationJson.put("ReservationCost", new PassengerService().getPrice(reservationObj.getReservationAdults() + reservationObj.getReservationChildren() + reservationObj.getReservationInfants()));
            reservationsJson.add(reservationJson);
        }
//        obj.put("Subjects", subjectsJson);
        resp.getWriter().println(reservationsJson.toJSONString());//---Print and reply JSON as a text
    }
}

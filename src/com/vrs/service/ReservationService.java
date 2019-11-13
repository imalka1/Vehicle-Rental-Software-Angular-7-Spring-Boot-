package com.vrs.service;

import com.vrs.controller.reservation.ReservationWebSocketController;
import com.vrs.dao.PassengerDAO;
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
import javax.websocket.Session;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Set;

public class ReservationService {

    private ReservationDAO reservationDAO = new ReservationDAO();

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
        reservation.setReservationPassenger(new PassengerDAO().getPassenger(reservation.getReservationAdults() + reservation.getReservationChildren() + reservation.getReservationInfants()));

        reservation = reservationDAO.saveRegistration(reservation);

        String registrationId = reservation.getId() + "";

        if (reservation.getId() != 0) {
            Set<Session> userSessions = ReservationWebSocketController.getUserSessions();
            for (Session userSession : userSessions) {
                userSession.getBasicRemote().sendText(getJsonReservation(reservation).toJSONString());
            }

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
            new EmailService().sendEmailReservation(emailAddress, reservation);
        }

        resp.sendRedirect("view/customer/success_page.jsp?reservation=" + registrationId);
    }

    public Reservation getReservation(long id) {
        return reservationDAO.getReservation(id);
    }

    public void getReservations(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Reservation reservation = new Reservation();
        try {
            reservation.setReservationDateAndTime(new SimpleDateFormat("yyyy-MM-dd").parse(req.getParameter("reservationDate").trim()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        List<Reservation> reservations = reservationDAO.getReservations(reservation);

        JSONArray reservationsJson = new JSONArray();
        for (Reservation reservationObj : reservations) {
            reservationsJson.add(getJsonReservation(reservationObj));
        }
        resp.getWriter().println(reservationsJson.toJSONString());//---Print and reply JSON as a text
    }

    public void setReservationComplete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Reservation reservation = new Reservation();
        reservation.setId(Long.parseLong(req.getParameter("reservationId").trim()));
        reservation.setReservationCompleted(Boolean.parseBoolean(req.getParameter("isCompleted").trim()));
        reservation = reservationDAO.updateReservation(reservation);
        if (reservation != null) {
            resp.getWriter().println(getJsonReservation(reservation).toJSONString());//---Print and reply JSON as a text
        } else {
            resp.getWriter().println("");//---Print and reply JSON as a text
        }
    }

    public void removeReservation(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Reservation reservation = new Reservation();
        reservation.setId(Long.parseLong(req.getParameter("reservationId").trim()));
        boolean removeReservation = reservationDAO.removeReservation(reservation);
        resp.getWriter().println(removeReservation);//---Print and reply JSON as a text
    }

    private JSONObject getJsonReservation(Reservation reservationObj) {
        JSONObject reservationJson = new JSONObject();
        reservationJson.put("ReservationNumber", reservationObj.getId());
        reservationJson.put("ReservationTime", new SimpleDateFormat("hh:mm a").format(reservationObj.getReservationDateAndTime()));

        reservationJson.put("CustomerName", reservationObj.getReservationCustomer().getCustomerName());
        reservationJson.put("CustomerEmail", reservationObj.getReservationCustomer().getCustomerEmail());
        reservationJson.put("CustomerTelNo", reservationObj.getReservationCustomer().getCustomerContactNumber());
        reservationJson.put("CustomerComments", reservationObj.getReservationComments());

        reservationJson.put("ReservationPickupFrom", reservationObj.getReservationPlaceFrom().getPlaceName());
        reservationJson.put("ReservationDropTo", reservationObj.getReservationPlaceTo().getPlaceName());
        reservationJson.put("ReservationTrip", reservationObj.getReservationTrip() == 1 ? "One way" : "Round trip");
//            reservationJson.put("ReservationDate", new SimpleDateFormat("yyyy-MM-dd").format(reservationObj.getReservationDateAndTime()));
        reservationJson.put("ReservationIsCompleted", reservationObj.isReservationCompleted());
        reservationJson.put("ReservationAdults", reservationObj.getReservationAdults());
        reservationJson.put("ReservationChildren", reservationObj.getReservationChildren());
        reservationJson.put("ReservationInfants", reservationObj.getReservationInfants());
        reservationJson.put("ReservationNoOfPassengers", reservationObj.getReservationAdults() + reservationObj.getReservationChildren() + reservationObj.getReservationInfants());
        reservationJson.put("ReservationCost", String.format("%.2f", reservationObj.getReservationPassenger().getPassengersPrice()));
        return reservationJson;
    }

}

package com.vrs.controller.reservation;

import com.vrs.dao.CustomerDAO;
import com.vrs.dao.PlaceDAO;
import com.vrs.dao.ReservationDAO;
import com.vrs.entity.Customer;
import com.vrs.entity.Place;
import com.vrs.entity.Reservation;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.spec.SecretKeySpec;
import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.Properties;

@WebServlet(urlPatterns = "/makeReservation")
public class MakeReservationController extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Date dateAndTime = null;
        try {
            dateAndTime = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").parse(req.getParameter("pickupDate") + " " + req.getParameter("pickupTime") + ":00");
        } catch (ParseException e) {
            e.printStackTrace();
        }

        Place placeFrom = new PlaceDAO().getPlace(Integer.parseInt(req.getParameter("placeFrom")));
        Place placeTo = new PlaceDAO().getPlace(Integer.parseInt(req.getParameter("placeTo")));

        Customer customer = new Customer();
        customer.setCustomerEmail(req.getParameter("customerEmail"));
        customer.setCustomerContactNumber(req.getParameter("customerContact"));
        customer.setCustomerName(req.getParameter("customerName"));
        customer.setCustomerComments(req.getParameter("customerComments"));

        Reservation reservation = new Reservation();
        reservation.setReservationPlaceFrom(placeFrom);
        reservation.setReservationPlaceTo(placeTo);
        reservation.setReservationCustomer(customer);
        reservation.setReservationTrip(Integer.parseInt(req.getParameter("trip")));
        reservation.setReservationAdults(Integer.parseInt(req.getParameter("adults")));
        reservation.setReservationChildren(Integer.parseInt(req.getParameter("children")));
        reservation.setReservationInfants(Integer.parseInt(req.getParameter("infants")));
        reservation.setReservationDateAndTime(dateAndTime);

        Reservation savedRegistration = new ReservationDAO().saveRegistration(reservation);

        String registrationId = savedRegistration.getId() + "";
        if (savedRegistration.getId() != 0) {
            registrationId=Base64.getUrlEncoder().encodeToString(registrationId.getBytes());
            System.out.println(registrationId);
        }

        resp.sendRedirect("view/customer/success_page.jsp?reservation=" + registrationId);
    }

    private void emailReservation(){
        try {
            //------------------------------Set gmail server as smtp mailing server-------------------------------------
            Properties props = new Properties();
            props.setProperty("mail.host", "smtp.gmail.com");
            props.setProperty("mail.smtp.port", "587");
            props.setProperty("mail.smtp.auth", "true");
            props.setProperty("mail.smtp.starttls.enable", "true");

            //----------------------------------------Login to email (sender)-------------------------------------------
            Authenticator auth = new SMTPAuthenticator("webphpjava@gmail.com", "webphpjava1");

            Session session = Session.getInstance(props, auth);

            //--------------------------------------Create email text (body)--------------------------------------------
            MimeMessage msg = new MimeMessage(session);
//            msg.setText(String.valueOf(number));//---Set random number to email
            msg.setSubject("Confirmation Code");//---Set subject
            msg.setFrom(new InternetAddress("webphpjava@gmail.com"));//---Set email
//            msg.addRecipient(Message.RecipientType.TO, new InternetAddress(emailViaUid.getEmailAddress()));//---Set receiver's email

            //------------------------------------------Send email------------------------------------------------------
            Transport.send(msg);
        } catch (AuthenticationFailedException ex) {//--Catch if any authentication exception occurred
            ex.printStackTrace();
        } catch (AddressException ex) {//--Catch if any address exception occurred
            ex.printStackTrace();
        } catch (MessagingException ex) {//--Catch if any messaging exception occurred
            ex.printStackTrace();
        }
    }

    //---------------------------------Authenticate (login to) email (sender)-------------------------------------------
    private class SMTPAuthenticator extends Authenticator {

        private PasswordAuthentication authentication;

        public SMTPAuthenticator(String login, String password) {
            authentication = new PasswordAuthentication(login, password);
        }

        @Override
        protected PasswordAuthentication getPasswordAuthentication() {
            return authentication;
        }
    }
}

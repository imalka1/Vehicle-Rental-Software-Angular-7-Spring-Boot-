package com.vrs.service;

import com.vrs.entity.Reservation;

import javax.mail.*;
import javax.mail.internet.*;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Properties;

public class EmailService {
    public void sendEmailReservation(String emailAddress, Reservation savedRegistration) {
        try {
            //------------------------------Set gmail server as smtp mailing server-------------------------------------
            Properties props = new Properties();

//            props.put("mail.smtp.host", "smtp.gmail.com"); //SMTP Host
//            props.put("mail.smtp.socketFactory.port", "465"); //SSL Port
//            props.put("mail.smtp.socketFactory.class",
//                    "javax.net.ssl.SSLSocketFactory"); //SSL Factory Class
//            props.put("mail.smtp.auth", "true"); //Enabling SMTP Authentication
//            props.put("mail.smtp.port", "465"); //SMTP Port

            props.setProperty("mail.host", "smtp.gmail.com");
            props.setProperty("mail.smtp.port", "587");
            props.setProperty("mail.smtp.auth", "true");
            props.setProperty("mail.smtp.starttls.enable", "true");

            //----------------------------------------Login to email (sender)-------------------------------------------
//            Authenticator auth = new SMTPAuthenticator("webphpjava@gmail.com", "webphpjava123");

//            Session session = Session.getInstance(props, auth);
            Session session = Session.getInstance(props,
                    new javax.mail.Authenticator() {
                        protected PasswordAuthentication getPasswordAuthentication() {
                            return new PasswordAuthentication("rajapaksap1@gmail.com", "Priyantha123");
                        }
                    });
            //--------------------------------------Create email text (body)--------------------------------------------
            MimeMessage msg = new MimeMessage(session);
            msg.addHeader("Content-type", "text/html; charset=UTF-8");
//            msg.setText(String.valueOf(number));//---Set random number to email

            String htmlMessage = "" +
                    "<div style='font-size:14px'>" +
                    "<span style='font-weight:bold'>Reservation Number</span><span> - R" + savedRegistration.getId() + "</span><br>" +
                    "<span style='font-weight:bold'>Customer</span><span> - " + savedRegistration.getReservationCustomer().getCustomerName() + "</span><br>" +
                    "<span style='font-weight:bold'>Pickup From</span><span> - " + savedRegistration.getReservationPlaceFrom().getPlaceName() + "</span><br>" +
                    "<span style='font-weight:bold'>Drop To</span><span> - " + savedRegistration.getReservationPlaceTo().getPlaceName() + "</span><br>" +
                    "<span style='font-weight:bold'>Trip</span><span> - " + (savedRegistration.getReservationTrip() == 1 ? "One way" : "Round trip") + "</span><br>" +
                    "<span style='font-weight:bold'>Pickup Date</span><span> - " + new SimpleDateFormat("yyyy-MM-dd").format(savedRegistration.getReservationDateAndTime()) + "</span><br>" +
                    "<span style='font-weight:bold'>Pickup Time</span><span> - " + new SimpleDateFormat("hh:mm a").format(savedRegistration.getReservationDateAndTime()) + "</span><br>" +
                    "<span style='font-weight:bold'>Adults</span><span> - " + savedRegistration.getReservationAdults() + "</span><br>" +
                    "<span style='font-weight:bold'>Children</span><span> - " + savedRegistration.getReservationChildren() + "</span><br>" +
                    "<span style='font-weight:bold'>Infants</span><span> - " + savedRegistration.getReservationInfants() + "</span><br>" +
                    "<span style='font-weight:bold'>No of passengers</span><span> - " + (savedRegistration.getReservationAdults() + savedRegistration.getReservationChildren() + savedRegistration.getReservationInfants()) + "</span><br>" +
                    "<span style='font-weight:bold;font-size:24px'>Total Cost</span><span style='font-weight:bold;font-size:24px'> - &euro;" + String.format("%.2f", savedRegistration.getReservationPassenger().getPassengersPrice()) + "</span>" +
                    "</div>";
            BodyPart messageBodyPart = new MimeBodyPart();

            // Fill the message
            messageBodyPart.setContent(htmlMessage, "text/html; charset=UTF-8");
            Multipart multipart = new MimeMultipart();

            // Set text message part
            multipart.addBodyPart(messageBodyPart);
//            msg.setText("abc");
            msg.setContent(multipart);
            msg.setSubject("Trip Reservation");//---Set subject
            msg.setFrom(new InternetAddress("rajapaksap1@gmail.com", "Trip Reservation Bill"));//---Set email
            msg.addRecipient(Message.RecipientType.TO, new InternetAddress(emailAddress));//---Set receiver's email

            //------------------------------------------Send email------------------------------------------------------
            Transport.send(msg);
        } catch (AuthenticationFailedException ex) {//--Catch if any authentication exception occurred
            ex.printStackTrace();
        } catch (AddressException ex) {//--Catch if any address exception occurred
            ex.printStackTrace();
        } catch (MessagingException ex) {//--Catch if any messaging exception occurred
            ex.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    //---------------------------------Authenticate (login to) email (sender)-------------------------------------------
//    private class SMTPAuthenticator extends Authenticator {
//
//        private PasswordAuthentication authentication;
//
//        public SMTPAuthenticator(String login, String password) {
//            authentication = new PasswordAuthentication(login, password);
//        }
//
//        @Override
//        protected PasswordAuthentication getPasswordAuthentication() {
//            return authentication;
//        }
//    }
}

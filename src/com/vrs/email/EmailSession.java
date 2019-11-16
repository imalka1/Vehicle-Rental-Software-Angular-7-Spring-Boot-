package com.vrs.email;

import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import java.util.Properties;

public class EmailSession {
    private Session session;

    public EmailSession() {
        try {
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

            session = Session.getInstance(props,
                    new javax.mail.Authenticator() {
                        protected PasswordAuthentication getPasswordAuthentication() {
                            return new PasswordAuthentication("rajapaksap1@gmail.com", "Priyantha123");
                        }
                    });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Session getEmailSession() {
        return session;
    }
}

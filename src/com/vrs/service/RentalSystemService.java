package com.vrs.service;

import com.vrs.dao.RentalSystemDAO;
import com.vrs.dao.ReservationDAO;
import com.vrs.entity.RentalSystem;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class RentalSystemService {

    private RentalSystemDAO rentalSystemDAO = new RentalSystemDAO();

    public void updateRentalSystem(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        RentalSystem rentalSystem = new RentalSystem();
        rentalSystem.setId(Long.parseLong(req.getParameter("systemId")));
        rentalSystem.setAddress(req.getParameter("systemAddress"));
        rentalSystem.setTelNumber(req.getParameter("systemTelNo"));
        boolean updateRentalSystem = rentalSystemDAO.updateRentalSystem(rentalSystem);
        if (updateRentalSystem) {
            resp.getWriter().println(true);
        } else {
            resp.getWriter().println(false);
        }
    }

    public void updateSystemEmail(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        RentalSystem rentalSystem = new RentalSystem();
        rentalSystem.setId(Long.parseLong(req.getParameter("systemId")));
        rentalSystem.setEmailAddress(req.getParameter("systemEmail"));
        rentalSystem.setEmailPassword(req.getParameter("systemPassword"));
        boolean updateRentalSystem = rentalSystemDAO.updateSystemEmail(rentalSystem);
        if (updateRentalSystem) {
            resp.getWriter().println(true);
        } else {
            resp.getWriter().println(false);
        }
    }
}

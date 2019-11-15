package com.vrs.controller.place;

import com.vrs.dao.PlaceDAO;
import com.vrs.service.PlaceService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = {"/get_places", "/add_place", "/update_place", "/remove_place"})
public class PlaceURLController extends HttpServlet {

    private PlaceService placeService = new PlaceService();

    private void getAllPlaces(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        placeService.getAllPlaces(req, resp);
    }

    private void addPlace(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        placeService.addPlace(req, resp);
    }

    private void updatePlace(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        placeService.addPlace(req, resp);
    }

    private void removePlace(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        placeService.removePlace(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        processRequest(req, resp);
    }

    private void processRequest(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String path = req.getServletPath();
        switch (path) {
            case "/get_places":
                getAllPlaces(req, resp);
                break;
            case "/add_place":
                addPlace(req, resp);
                break;
            case "/update_place":
                updatePlace(req, resp);
                break;
            case "/remove_place":
                removePlace(req, resp);
                break;
            default:
                break;
        }
    }
}

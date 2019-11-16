package com.vrs.service;

import com.vrs.dao.PlaceDAO;
import com.vrs.entity.Place;
import com.vrs.entity.Reservation;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class PlaceService {

    private PlaceDAO placeDAO = new PlaceDAO();

    public List<Place> getAllPlaces() {
        return placeDAO.getAllPlaces();
    }

    public void getAllPlaces(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Place> allPlaces = placeDAO.getAllPlaces();

        JSONArray placesJson = new JSONArray();
        for (Place placeObj : allPlaces) {
            placesJson.add(getJsonPlace(placeObj));
        }
        resp.getWriter().println(placesJson.toJSONString());//---Print and reply JSON as a text
    }

    public void addPlace(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Place place = new Place();
        place.setId(Integer.parseInt(req.getParameter("placeId").trim()));
        place.setPlaceName(req.getParameter("placeName").trim());
        place = placeDAO.addPlace(place);
        resp.getWriter().println(getJsonPlace(place));//---Print and reply JSON as a text
    }

    public void removePlace(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Place place = new Place();
        place.setId(Integer.parseInt(req.getParameter("placeId").trim()));
        boolean removePlace = placeDAO.removePlace(place);
        resp.getWriter().println(removePlace);//---Print and reply JSON as a text
    }

    private JSONObject getJsonPlace(Place placeObj) {
        JSONObject placeJson = new JSONObject();
        placeJson.put("PlaceId", placeObj.getId());
        placeJson.put("PlaceName", placeObj.getPlaceName());
        return placeJson;
    }
}

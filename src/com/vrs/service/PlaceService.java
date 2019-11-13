package com.vrs.service;

import com.vrs.dao.PlaceDAO;
import com.vrs.entity.Place;

import java.util.List;

public class PlaceService {

    private PlaceDAO placeDAO = new PlaceDAO();

    public List<Place> getAllPlaces() {
        return placeDAO.getAllPlaces();
    }
}

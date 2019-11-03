package com.vrs.service;

import com.vrs.dao.PlaceDAO;
import com.vrs.entity.Place;

import java.util.List;

public class PlaceService {

    public List<Place> getAllPlaces() {
        return new PlaceDAO().getAllPlaces();
    }
}

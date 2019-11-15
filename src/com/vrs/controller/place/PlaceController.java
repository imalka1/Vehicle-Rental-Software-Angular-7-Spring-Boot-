package com.vrs.controller.place;

import com.vrs.entity.Place;
import com.vrs.service.PlaceService;

import java.util.List;

public class PlaceController {

    private PlaceService placeService = new PlaceService();

    public List<Place> getAllPlaces() {
        return placeService.getAllPlaces();
    }
}

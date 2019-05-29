package lk.vrs.service;

import lk.vrs.dto.PlaceDTO;
import lk.vrs.entity.Place;

import java.util.ArrayList;

public interface PlaceService {
    Place addPlace(Place place);

    Place updatePlace(Place place, int id);

    void deletePlace(int id);

    ArrayList<Place> getPlacesViaCategory(String category);
}

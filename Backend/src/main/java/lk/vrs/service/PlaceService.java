package lk.vrs.service;

import lk.vrs.entity.Place;

import java.util.ArrayList;
import java.util.List;

public interface PlaceService {
    Place addPlace(Place place);

    Place updatePlace(Place place);

    void deletePlace(long id);

    List<Place> getPlacesViaCategory(String category);
}

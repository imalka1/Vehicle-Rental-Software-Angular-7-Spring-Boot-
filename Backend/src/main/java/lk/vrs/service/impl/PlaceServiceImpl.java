package lk.vrs.service.impl;

import lk.vrs.entity.Place;
import lk.vrs.repository.PlaceRepository;
import lk.vrs.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlaceServiceImpl implements PlaceService {

    @Autowired
    private PlaceRepository placeRepository;

    @Override
    public Place addPlace(Place place) {
        return placeRepository.save(place);
    }

    @Override
    public Place updatePlace(Place place) {
        return placeRepository.save(place);
    }

    @Override
    public void deletePlace(long id) {
        placeRepository.deleteById(id);
    }

    @Override
    public List<Place> getPlacesViaCategory(String category) {
        return placeRepository.getPlacesViaCategory(category);
    }
}

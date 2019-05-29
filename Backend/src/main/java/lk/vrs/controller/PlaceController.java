package lk.vrs.controller;

import lk.vrs.entity.Place;
import lk.vrs.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/place")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @PostMapping(value = "/places")
    public Place addPlace(@RequestBody Place place) {
        return placeService.addPlace(place);
    }

    @PutMapping(value = "/places/{id}")
    public Place updatePlace(@RequestBody Place place, @PathVariable int id) {
        return placeService.updatePlace(place, id);
    }

    @DeleteMapping(value = "/places/{id}")
    public void deletePlace(@PathVariable int id) {
        placeService.deletePlace(id);
    }

    @GetMapping(value = "/placesViaCategory/{category}")
    public ArrayList<Place> getPlacesViaCategory(@PathVariable String category) {
        return placeService.getPlacesViaCategory(category);
    }
}

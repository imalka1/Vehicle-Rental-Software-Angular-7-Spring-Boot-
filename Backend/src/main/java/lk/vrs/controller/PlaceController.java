package lk.vrs.controller;

import lk.vrs.entity.Place;
import lk.vrs.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/place")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @PostMapping(value = "/admin/places/add")
    public Place addPlace(@RequestBody Place place) {
        return placeService.addPlace(place);
    }

    @PostMapping(value = "/admin/places/update")
    public Place updatePlace(@RequestBody Place place) {
        return placeService.updatePlace(place);
    }

    @DeleteMapping(value = "/admin/places/{id}")
    public void deletePlace(@PathVariable long id) {
        placeService.deletePlace(id);
    }

    @GetMapping(value = "/placesViaCategory/{category}")
    public List<Place> getPlacesViaCategory(@PathVariable String category) {
        return placeService.getPlacesViaCategory(category);
    }
}

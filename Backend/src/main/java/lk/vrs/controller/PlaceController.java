package lk.vrs.controller;

import lk.vrs.dto.PlaceDTO;
import lk.vrs.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping(path = "/place")
public class PlaceController {

    @Autowired
    private PlaceService placeService;

    @GetMapping(value = "/getPlacesViaCategory/{category}")
    public ArrayList<PlaceDTO> getPlacesViaCategory(@PathVariable String category) {
        return placeService.getPlacesViaCategory(category);
    }
}

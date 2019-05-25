package lk.vrs.service;

import lk.vrs.dto.PlaceDTO;

import java.util.ArrayList;

public interface PlaceService {
    ArrayList<PlaceDTO> getPlacesViaCategory(String category);
}

package lk.vrs.service.impl;

import lk.vrs.dto.PlaceDTO;
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
    public ArrayList<PlaceDTO> getPlacesViaCategory(String category) {
        List<Object[]> placesViaCategory = placeRepository.getPlacesViaCategory(category);
        ArrayList<PlaceDTO> placeDTOS = new ArrayList<>();
        for (Object[] placeViaCategory : placesViaCategory) {
            PlaceDTO placeDTO = new PlaceDTO();
            placeDTO.setPlaceId(Integer.parseInt(placeViaCategory[0].toString()));
            placeDTO.setPlace(placeViaCategory[1].toString());
            placeDTO.setFromOrTo(placeViaCategory[2].toString());
            placeDTOS.add(placeDTO);
        }
        return placeDTOS;
    }
}

package lk.vrs.repository;

import lk.vrs.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Integer> {

    @Query(value = "SELECT p FROM Place p WHERE category=?1")
    List<Place> getPlacesViaCategory(String category);

}

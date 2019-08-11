package lk.vrs.repository;

import lk.vrs.entity.Reservation;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    @Query(value = "select count(id) from Reservation")
    int getTableRowCount();

    @Query(value = "from Reservation order by reservationDate desc")
    List<Reservation> getReservationDates(Pageable pageable);

    @Query(value = "from Reservation where id=?1")
    Reservation getPaymentKey(long reservationId);

//    @Query(value = "from Reservation where place.placeId=?1")
//    List<Reservation> getReservationDates(int id);
}

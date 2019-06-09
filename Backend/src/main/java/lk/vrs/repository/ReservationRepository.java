package lk.vrs.repository;

import lk.vrs.entity.Reservation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReservationRepository extends CrudRepository<Reservation, Integer> {
    @Query(value = "select count(reservationId) from Reservation")
    Object getTableRowCount();

    @Query(value = "select reservationId,dateOfReservation from Reservation order by reservationId desc limit ?1,?2", nativeQuery = true)
    List<Object[]> getReservationDates(int start, int limit);
}

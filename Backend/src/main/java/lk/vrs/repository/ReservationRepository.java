package lk.vrs.repository;

import lk.vrs.entity.Reservation;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    @Query(value = "select count(reservationId) from Reservation")
    int getTableRowCount();

    @Query(value = "select r from Reservation r order by reservationId desc")
    List<Reservation> getReservationDates(Pageable pageable);
}

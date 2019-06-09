package lk.vrs.controller;

import lk.vrs.entity.Reservation;
import lk.vrs.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping(value = "/admin/rowCount")
    public int getTableRowCount() {
        return reservationService.getTableRowCount();
    }

    @GetMapping(value = "/admin/reservationDates/{start}/{limit}")
    public List<Reservation> getReservationDates(@PathVariable int start, @PathVariable int limit) {
        return reservationService.getReservationDates(start, limit);
    }
}

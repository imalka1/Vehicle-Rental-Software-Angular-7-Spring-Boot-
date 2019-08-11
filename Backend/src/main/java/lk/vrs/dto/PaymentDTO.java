package lk.vrs.dto;

import lk.vrs.entity.Reservation;

public class PaymentDTO {
    private String sku;
    private Reservation reservation;

    public PaymentDTO(String sku, Reservation reservation) {
        this.sku = sku;
        this.reservation = reservation;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }
}

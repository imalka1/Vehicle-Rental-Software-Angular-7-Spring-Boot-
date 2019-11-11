package com.vrs.controller.rental_system;

import com.vrs.dao.RentalSystemDAO;
import com.vrs.entity.RentalSystem;

public class RentalSystemController {

    public RentalSystem getRentalSystem() {
        return new RentalSystemDAO().getRentalSystem();
    }

}

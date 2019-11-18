package com.vrs.controller.user;

import com.vrs.entity.User;
import com.vrs.service.UserService;

public class UserController {

    private UserService userService=new UserService();

    public User getUser(){
        return userService.getUser();
    }
}

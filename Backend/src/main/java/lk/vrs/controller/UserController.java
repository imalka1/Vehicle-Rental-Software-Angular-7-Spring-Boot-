package lk.vrs.controller;

import lk.vrs.entity.User;
import lk.vrs.security.jwt.JwtGenerator;
import lk.vrs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@CrossOrigin
@RestController
@RequestMapping("/api/login")
public class UserController {
    private JwtGenerator jwtGenerator;

    @Autowired
    private UserService userService;

    public UserController(JwtGenerator jwtGenerator) {
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping
    public String loginAndGenerateToken(@RequestBody User user) {
        User userObj = userService.chkLogin(user);
        if (userObj != null) {
            return jwtGenerator.generate(userObj);
        }
        return "errorLogin";
    }
}

package lk.vrs.controller;

import lk.vrs.entity.User;
import lk.vrs.security.jwt.JwtAuthenticationProvider;
import lk.vrs.security.jwt.JwtAuthenticationTokenFilter;
import lk.vrs.security.jwt.JwtGenerator;
import lk.vrs.security.jwt.JwtValidator;
import lk.vrs.security.jwt.model.JwtAuthenticationToken;
import lk.vrs.service.UserService;
import lk.vrs.session.SessionStack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private JwtGenerator jwtGenerator;
    @Autowired
    private JwtValidator validator;
    @Autowired
    private UserService userService;

//    public UserController(JwtGenerator jwtGenerator) {
//        this.jwtGenerator = jwtGenerator;
//    }

    @PostMapping(value = "/login")
    public String loginAndGenerateToken(@RequestBody User user) {
        User userObj = userService.chkLogin(user);
        if (userObj != null) {
            return jwtGenerator.generate(userObj);
        }
        return "errorLogin";
    }

    @GetMapping("/logout")
    public void logout(@RequestHeader("Authorization") String token) {
        String authenticationToken = token.substring(6);
        JwtAuthenticationToken jwtAuthenticationToken = new JwtAuthenticationToken(authenticationToken);
        SessionStack.removeUser(validator.getSeurityCode(jwtAuthenticationToken.getToken()));
    }
}

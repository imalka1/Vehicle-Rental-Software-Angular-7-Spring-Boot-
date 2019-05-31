package lk.vrs.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lk.vrs.entity.User;
import lk.vrs.repository.UserRepository;
import lk.vrs.service.UserService;
import lk.vrs.session.SessionStack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JwtValidator {

    private String secret = "mercedes";

    public User validate(String token) {
        try {
            Claims body = getBody(token);

            User user = new User();
            user.setUserName(body.getSubject());
            user.setId(Long.parseLong(body.get("userId").toString()));
            user.setRole(body.get("role").toString());
            if (SessionStack.userExists(Integer.parseInt(body.get("securityKey").toString()))) {
                return user;
            }
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
        return null;
    }

    public int getSeurityCode(String token) {
        Claims body = getBody(token);
        return Integer.parseInt(body.get("securityKey").toString());
    }

    private Claims getBody(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }
}

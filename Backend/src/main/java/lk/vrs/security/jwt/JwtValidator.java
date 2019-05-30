package lk.vrs.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lk.vrs.entity.User;
import org.springframework.stereotype.Component;

@Component
public class JwtValidator {

    private String secret = "mercedes";

    public User validate(String token) {
        User user = null;
        try {
            Claims body = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

            user = new User();
            user.setUserName(body.getSubject());
            user.setId(Long.parseLong(body.get("userId").toString()));
            user.setRole(body.get("role").toString());
        } catch (Exception e) {
            System.out.println(e);
        }
        return user;
    }
}

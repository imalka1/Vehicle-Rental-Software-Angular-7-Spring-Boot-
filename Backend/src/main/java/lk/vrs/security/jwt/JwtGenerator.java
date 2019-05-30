package lk.vrs.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lk.vrs.entity.User;
import org.springframework.stereotype.Component;

@Component
public class JwtGenerator {
    public String generate(User user) {
        Claims claims = Jwts.claims().setSubject(user.getUserName());
        claims.put("userId", String.valueOf(user.getUserId()));
        claims.put("role", user.getRole());

        return Jwts.builder().setClaims(claims).signWith(SignatureAlgorithm.HS512, "mercedes").compact();
    }
}

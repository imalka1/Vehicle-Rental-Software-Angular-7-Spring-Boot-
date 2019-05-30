package lk.vrs.security.jwt.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class JwtUserDetails implements UserDetails {

    private String username;
    private String token;
    private Long id;
    private Collection<? extends GrantedAuthority> authorities;

    public JwtUserDetails(String username, long userId, String token, List<GrantedAuthority> grantedAuthorityList) {
        this.username = username;
        this.id = userId;
        this.token = token;
        this.authorities = grantedAuthorityList;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getToken() {
        return token;
    }

    public Long getId() {
        return id;
    }
}


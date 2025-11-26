package com.app.POS.system.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.lang.Collections;
import io.jsonwebtoken.security.Keys;
//import lombok.Data;
import org.hibernate.mapping.Collection;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class JwtProvider {
    static SecretKey key= Keys.hmacShaKeyFor(JwtConstant.JWT_SECRET.getBytes());
    public String generateToken(Authentication authentication){
        Collection<? extends GrantedAuthority>  authorities=
                authentication.getAuthorities();
        String roles= populateAuthorities(authorities);

        return Jwts.builder()
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime()+86400000))
                .claim("email", authentication.getName())
                .claim("authorities",roles)
                .signWith(key)
                .compact();
    }

//    to get image from jwt token
    public String getEmailFromToken(String jwt){
        jwt=jwt.substring(7);
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(jwt)
                .getPayload();

        String email = String.valueOf(claims.get("email"));

        return email;
    }

    private String populateAuthorities(Collection authorities) {


        Set<String>auths =new HashSet<>();
        for(GrantedAuthority authority : authorities){
            auths.add(authority.getAuthority());
        }
        return String.join(",",auths);
    }

}

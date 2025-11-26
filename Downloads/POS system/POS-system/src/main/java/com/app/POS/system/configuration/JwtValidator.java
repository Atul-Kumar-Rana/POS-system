package com.app.POS.system.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

import static org.yaml.snakeyaml.tokens.Token.ID.Key;

public class JwtValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {


        String jwt = request.getHeader(JwtConstant.JWT_HEADER);
//we took 7 .... as when it comes from web the token ,,, Bearer jwt .. till jwt its 7 character
        if(jwt!=null){
            jwt=jwt.substring(7);
            try {
                SecretKey key= Keys.hmacShaKeyFor(JwtConstant.JWT_SECRET.getBytes());
                Claims claims = Jwts.parser()
                        .verifyWith(key)
                        .build()
                        .parseSignedClaims(jwt)
                        .getPayload();

                String email = String.valueOf(claims.get("email"));
                String authority = String.valueOf(claims.get("authority"));

                List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(
                        authority
                );
                Authentication auth =new UsernamePasswordAuthenticationToken(
                        email,null,auths
//                        null as don't have password now
                );
                SecurityContextHolder.getContext().setAuthentication(
                        auth
                );
            }catch (Exception e){
                throw  new BadCredentialsException("invalid jwt...");

            }
        }
        filterChain.doFilter(request,response);

    }
}

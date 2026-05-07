package com.esgic.schoolmanagementbackend.security.converter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
public class Jwt2AuthoritiesConverter implements Converter<Jwt, Collection<? extends GrantedAuthority>> {

    private static final String ROLES = "scope";


    @Override
    public Collection<? extends GrantedAuthority> convert(@Nullable Jwt jwt) {
        try {

            Collection<String> realmRoles = extractRolesFromRealm(jwt);

            return realmRoles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Error converting JWT to authorities: {}", e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    @SuppressWarnings("unchecked")
    private Collection<String> extractRolesFromRealm(Jwt jwt) {
        return (Collection<String>) getClaim(jwt);
    }

    private Collection<?> getClaim(Jwt jwt) {
        try {
            var roles = jwt.getClaim(ROLES);
            log.debug("roles in converter: {}", roles);
            return (Collection<?>) roles;
        } catch (ClassCastException e) {
            log.warn("Invalid claim type for key '{}': {}", ROLES, e.getMessage());
            return List.of();
        }
    }
}

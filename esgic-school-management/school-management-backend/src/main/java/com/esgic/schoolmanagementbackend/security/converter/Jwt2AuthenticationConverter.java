package com.esgic.schoolmanagementbackend.security.converter;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class Jwt2AuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final Jwt2AuthoritiesConverter authoritiesConverter;

    @Override
    public AbstractAuthenticationToken convert(@Nullable Jwt jwt) {
        return new JwtAuthenticationToken(jwt, authoritiesConverter.convert(jwt));
    }

}

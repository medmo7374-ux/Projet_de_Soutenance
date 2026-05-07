package com.esgic.schoolmanagementbackend.security.configs;

import com.esgic.schoolmanagementbackend.security.converter.Jwt2AuthenticationConverter;
import com.esgic.schoolmanagementbackend.security.oauth.JwtAuthFilter;
import com.esgic.schoolmanagementbackend.security.providers.OpenEndpointsProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.esgic.schoolmanagementbackend.security.Paths.*;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthFilter jwtAuthFilter;
    private final OpenEndpointsProvider openEndpointsProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, Jwt2AuthenticationConverter jwt2AuthenticationConverter) throws Exception {
        return httpSecurity
                .oauth2ResourceServer(oauth -> oauth.jwt(jwt -> jwt.jwtAuthenticationConverter(jwt2AuthenticationConverter)))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(ar -> ar.requestMatchers(openEndpointsProvider.getOpenEndpoints().toArray(new String[0])
                ).permitAll())
                .authorizeHttpRequests(ar -> ar.requestMatchers(GET, COMMUNES, QUARTIERS, GRAVITES).permitAll())
                .authorizeHttpRequests(ar -> ar.requestMatchers(POST, COMMUNES, QUARTIERS, GRAVITES, SIGNALEMENTS).permitAll())
                .authorizeHttpRequests(ar -> ar.anyRequest().authenticated())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .cors(Customizer.withDefaults())
                .build();
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService, BCryptPasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(userDetailsService);
        return provider;
    }

}


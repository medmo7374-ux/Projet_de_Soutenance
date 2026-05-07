package com.esgic.schoolmanagementbackend;

import com.esgic.schoolmanagementbackend.security.providers.OpenEndpointsProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class SchoolManagementBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(SchoolManagementBackendApplication.class, args);
    }

    @Bean
    public OpenEndpointsProvider endpointsProvider() {
        return () -> List.of("/auth/login", "/redoc.html", "/swagger-ui/**", "v3/api-docs/**", "/actuator/**", "api-docs/**", "index.html");
    }

}

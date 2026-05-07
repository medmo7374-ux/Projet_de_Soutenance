package com.esgic.schoolmanagementbackend.security.providers;


import java.util.List;

@FunctionalInterface
public interface OpenEndpointsProvider {
    List<String> getOpenEndpoints();
}

package com.esgic.schoolmanagementbackend.controllers;


import com.esgic.schoolmanagementbackend.services.DashboardStatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Sékou Sallah Sow <sowsekou@hotmail.com>
 */ 

@RestController
@RequestMapping("dashboard")
@RequiredArgsConstructor
public class DashboardStatController {

    private final DashboardStatService dashboardStatService;

    @GetMapping("stats")
    public ResponseEntity<?> stats() {
        return ResponseEntity.ok(dashboardStatService.stats());
    }
}

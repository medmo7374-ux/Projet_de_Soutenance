package com.esgic.schoolmanagementbackend.security.oauth;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@AllArgsConstructor
@Slf4j
public class SecurityController {

    private SecurityService securityService;

    @GetMapping("/profile")
    public Authentication getProfile(Authentication authentication) {
        return authentication;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationDTO dto) {
        return securityService.login(dto);
    }

//
//    @PatchMapping("reset-password")
//    public ResponseEntity<?> resetPassword(@RequestBody @Valid ResetPasswordDto dto) {
//        log.info(dto.toString());
//        var response = securityService.resetPassword(dto);
//        return ResponseEntity.status(response.getStatus()).body(response.getData());
//    }
//
//    @PatchMapping("change-my-pwd")
//    public ResponseEntity<?> changeUserOwnPwd(@RequestBody @Valid ResetOwnPwd pwd) {
//        return securityService.changeUserOwnPassword(pwd);
//    }
}


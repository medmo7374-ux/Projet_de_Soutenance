package com.esgic.schoolmanagementbackend.security.oauth;

import com.esgic.schoolmanagementbackend.entities.Role;
import com.esgic.schoolmanagementbackend.exceptions.UtilisateurNotFoundException;
import com.esgic.schoolmanagementbackend.repositories.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SecurityService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final SecurityBusiness securityBusiness;

//    @Transactional
//    public ResponseEntity<?> resetPassword(ResetPasswordDto dto) {
//        securityBusiness.handleResetPassword(securityBusiness.handleEntityVerification().apply(dto), dto);
//        return ApiResponse.of(Map.of(PASSWORD_RESET_SUCCESS, true));
//    }
//
//    public ResponseEntity<?> changeUserOwnPassword(ResetOwnPwd pwd) {
//        var utilisateur = securityBusiness.validateUserExistence().apply(null, pwd.username());
//        if (!passwordEncoder.matches(pwd.oldPwd(), utilisateur.getPassword())) throw new ApiError(BAD_PASSWORD_MESSAGE);
//        utilisateur.setPassword(passwordEncoder.encode(pwd.newPwd()));
//        return ok(utilisateurRepository.save(utilisateur));
//    }

    public ResponseEntity<?> login(AuthenticationDTO dto) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.username(), dto.password()));
            final List<String> scope = authentication.getAuthorities()
                    .stream().map(GrantedAuthority::getAuthority).toList();

            final String token = this.jwtService.generateJwt(dto.username(), scope);
            final var byEmail = utilisateurRepository.findByEmail(dto.username()).orElseThrow(() -> new UtilisateurNotFoundException("Cet utilisateur n'existe pas"));

            String[] roles = byEmail.getRoles().stream()
                    .map(Role::getName
                    )
                    .toArray(String[]::new);

            return ResponseEntity.ok(Map.of("token", token, "utilisateur", byEmail, "roles", roles));
        } catch (Exception e) {
            log.info(e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Nom d'utilisateur ou mot de passe incorrect");
        }
    }
}


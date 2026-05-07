package com.esgic.schoolmanagementbackend.security.oauth;

import com.esgic.schoolmanagementbackend.entities.Utilisateur;
import com.esgic.schoolmanagementbackend.exceptions.UtilisateurNotFoundException;
import com.esgic.schoolmanagementbackend.repositories.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.function.BiFunction;

import static java.util.Objects.isNull;

@Component
@Slf4j
@RequiredArgsConstructor
public class SecurityBusiness {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;



//    public void handleResetPassword(ResetPasswordDto dto) {
//        wrapped.code().setActivation(Instant.now());
//        activationCodeRepository.save(wrapped.code());
//        wrapped.utilisateur().setPassword(passwordEncoder.encode(dto.password()));
//        utilisateurRepository.save(wrapped.utilisateur());
//    }

    public BiFunction<String, String, Utilisateur> validateUserExistence() {
        return (email, username) -> {
            if (email != null && username == null) {

                Utilisateur utilisateur = utilisateurRepository.findByEmail(email).orElseThrow(() -> new UtilisateurNotFoundException("Cet email n'existe pas!"));
                if (isNull(utilisateur))
                    throw new UtilisateurNotFoundException("Cet email n'existe pas!");
                return utilisateur;
            } else if (username != null && email == null) {

                return utilisateurRepository.findByUsername(username).orElseThrow(() -> new UtilisateurNotFoundException("Cet utilisateur n'existe pas!"));
            } else {
                return null;
            }
        };
    }

}

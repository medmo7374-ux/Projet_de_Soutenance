package com.esgic.schoolmanagementbackend.security.oauth;

import com.esgic.schoolmanagementbackend.entities.Utilisateur;
import com.esgic.schoolmanagementbackend.repositories.UtilisateurRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;

@Service
@Slf4j
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UtilisateurRepository utilisateurRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Utilisateur utilisateur;

        if (isNumeric(username)) {
            long userId = Long.parseLong(username);
            utilisateur = utilisateurRepository.findById(userId)
                    .orElseThrow(() -> new UsernameNotFoundException("User Not Found with ID: " + username));
        } else {
            utilisateur = utilisateurRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + username));
            if (isNull(utilisateur)) {
                throw new UsernameNotFoundException("User Not Found with email: " + username);
            }
        }


        String[] roles = utilisateur.getRoles().stream()
                .map(role -> role.getName().toUpperCase()).toArray(String[]::new);
        List<GrantedAuthority> authorities = Arrays.stream(roles).map(SimpleGrantedAuthority::new).collect(Collectors.toList());

        return User
                .withUsername(username)
                .password(utilisateur.getPassword())
                .authorities(authorities)
                .build();
    }

    private boolean isNumeric(String str) {
        if (str == null) {
            return false;
        }
        try {
            Long.parseLong(str);
        } catch (NumberFormatException e) {
            return false;
        }
        return true;
    }
}

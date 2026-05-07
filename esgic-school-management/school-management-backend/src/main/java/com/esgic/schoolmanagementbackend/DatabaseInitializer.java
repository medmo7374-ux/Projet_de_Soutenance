package com.esgic.schoolmanagementbackend;

import com.esgic.schoolmanagementbackend.entities.Role;
import com.esgic.schoolmanagementbackend.entities.Utilisateur;
import com.esgic.schoolmanagementbackend.repositories.RoleRepository;
import com.esgic.schoolmanagementbackend.repositories.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DatabaseInitializer {

    private final RoleRepository roleRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initDatabase() {
        return args -> {

            String[] roleNames = {"USER", "ADMINISTRATEUR", "AGENT"};
            for (String roleName : roleNames) {
                roleRepository.findByName(roleName).orElseGet(() -> {
                    Role role = new Role();
                    role.setName(roleName);
                    role.setDescription("Rôle " + roleName + " pour l'application School Management.");
                    return roleRepository.save(role);
                });
            }

            if (utilisateurRepository.findByUsername("admin@esgic.com").isEmpty()) {
                List<Role> roles = roleRepository.findAll();

                Utilisateur admin = new Utilisateur();
                admin.setNom("Admin");
                admin.setPrenom("Super");
                admin.setUsername("admin@esgic.com");
                admin.setEmail("admin@esgic.com");
                admin.setTelephone("0600000000");
                admin.setAdresse("1234567890 rue de la ville");
                admin.setPorte("1234567890");
                admin.setRue("1234567890");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRoles(roles);

                utilisateurRepository.save(admin);
                System.out.println("Utilisateur administrateur créé avec succès !");
            } else {
                System.out.println("Utilisateur administrateur déjà existant.");
            }
        };
    }
}

package com.esgic.schoolmanagementbackend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class Role extends AbstractEntity {

    private String name;
    private String description;
}

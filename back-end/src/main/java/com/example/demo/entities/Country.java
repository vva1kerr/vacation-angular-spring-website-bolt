package com.example.demo.entities;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "countries")
@Getter
@Setter
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "country_id")
    private Long id;

    @Column(name = "country")
    private String country;

    @CreationTimestamp
    @Column(name = "create_date")
    private Date createDate;

    @UpdateTimestamp
    @Column(name = "last_update")
    private Date lastUpdate;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "country")
    private Set<Division> divisions;
}

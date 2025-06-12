package com.example.demo.entities;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "customers")
@Getter
@Setter
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Long id;

    @Column(name = "customer_first_name")
    @NotEmpty(message = "First name is required")
    private String firstName;

    @Column(name = "customer_last_name")
    @NotEmpty(message = "Last name is required")
    private String lastName;

    @Column(name = "address")
    @NotEmpty(message = "Address is required")
    private String address;

    @Column(name = "postal_code")
    @NotEmpty(message = "Postal code is required")
    @Pattern(regexp = "^[0-9]{5}$", message = "Postal code must be 5 digits")
    private String postalCode;

    @Column(name = "phone")
    @NotEmpty(message = "Phone is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
    private String phone;

    @CreationTimestamp
    @Column(name = "create_date")
    private Date createDate;

    @UpdateTimestamp
    @Column(name = "last_update")
    private Date lastUpdate;

    @ManyToOne
    @JoinColumn(name = "division_id")
    private Division division;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
    private Set<Cart> carts;
}

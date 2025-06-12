package com.example.demo.services;

import com.example.demo.entities.Customer;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class Purchase {
    private Customer customer;
    private Set<CartItem> cartItems;
}

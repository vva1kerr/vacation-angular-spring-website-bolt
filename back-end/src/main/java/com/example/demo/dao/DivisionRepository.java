package com.example.demo.dao;

import com.example.demo.entities.Division;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface DivisionRepository extends JpaRepository<Division, Long> {
    List<Division> findByCountryId(@Param("countryId") Long countryId);
}

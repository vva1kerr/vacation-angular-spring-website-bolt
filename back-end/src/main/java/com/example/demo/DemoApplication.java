/*
This code will:

    Initialize Countries and Divisions: Creates sample countries (USA, Canada, UK) and their respective states/provinces
    Initialize 5 Sample Customers: Creates customers with proper validation-compliant data (10-digit phone numbers, 5-digit postal codes)
    Initialize Vacation Packages: Creates 3 vacation packages with 2 excursions each
    Prevent Duplicates: Uses count checks to ensure data is only inserted once, even if the application restarts

The @PostConstruct annotation ensures this method runs after the Spring context is fully initialized and all dependencies are injected. The data will be inserted into your MySQL database when you start the Spring Boot application.

Make sure your MySQL database is running and the connection properties in application.properties are correct before starting the application.
*/

package com.example.demo;

import com.example.demo.dao.CountryRepository;
import com.example.demo.dao.DivisionRepository;
import com.example.demo.dao.CustomerRepository;
import com.example.demo.dao.VacationRepository;
import com.example.demo.dao.ExcursionRepository;
import com.example.demo.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;
import java.math.BigDecimal;

@SpringBootApplication
public class DemoApplication {

    @Autowired
    private CountryRepository countryRepository;
    
    @Autowired
    private DivisionRepository divisionRepository;
    
    @Autowired
    private CustomerRepository customerRepository;
    
    @Autowired
    private VacationRepository vacationRepository;
    
    @Autowired
    private ExcursionRepository excursionRepository;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @PostConstruct
    public void initData() {
        // Check if data already exists to avoid duplicates
        if (countryRepository.count() == 0) {
            initializeCountriesAndDivisions();
        }
        
        if (customerRepository.count() == 0) {
            initializeCustomers();
        }
        
        if (vacationRepository.count() == 0) {
            initializeVacationsAndExcursions();
        }
    }

    private void initializeCountriesAndDivisions() {
        // Create Countries
        Country usa = new Country();
        usa.setCountry("United States");
        countryRepository.save(usa);

        Country canada = new Country();
        canada.setCountry("Canada");
        countryRepository.save(canada);

        Country uk = new Country();
        uk.setCountry("United Kingdom");
        countryRepository.save(uk);

        // Create Divisions for USA
        Division california = new Division();
        california.setDivision("California");
        california.setCountryId(usa.getId());
        california.setCountry(usa);
        divisionRepository.save(california);

        Division newYork = new Division();
        newYork.setDivision("New York");
        newYork.setCountryId(usa.getId());
        newYork.setCountry(usa);
        divisionRepository.save(newYork);

        Division texas = new Division();
        texas.setDivision("Texas");
        texas.setCountryId(usa.getId());
        texas.setCountry(usa);
        divisionRepository.save(texas);

        // Create Divisions for Canada
        Division ontario = new Division();
        ontario.setDivision("Ontario");
        ontario.setCountryId(canada.getId());
        ontario.setCountry(canada);
        divisionRepository.save(ontario);

        Division britishColumbia = new Division();
        britishColumbia.setDivision("British Columbia");
        britishColumbia.setCountryId(canada.getId());
        britishColumbia.setCountry(canada);
        divisionRepository.save(britishColumbia);

        // Create Divisions for UK
        Division england = new Division();
        england.setDivision("England");
        england.setCountryId(uk.getId());
        england.setCountry(uk);
        divisionRepository.save(england);
    }

    private void initializeCustomers() {
        // Get divisions for customer assignment
        Division california = divisionRepository.findByCountryId(1L).get(0);
        Division newYork = divisionRepository.findByCountryId(1L).get(1);
        Division ontario = divisionRepository.findByCountryId(2L).get(0);

        // Customer 1
        Customer customer1 = new Customer();
        customer1.setFirstName("John");
        customer1.setLastName("Doe");
        customer1.setAddress("123 Main St");
        customer1.setPostalCode("12345");
        customer1.setPhone("5551234567");
        customer1.setDivision(california);
        customerRepository.save(customer1);

        // Customer 2
        Customer customer2 = new Customer();
        customer2.setFirstName("Jane");
        customer2.setLastName("Smith");
        customer2.setAddress("456 Oak Ave");
        customer2.setPostalCode("67890");
        customer2.setPhone("5559876543");
        customer2.setDivision(newYork);
        customerRepository.save(customer2);

        // Customer 3
        Customer customer3 = new Customer();
        customer3.setFirstName("Michael");
        customer3.setLastName("Johnson");
        customer3.setAddress("789 Pine Rd");
        customer3.setPostalCode("54321");
        customer3.setPhone("5555551234");
        customer3.setDivision(california);
        customerRepository.save(customer3);

        // Customer 4
        Customer customer4 = new Customer();
        customer4.setFirstName("Sarah");
        customer4.setLastName("Williams");
        customer4.setAddress("321 Elm St");
        customer4.setPostalCode("98765");
        customer4.setPhone("5554567890");
        customer4.setDivision(ontario);
        customerRepository.save(customer4);

        // Customer 5
        Customer customer5 = new Customer();
        customer5.setFirstName("David");
        customer5.setLastName("Brown");
        customer5.setAddress("654 Maple Dr");
        customer5.setPostalCode("13579");
        customer5.setPhone("5557890123");
        customer5.setDivision(newYork);
        customerRepository.save(customer5);
    }

    private void initializeVacationsAndExcursions() {
        // Vacation 1: Tropical Paradise
        Vacation vacation1 = new Vacation();
        vacation1.setVacationTitle("Tropical Paradise Getaway");
        vacation1.setDescription("Experience the ultimate tropical paradise with pristine beaches, crystal-clear waters, and luxurious accommodations.");
        vacation1.setPrice(new BigDecimal("1299.99"));
        vacation1.setImageUrl("https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=800");
        vacationRepository.save(vacation1);

        // Excursions for Vacation 1
        Excursion excursion1 = new Excursion();
        excursion1.setExcursionTitle("Snorkeling Adventure");
        excursion1.setExcursionPrice(new BigDecimal("89.99"));
        excursion1.setImageUrl("https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400");
        excursion1.setVacation(vacation1);
        excursionRepository.save(excursion1);

        Excursion excursion2 = new Excursion();
        excursion2.setExcursionTitle("Sunset Cruise");
        excursion2.setExcursionPrice(new BigDecimal("129.99"));
        excursion2.setImageUrl("https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400");
        excursion2.setVacation(vacation1);
        excursionRepository.save(excursion2);

        // Vacation 2: Mountain Adventure
        Vacation vacation2 = new Vacation();
        vacation2.setVacationTitle("Mountain Adventure Retreat");
        vacation2.setDescription("Discover breathtaking mountain landscapes, hiking trails, and cozy lodges in this unforgettable adventure.");
        vacation2.setPrice(new BigDecimal("899.99"));
        vacation2.setImageUrl("https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800");
        vacationRepository.save(vacation2);

        // Excursions for Vacation 2
        Excursion excursion3 = new Excursion();
        excursion3.setExcursionTitle("Guided Hiking Tour");
        excursion3.setExcursionPrice(new BigDecimal("79.99"));
        excursion3.setImageUrl("https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=400");
        excursion3.setVacation(vacation2);
        excursionRepository.save(excursion3);

        Excursion excursion4 = new Excursion();
        excursion4.setExcursionTitle("Rock Climbing Experience");
        excursion4.setExcursionPrice(new BigDecimal("149.99"));
        excursion4.setImageUrl("https://images.pexels.com/photos/449609/pexels-photo-449609.jpeg?auto=compress&cs=tinysrgb&w=400");
        excursion4.setVacation(vacation2);
        excursionRepository.save(excursion4);

        // Vacation 3: European City Explorer
        Vacation vacation3 = new Vacation();
        vacation3.setVacationTitle("European City Explorer");
        vacation3.setDescription("Immerse yourself in rich history, stunning architecture, and vibrant culture across multiple European cities.");
        vacation3.setPrice(new BigDecimal("2199.99"));
        vacation3.setImageUrl("https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=800");
        vacationRepository.save(vacation3);

        // Excursions for Vacation 3
        Excursion excursion5 = new Excursion();
        excursion5.setExcursionTitle("Museum Tour");
        excursion5.setExcursionPrice(new BigDecimal("59.99"));
        excursion5.setImageUrl("https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=400");
        excursion5.setVacation(vacation3);
        excursionRepository.save(excursion5);

        Excursion excursion6 = new Excursion();
        excursion6.setExcursionTitle("Food & Wine Tasting");
        excursion6.setExcursionPrice(new BigDecimal("189.99"));
        excursion6.setImageUrl("https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=400");
        excursion6.setVacation(vacation3);
        excursionRepository.save(excursion6);
    }
}

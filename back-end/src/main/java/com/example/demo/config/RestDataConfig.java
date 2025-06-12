package com.example.demo.config;

import com.example.demo.entities.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class RestDataConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH};

        // disable HTTP methods for entities: PUT, POST, DELETE and PATCH
        disableHttpMethods(Vacation.class, config, theUnsupportedActions);
        disableHttpMethods(Excursion.class, config, theUnsupportedActions);
        disableHttpMethods(Country.class, config, theUnsupportedActions);
        disableHttpMethods(Division.class, config, theUnsupportedActions);
        disableHttpMethods(Cart.class, config, theUnsupportedActions);
        disableHttpMethods(CartItem.class, config, theUnsupportedActions);

        // call an internal helper method to expose the ids
        exposeIds(config);
    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        // expose entity ids
        Class[] domainTypes = {Country.class, Division.class, Vacation.class, Excursion.class, Customer.class, Cart.class, CartItem.class};

        for (Class domainType : domainTypes) {
            config.exposeIdsFor(domainType);
        }
    }
}

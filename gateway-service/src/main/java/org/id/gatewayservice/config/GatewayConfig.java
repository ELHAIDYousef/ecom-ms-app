package org.id.gatewayservice.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    RouteLocator gatewayRoutes(RouteLocatorBuilder builder){
        return builder.routes()
                .route("r1", r -> r.path("/customers/**").uri("http://localhost:8081/"))
                .route("r2", r -> r.path("/prodcuts/**").uri("http://localhost:8082")).build();
    }
}

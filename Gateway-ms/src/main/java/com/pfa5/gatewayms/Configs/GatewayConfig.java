package com.pfa5.gatewayms.Configs;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.hystrix.EnableHystrix;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableHystrix
@RequiredArgsConstructor
public class GatewayConfig {
    @Autowired
    private final AuthenticationFilter filter;

    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()


                .route("auth", r -> r.path("/auth/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://AUTHENTICATION"))
                .route("auth", r -> r.path("/user/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://AUTHENTICATION"))
                .route("test",r->r.path("/test/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://TEST"))
                .route("pred",r->r.path("/pred/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://PREDICTION-MS"))
                .route("event",r->r.path("/evenement/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://EVENEMENT"))
                .build();
    }


}

package com.pfa5.testms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableDiscoveryClient
@SpringBootApplication
@EnableFeignClients
public class TestMsApplication {

    public static void main(String[] args) {
        SpringApplication.run(TestMsApplication.class, args);
        System.out.println("Hello World!");
    }

}

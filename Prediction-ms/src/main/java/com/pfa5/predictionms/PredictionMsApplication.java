package com.pfa5.predictionms;

import com.pfa5.predictionms.Entities.Prediction;
import com.pfa5.predictionms.Model.Evenement;
import com.pfa5.predictionms.Repo.PredictionRepo;
import com.pfa5.type_evenement_enumms.Type_Evenement_Enum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

import com.pfa5.type_evenement_enumms.Type_Evenement_Enum;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class PredictionMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(PredictionMsApplication.class, args);


	}

}

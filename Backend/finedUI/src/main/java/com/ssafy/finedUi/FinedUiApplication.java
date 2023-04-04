package com.ssafy.finedUi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
//@EntityScan("com.ssafy.finedUi.db.entity")
public class FinedUiApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinedUiApplication.class, args);
	}

}

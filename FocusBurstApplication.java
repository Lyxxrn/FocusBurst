package com.demo.FocusBurst;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class FocusBurstApplication {

	public static void main(String[] args) {
		SpringApplication.run(FocusBurstApplication.class, args);
	}

}

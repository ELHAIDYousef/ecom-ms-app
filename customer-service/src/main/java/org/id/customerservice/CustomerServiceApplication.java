package org.id.customerservice;

import net.datafaker.Faker;
import org.id.customerservice.entity.Customer;
import org.id.customerservice.repository.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CustomerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomerServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner start(CustomerRepository customerRepository) {
		return args -> {
			Faker faker = new Faker();
			for (int i = 0; i < 10; i++) {
				Customer customer = Customer.builder()
						.name(faker.name().fullName())
						.email(faker.internet().emailAddress())
						.build();
				customerRepository.save(customer);
			}
			customerRepository.findAll().forEach(c ->
					System.out.println(c.getName() + " - " + c.getEmail()));
		};
	}
}
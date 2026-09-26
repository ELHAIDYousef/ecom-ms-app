package org.id.billingservice;

import net.datafaker.Faker;
import org.id.billingservice.entity.Bill;
import org.id.billingservice.entity.ProductItem;
import org.id.billingservice.repository.BillRepository;
import org.id.billingservice.repository.ProductItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.Date;

@SpringBootApplication
@EnableFeignClients
public class BillingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillingServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner start(BillRepository billRepository,
	                        ProductItemRepository productItemRepository) {
		return args -> {
			Faker faker = new Faker();

			for (int i = 0; i < 5; i++) {
				// a bill for a customer whose id we know exists (1..10)
				Bill bill = billRepository.save(
						Bill.builder()
								.billingDate(new Date())
								.customerId((long) faker.number().numberBetween(1, 10))
								.build()
				);

				// 1..4 line items, each referencing a known product id (1..10)
				int lines = faker.number().numberBetween(1, 4);
				for (int j = 0; j < lines; j++) {
					productItemRepository.save(
							ProductItem.builder()
									.productId((long) faker.number().numberBetween(1, 10))
									.quantity(faker.number().numberBetween(1, 10))
									.price(faker.number().randomDouble(2, 10, 5000))
									.bill(bill)
									.build()
					);
				}
			}
			System.out.println("Seeded " + billRepository.count() + " bills, "
					+ productItemRepository.count() + " items.");
		};
	}
}
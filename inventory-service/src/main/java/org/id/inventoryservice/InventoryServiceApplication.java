package org.id.inventoryservice;

import net.datafaker.Faker;
import org.id.inventoryservice.entity.Product;
import org.id.inventoryservice.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class InventoryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InventoryServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(ProductRepository productRepository) {
		return args -> {
			Faker faker = new Faker();
			for (int i = 0; i < 10; i++) {
				Product product = Product.builder()
						.name(faker.commerce().productName())
						.price(faker.number().randomDouble(2, 10, 5000))  // 2 decimals, 10–5000
						.quantity(faker.number().numberBetween(1, 100))
						.build();
				productRepository.save(product);
			}
			productRepository.findAll().forEach(p ->
					System.out.println(p.getName() + " - " + p.getPrice() + " x" + p.getQuantity()));
		};
	}
}
package org.id.billingservice.web;

import org.id.billingservice.entity.Bill;
import org.id.billingservice.feign.CustomerRestClient;
import org.id.billingservice.feign.ProductRestClient;
import org.id.billingservice.repository.BillRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
public class BillRestController {

    private final BillRepository billRepository;
    private final CustomerRestClient customerRestClient;
    private final ProductRestClient productRestClient;

    public BillRestController(BillRepository billRepository,
                              CustomerRestClient customerRestClient,
                              ProductRestClient productRestClient) {
        this.billRepository = billRepository;
        this.customerRestClient = customerRestClient;
        this.productRestClient = productRestClient;
    }

    @GetMapping
    public ResponseEntity<List<Bill>> getAllBills() {
        return ResponseEntity.ok(billRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bill> getBill(@PathVariable Long id) {
        Bill bill = billRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Bill " + id + " not found"));
        return ResponseEntity.ok(bill);
    }

    @GetMapping("/full/{id}")
    public ResponseEntity<Bill> getFullBill(@PathVariable Long id) {
        Bill bill = billRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Bill " + id + " not found"));

        // 1. fetch the customer from CUSTOMER-SERVICE and fill the transient field
        bill.setCustomer(customerRestClient.getCustomerById(bill.getCustomerId()));

        // 2. for each line item, fetch its product from INVENTORY-SERVICE
        bill.getProductItems().forEach(item ->
                item.setProduct(productRestClient.getProductById(item.getProductId())));

        return ResponseEntity.ok(bill);
    }
}
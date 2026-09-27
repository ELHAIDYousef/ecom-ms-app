package org.id.customerservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RefreshScope
public class ConfigTestController {

    @Value("${global.params.p1}")
    private String p1;
    @Value("${global.params.p2}")
    private String p2;

    private final CustomerConfigParams customerConfigParams;

    public ConfigTestController(CustomerConfigParams customerConfigParams) {
        this.customerConfigParams = customerConfigParams;
    }

    @GetMapping("testParams1")
    public Map<String, String> test(){
        return Map.of("p1",p1,"p2",p2);
    }

    @GetMapping("/testParams2")
    public Map<String,Integer> test2() {
        return Map.of("x", customerConfigParams.getX(), "y", customerConfigParams.getY());
    }
}

package com.pfa5.predictionms.Services;

import com.pfa5.predictionms.Model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "AUTHENTICATION")
public interface UserRestClient {
    @GetMapping(path = "/user/me")
    User getMe(@RequestHeader("Authorization") String token);
}

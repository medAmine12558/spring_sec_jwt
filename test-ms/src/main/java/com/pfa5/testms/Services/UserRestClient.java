package com.pfa5.testms.Services;

import com.pfa5.testms.Model.Roles;
import com.pfa5.testms.Model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "AUTHENTICATION")
public interface UserRestClient {
    @GetMapping(path = "/user/me")
    User getMe(@RequestHeader("Authorization") String token);
}

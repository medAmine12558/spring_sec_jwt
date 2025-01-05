package com.pfa5.testms.Controller;

import com.pfa5.testms.Model.User;
import com.pfa5.testms.Services.UserRestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class testController {
    UserRestClient userRestClient;
    public testController(UserRestClient userRestClient) {
        this.userRestClient = userRestClient;
    }
    @GetMapping("/a")
    public String testController() {
        return "test";
    }
    @GetMapping("/getme")
    public User testGetMe(@RequestHeader("Authorization") String token) {

            return userRestClient.getMe(token);


    }
}

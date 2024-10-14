package com.demo.FocusBurst.controller;

import com.demo.FocusBurst.model.Account;
import com.demo.FocusBurst.repository.UserRepository;
import com.demo.FocusBurst.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping(value="/register", consumes = "application/json")
    public ResponseEntity registerUser(@RequestBody Account account){
        try {
            if (userRepository.findByEmail(account.getEmail()) != null)
                return ResponseEntity.status(HttpStatus.CONFLICT).body("E-Mail already exists. Please try again");
            account.setPassword(passwordEncoder.encode(account.getPassword()));
            Account save = userRepository.save(account);
            return ResponseEntity.ok(HttpStatus.CREATED);
        } catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
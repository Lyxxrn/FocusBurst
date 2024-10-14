package com.demo.FocusBurst.repository;

import com.demo.FocusBurst.model.Account;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<Account, Integer> {
    Account findByEmail(String email);
    Account findByUsername(String name);
}

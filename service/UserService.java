package com.demo.FocusBurst.service;

import com.demo.FocusBurst.model.Account;
import com.demo.FocusBurst.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<Account> account = Optional.ofNullable(userRepository.findByUsername(username.toLowerCase()));
        if (account.isEmpty()) {
            account = Optional.ofNullable(userRepository.findByEmail(username.toLowerCase()));
        }

        if (account.isEmpty()) {
            throw new UsernameNotFoundException(username);
        } else {
            return User.builder()
                    .username(account.get().getUsername())
                    .password(account.get().getPassword())
                    .build();
        }
    }
}
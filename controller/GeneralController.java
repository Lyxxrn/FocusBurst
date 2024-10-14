package com.demo.FocusBurst.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class GeneralController {

    @GetMapping("/login")
    public String login() {
        return "startingPage";
    }

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/about")
    public String impressum() {
        return "impressum";
    }

    @GetMapping("/contact")
    public String contact() {
        return "contact";
    }

    @GetMapping("agb")
    public String agb() {
        return "agb";
    }

    @GetMapping("/protection")
    public String protection() {
        return "datenschutz";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }

    @GetMapping("/stats")
    public String stats() {
        return "stats";
    }

    @GetMapping("/profile")
    public String profile() {
        return "profile";
    }
}

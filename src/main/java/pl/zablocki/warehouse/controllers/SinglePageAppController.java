package pl.zablocki.warehouse.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SinglePageAppController {
    @RequestMapping(value = {"/", "/products/**", "/locations/**", "/register", "/login","/profile"})
    public String index() {
        return "index.html";
    }
}
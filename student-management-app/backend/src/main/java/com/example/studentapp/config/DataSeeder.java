package com.example.studentapp.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.studentapp.model.Student;
import com.example.studentapp.repository.StudentRepository;

/** Adds a few sample rows the first time the app starts with an empty table. */
@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seed(StudentRepository repo) {
        return args -> {
            if (repo.count() == 0) {
                repo.save(new Student("Ravi Patil", "ravi.patil@example.com", 21, "Computer Science"));
                repo.save(new Student("Sneha Joshi", "sneha.joshi@example.com", 20, "Information Technology"));
                repo.save(new Student("Aman Shaikh", "aman.shaikh@example.com", 22, "Electronics"));
            }
        };
    }
}
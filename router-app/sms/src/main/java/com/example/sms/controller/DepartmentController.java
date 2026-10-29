package com.example.sms.controller;

import com.example.sms.entity.Department;
import com.example.sms.repository.DepartmentRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentRepository repo;

    public DepartmentController(DepartmentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Department> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Department create(@RequestBody Department department) {
        return repo.save(department);
    }
}

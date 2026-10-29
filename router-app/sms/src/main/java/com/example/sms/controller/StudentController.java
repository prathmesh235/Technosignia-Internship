package com.example.sms.controller;

import com.example.sms.entity.Student;
import com.example.sms.repository.StudentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentRepository repo;

    public StudentController(StudentRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Student> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getOne(@PathVariable Integer id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Student create(@RequestBody Student student) {
        return repo.save(student);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> update(@PathVariable Integer id, @RequestBody Student s) {
        return repo.findById(id).map(existing -> {
            existing.setFirstName(s.getFirstName());
            existing.setLastName(s.getLastName());
            existing.setEmail(s.getEmail());
            existing.setPhone(s.getPhone());
            existing.setDateOfBirth(s.getDateOfBirth());
            existing.setGender(s.getGender());
            existing.setDepartment(s.getDepartment());
            return ResponseEntity.ok(repo.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

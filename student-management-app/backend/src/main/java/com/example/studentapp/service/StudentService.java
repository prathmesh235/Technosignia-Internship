package com.example.studentapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.studentapp.exception.DuplicateEmailException;
import com.example.studentapp.exception.StudentNotFoundException;
import com.example.studentapp.model.Student;
import com.example.studentapp.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public List<Student> getAll() {
        return repository.findAll();
    }

    public Student getById(Long id) {
        return repository.findById(id).orElseThrow(() -> new StudentNotFoundException(id));
    }

    public Student create(Student student) {
        if (repository.existsByEmail(student.getEmail())) {
            throw new DuplicateEmailException(student.getEmail());
        }
        student.setId(null); // ignore any id sent by the client
        return repository.save(student);
    }

    public Student update(Long id, Student input) {
        Student existing = getById(id);
        if (repository.existsByEmailAndIdNot(input.getEmail(), id)) {
            throw new DuplicateEmailException(input.getEmail());
        }
        existing.setName(input.getName());
        existing.setEmail(input.getEmail());
        existing.setAge(input.getAge());
        existing.setCourse(input.getCourse());
        return repository.save(existing);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new StudentNotFoundException(id);
        }
        repository.deleteById(id);
    }
}
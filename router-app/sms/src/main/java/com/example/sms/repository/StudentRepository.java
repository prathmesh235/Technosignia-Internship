package com.example.sms.repository;

import com.example.sms.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    List<Student> findByLastName(String lastName);
}

package com.example.sms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id")
    private Integer departmentId;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(name = "head_name")
    private String headName;

    public Integer getDepartmentId() { return departmentId; }
    public void setDepartmentId(Integer departmentId) { this.departmentId = departmentId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getHeadName() { return headName; }
    public void setHeadName(String headName) { this.headName = headName; }
}

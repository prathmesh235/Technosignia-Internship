# Technosignia-Internship

A collection of programs and exercises completed during my Java internship, organised day by day.

## Repository Structure

```
java-internship-tasks/
├── Day1/
├── Day2/
├── Day3/
├── Day4/
│   └── StudentManagement.java
├── .gitignore
└── README.md
```

## Programs

| Day | Topic | Folder |
|-----|-------|--------|
| Day 1 | *( Java basics, variables, operators)* | `Day1/` |
| Day 2 | *( control statements, loops)* | `Day2/` |
| Day 3 | *( OOP: classes, objects, inheritance)* | `Day3/` |
| Day 4 | Arrays, Strings, Collections, Exception Handling, File Handling, Streams | `Day4/` |

### Day 4: Student Record Management System

A menu-driven console application that stores and processes student records.

**Features**
- Add, display and delete student records
- Search by ID (`HashMap`) or by name (Streams)
- Sort by name or by total marks
- Input validation using a custom exception (`InvalidStudentDataException`)
- Save and load records from `students.csv`
- Statistics using Java Streams (class average, topper, grade grouping)

**Concepts used:** arrays, `String` methods, `ArrayList`, `HashMap`, exception handling, file I/O, Streams.

## How to Run

Requires JDK 11 or later.

```bash
cd Day4
javac StudentManagement.java
java StudentManagement
```

## Author

**Your Name**
GitHub: [@prathmesh235](https://github.com/prathmesh235)

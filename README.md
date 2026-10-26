# Technosignia Internship: Java Tasks

![Java](https://img.shields.io/badge/Java-11%2B-orange?logo=openjdk&logoColor=white)
![Status](https://img.shields.io/badge/Status-In%20Progress-blue)

A collection of Java programs and exercises completed during my internship at **Technosignia**, organised day by day.

---

## Table of Contents

- [Repository Structure](#repository-structure)
- [Daily Overview](#daily-overview)
- [Featured Project: Student Record Management System](#featured-project-student-record-management-system)
- [Getting Started](#getting-started)
- [Author](#author)

---

## Repository Structure

```
Technosignia-Internship/
├── Day1/
├── Day2/
├── Day3/
├── Day4/
│   └── StudentManagement.java
├── Day5/
├── Day6/
├── Day7/
├── Day8/
├── Day9/
├── .gitignore
└── README.md
```

## Daily Overview

| Day | Topic | Folder |
|-----|-------|--------|
| Day 1 | Java basics, variables, operators | [Day1/](Day1/) |
| Day 2 | Control statements and loops | [Day2/](Day2/) |
| Day 3 | OOP: classes, objects, inheritance | [Day3/](Day3/) |
| Day 4 | Arrays, Strings, Collections, Exception Handling, File Handling, Streams | [Day4/](Day4/) |
| Day 5 | *Topic to be added* | [Day5/](Day5/) |
| Day 6 | *Topic to be added* | [Day6/](Day6/) |
| Day 7 | *Topic to be added* | [Day7/](Day7/) |
| Day 8 | *Topic to be added* | [Day8/](Day8/) |
| Day 9 | *Topic to be added* | [Day9/](Day9/) |

---

## Featured Project: Student Record Management System

A menu-driven console application that stores, manages and analyses student records.

### Features

- **Manage records:** add, display and delete students
- **Search:** by ID (`HashMap`) or by name (Streams)
- **Sort:** by name or by total marks
- **Validation:** custom exception (`InvalidStudentDataException`) for invalid input
- **Persistence:** save and load records from `students.csv`
- **Statistics:** class average, topper and grade grouping using Java Streams

### Concepts Used

| Area | Details |
|------|---------|
| Core Java | Arrays, `String` methods |
| Collections | `ArrayList`, `HashMap` |
| Error handling | Custom and built-in exceptions |
| File I/O | CSV read and write |
| Functional style | Java Streams |

---

## Getting Started

### Prerequisites

- JDK 11 or later

### Run the Project

```bash
# Clone the repository
git clone https://github.com/prathmesh235/Technosignia-Internship.git

# Navigate to the Day 4 folder
cd Technosignia-Internship/Day4

# Compile and run
javac StudentManagement.java
java StudentManagement
```

> **Note:** `students.csv` is created automatically in the working directory the first time you save records.

---

## Author

**Prathmesh**
GitHub: [@prathmesh235](https://github.com/prathmesh235)

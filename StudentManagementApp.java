
import java.util.ArrayList;
import java.util.Scanner;

/**
 * A student record with encapsulated fields.
 */
class StudentRecord {
    private final int id;
    private String name;
    private int age;
    private String course;
    private double marks;

    public StudentRecord(int id, String name, int age,
                         String course, double marks) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.course = course;
        this.marks = marks;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public String getCourse() {
        return course;
    }

    public double getMarks() {
        return marks;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public void setMarks(double marks) {
        this.marks = marks;
    }

    public String getGrade() {
        if (marks >= 90) return "A+";
        if (marks >= 80) return "A";
        if (marks >= 70) return "B";
        if (marks >= 60) return "C";
        if (marks >= 40) return "D";
        return "F";
    }

    @Override
    public String toString() {
        return String.format(
            "| %-4d | %-15s | %-3d | %-12s | %6.2f | %-5s |",
            id, name, age, course, marks, getGrade()
        );
    }
}

/**
 * Manages student records using CRUD operations.
 */
class StudentManager {
    private final ArrayList<StudentRecord> students =
            new ArrayList<>();

    private final Scanner sc;

    public StudentManager(Scanner sc) {
        this.sc = sc;
    }

    // Find student by ID
    private StudentRecord findById(int id) {
        for (StudentRecord student : students) {
            if (student.getId() == id) {
                return student;
            }
        }
        return null;
    }

    // Input helpers
    private int readInt(String message) {
        while (true) {
            System.out.print(message);

            if (sc.hasNextInt()) {
                int value = sc.nextInt();
                sc.nextLine();
                return value;
            }

            System.out.println("Invalid input. Enter an integer.");
            sc.nextLine();
        }
    }

    private double readDouble(String message) {
        while (true) {
            System.out.print(message);

            if (sc.hasNextDouble()) {
                double value = sc.nextDouble();
                sc.nextLine();

                if (Double.isFinite(value)) {
                    return value;
                }
            } else {
                sc.nextLine();
            }

            System.out.println("Invalid number. Try again.");
        }
    }

    private String readText(String message) {
        while (true) {
            System.out.print(message);
            String value = sc.nextLine().trim();

            if (!value.isEmpty()) {
                return value;
            }

            System.out.println("Value cannot be empty.");
        }
    }

    private int readAge() {
        while (true) {
            int age = readInt("Enter Age (1-120): ");

            if (age >= 1 && age <= 120) {
                return age;
            }

            System.out.println("Age must be between 1 and 120.");
        }
    }

    private double readMarks() {
        while (true) {
            double marks = readDouble("Enter Marks (0-100): ");

            if (marks >= 0 && marks <= 100) {
                return marks;
            }

            System.out.println("Marks must be between 0 and 100.");
        }
    }

    private void printHeader() {
        System.out.println(
            "+------+-----------------+-----+--------------+--------+-------+"
        );
        System.out.printf(
            "| %-4s | %-15s | %-3s | %-12s | %6s | %-5s |%n",
            "ID", "Name", "Age", "Course", "Marks", "Grade"
        );
        System.out.println(
            "+------+-----------------+-----+--------------+--------+-------+"
        );
    }

    // CREATE
    public void addStudent() {
        System.out.println("\n--- Add Student ---");

        int id = readInt("Enter Student ID: ");

        if (id <= 0) {
            System.out.println("ID must be positive.");
            return;
        }

        if (findById(id) != null) {
            System.out.println("Student ID already exists.");
            return;
        }

        String name = readText("Enter Name: ");
        int age = readAge();
        String course = readText("Enter Course: ");
        double marks = readMarks();

        students.add(
            new StudentRecord(id, name, age, course, marks)
        );

        System.out.println("Student added successfully!");
    }

    // READ
    public void viewStudents() {
        System.out.println("\n--- All Students ---");

        if (students.isEmpty()) {
            System.out.println("No student records found.");
            return;
        }

        printHeader();

        for (StudentRecord student : students) {
            System.out.println(student);
        }

        System.out.println(
            "+------+-----------------+-----+--------------+--------+-------+"
        );
        System.out.println("Total Students: " + students.size());
    }

    // SEARCH
    public void searchStudent() {
        System.out.println("\n--- Search Student ---");

        int id = readInt("Enter Student ID: ");
        StudentRecord student = findById(id);

        if (student == null) {
            System.out.println("Student not found.");
            return;
        }

        printHeader();
        System.out.println(student);
        System.out.println(
            "+------+-----------------+-----+--------------+--------+-------+"
        );
    }

    // UPDATE
    public void updateStudent() {
        System.out.println("\n--- Update Student ---");

        int id = readInt("Enter Student ID to update: ");
        StudentRecord student = findById(id);

        if (student == null) {
            System.out.println("Student not found.");
            return;
        }

        System.out.println("Current Details:");
        System.out.println(student);

        System.out.println("Enter new details:");

        String name = readText("Enter New Name: ");
        int age = readAge();
        String course = readText("Enter New Course: ");
        double marks = readMarks();

        student.setName(name);
        student.setAge(age);
        student.setCourse(course);
        student.setMarks(marks);

        System.out.println("Student updated successfully!");
    }

    // DELETE
    public void deleteStudent() {
        System.out.println("\n--- Delete Student ---");

        int id = readInt("Enter Student ID to delete: ");
        StudentRecord student = findById(id);

        if (student == null) {
            System.out.println("Student not found.");
            return;
        }

        System.out.println("Student Details:");
        System.out.println(student);

        System.out.print("Confirm deletion? (yes/no): ");
        String confirm = sc.nextLine().trim();

        if (confirm.equalsIgnoreCase("yes")) {
            students.remove(student);
            System.out.println("Student deleted successfully!");
        } else {
            System.out.println("Deletion cancelled.");
        }
    }

    // MENU
    public void run() {
        int choice;

        do {
            System.out.println("\n================================");
            System.out.println("   STUDENT MANAGEMENT SYSTEM");
            System.out.println("================================");
            System.out.println("1. Add Student");
            System.out.println("2. View All Students");
            System.out.println("3. Search Student");
            System.out.println("4. Update Student");
            System.out.println("5. Delete Student");
            System.out.println("0. Exit");
            System.out.println("================================");

            choice = readInt("Enter your choice: ");

            switch (choice) {
                case 1:
                    addStudent();
                    break;

                case 2:
                    viewStudents();
                    break;

                case 3:
                    searchStudent();
                    break;

                case 4:
                    updateStudent();
                    break;

                case 5:
                    deleteStudent();
                    break;

                case 0:
                    System.out.println("Thank you for using the application!");
                    break;

                default:
                    System.out.println("Invalid choice. Try again.");
            }
        } while (choice != 0);
    }
}

/**
 * Main application class.
 */
public class StudentManagementApp {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        StudentManager manager = new StudentManager(sc);
        manager.run();

        sc.close();
    }
}

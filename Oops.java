
/**
 * Day 3 - OOP Practice Program
 * Covers:
 * Classes, Objects, Constructors, Encapsulation,
 * Inheritance, Polymorphism, Abstraction,
 * Access Modifiers and Method Overloading.
 */

// ABSTRACTION: Interface defines what a class must do
interface Printable {
    void printDetails();
}

// ABSTRACTION: Abstract class cannot be instantiated
abstract class Person implements Printable {

    // ENCAPSULATION: Private fields
    private String name;
    private int age;

    // ACCESS MODIFIERS
    protected String country = "India";
    String category = "General"; // Default access
    public static int totalPeople = 0;

    // CONSTRUCTOR OVERLOADING + CONSTRUCTOR CHAINING
    public Person() {
        this("Unknown", 18);
    }

    public Person(String name, int age) {
        setName(name);
        setAge(age);
        totalPeople++;
    }

    // GETTER AND SETTER
    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (name == null || name.trim().isEmpty()) {
            System.out.println("Invalid name, keeping previous value.");
            return;
        }
        this.name = name.trim();
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age < 1 || age > 120) {
            System.out.println("Invalid age, keeping previous value.");
            return;
        }
        this.age = age;
    }

    // METHOD OVERLOADING
    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }

    public void displayInfo(String title) {
        System.out.println(title + ": " + name);
        System.out.println("Age: " + age);
    }

    // ABSTRACT METHOD
    public abstract void showRole();

    // INTERFACE METHOD IMPLEMENTATION
    @Override
    public void printDetails() {
        displayInfo();
        System.out.println("Country: " + country);
        System.out.println("Category: " + category);
    }
}

// INHERITANCE: Student inherits Person
class Student extends Person {

    private int rollNo;
    private String course;

    public Student(String name, int age, int rollNo, String course) {
        super(name, age);
        this.rollNo = rollNo;
        this.course = course;
    }

    public int getRollNo() {
        return rollNo;
    }

    public String getCourse() {
        return course;
    }

    // METHOD OVERRIDING: Runtime polymorphism
    @Override
    public void showRole() {
        System.out.println("Role: Student");
    }

    @Override
    public void printDetails() {
        super.printDetails();
        System.out.println("Roll Number: " + rollNo);
        System.out.println("Course: " + course);
    }
}

// INHERITANCE: Employee inherits Person
class Employee extends Person {

    private int employeeId;
    private double salary;

    public Employee(String name, int age, int employeeId,
                    double salary) {
        super(name, age);
        this.employeeId = employeeId;
        this.salary = salary;
    }

    // METHOD OVERRIDING
    @Override
    public void showRole() {
        System.out.println("Role: Employee");
    }

    @Override
    public void printDetails() {
        super.printDetails();
        System.out.println("Employee ID: " + employeeId);
        System.out.println("Salary: " + salary);
    }
}

// MAIN CLASS
public class Oops {

    public static void main(String[] args) {

        System.out.println("===== JAVA OOP DEMO =====");

        // OBJECT CREATION
        Student s1 = new Student(
            "Prathmesh", 21, 101, "BCA"
        );

        Employee e1 = new Employee(
            "Rahul", 25, 501, 35000
        );

        // CLASS AND OBJECT + ENCAPSULATION
        System.out.println("\n--- Student Details ---");
        s1.printDetails();

        // METHOD OVERLOADING
        System.out.println("\n--- Method Overloading ---");
        s1.displayInfo();
        s1.displayInfo("Student Name");

        // ABSTRACTION
        System.out.println("\n--- Abstract Method ---");
        s1.showRole();
        e1.showRole();

        // POLYMORPHISM: Parent reference, child objects
        System.out.println("\n--- Runtime Polymorphism ---");

        Person p1 = s1;
        Person p2 = e1;

        p1.showRole();
        p2.showRole();

        // INTERFACE
        System.out.println("\n--- Interface Implementation ---");
        Printable printable = s1;
        printable.printDetails();

        // ENCAPSULATION: Update using setter
        System.out.println("\n--- Encapsulation ---");
        s1.setAge(22);
        System.out.println("Updated Age: " + s1.getAge());

        // STATIC VARIABLE
        System.out.println("\nTotal People Created: "
                           + Person.totalPeople);

        System.out.println("\nProgram completed successfully.");
    }
}

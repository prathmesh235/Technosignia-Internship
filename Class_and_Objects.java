class Student {
    String name;
    int age;

    void display() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }
}

public class Class_and_Objects {
    public static void main(String[] args) {
        Student s1 = new Student();

        s1.name = "Prathmesh";
        s1.age = 21;

        s1.display();
    }
}
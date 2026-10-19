import java.util.Scanner;

public class Check_Positive_Negative_or_Zero {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int n = sc.nextInt();

        if (n > 0) {
            System.out.println("Positive Number");
        } else if (n < 0) {
            System.out.println("Negative Number");
        } else {
            System.out.println("Zero");
        }

        sc.close();
    }
}
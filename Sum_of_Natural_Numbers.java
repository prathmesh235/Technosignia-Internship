import java.util.Scanner;

public class Sum_of_Natural_Numbers {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int n = sc.nextInt();
        long sum = 0;

        if (n < 1) {
            System.out.println("Enter a positive number");
        } else {
            for (int i = 1; i <= n; i++) {
                sum += i;
            }

            System.out.println("Sum: " + sum);
        }

        sc.close();
    }
}
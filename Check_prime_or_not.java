import java.util.Scanner;

public class Check_prime_or_not {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int n = sc.nextInt();
        boolean prime = n >= 2;

        for (int i = 2; i <= n / i && prime; i++) {
            if (n % i == 0) {
                prime = false;
            }
        }

        if (prime) {
            System.out.println("Prime Number");
        } else {
            System.out.println("Not a Prime Number");
        }

        sc.close();
    }
}
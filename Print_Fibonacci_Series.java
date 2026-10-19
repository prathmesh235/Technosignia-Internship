import java.util.Scanner;

public class Print_Fibonacci_Series {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of terms: ");
        int n = sc.nextInt();

        long a = 0, b = 1;

        if (n < 1 || n > 92) {
            System.out.println("Enter a number between 1 and 92");
        } else {
            for (int i = 1; i <= n; i++) {
                System.out.print(a + " ");

                if (i < n) {
                    long next = a + b;
                    a = b;
                    b = next;
                }
            }
        }

        sc.close();
    }
}
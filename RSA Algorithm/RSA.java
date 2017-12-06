/** A class that implements the RSA algorithm. 
    @author Ammar Babar and Yukihiko Segawa 
    Code was largely inspired by http://www.sanfoundry.com/java-program-implement-rsa-algorithm/
*/
import java.io.DataInputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.util.Random; 

public class RSA
{
    private BigInteger p;
    private BigInteger q;
    private BigInteger n;
    private BigInteger phi;
    private BigInteger e;
    private BigInteger d;
    private Random     r;

    /** This is the constructor of the class RSA
    @param: int length: length of primes to be selected in bits
    */
    public RSA(int length)
    {
        r = new Random();
        //checking if a number is prime is an NP problem on non-quantum computers so we choose the
        //built-in method probablePrime which finds a large number which is probably prime
        p = BigInteger.probablePrime(length, r); 
        q = BigInteger.probablePrime(length, r);
        n = p.multiply(q);
        phi = p.subtract(BigInteger.ONE).multiply(q.subtract(BigInteger.ONE)); //phi = (p-1)(q-1)
        e = BigInteger.probablePrime(length / 2, r);
        while (phi.gcd(e).compareTo(BigInteger.ONE) > 0 && e.compareTo(phi) < 0)
        {
            e.add(BigInteger.ONE);
        }
        d = e.modInverse(phi);
    }

     /** To covert a byte array into a string
    @param: byte[] message: array of byte objects representing the message
    @return: String obtained from the byte array
    */
    private static String bytesToString(byte[] message)
    {
        String messageInString = "";
        for (byte b : message)
        {
            messageInString += Byte.toString(b);
        }
        return messageInString;
    }

     /** This method encrypts a message
    @param: byte[] message: message to be encoded
    @return: byte[] of encoded message
    */
    public byte[] encrypt(byte[] message)
    {
        return (new BigInteger(message)).modPow(e, n).toByteArray();
    }

    /** This method decrypts a coded message
    @param: byte[] message: message to be decoded
    @return: byte[] of decoded message
    */
    public byte[] decrypt(byte[] message)
    {
        return (new BigInteger(message)).modPow(d, n).toByteArray();
    }

    /** This is the main method which runs the code
        @params: String[] args: command line arguments
    */
    @SuppressWarnings("deprecation")
    public static void main(String[] args) throws IOException
    {
        RSA rsa = new RSA(1024);
        DataInputStream in = new DataInputStream(System.in);
        System.out.println("The public key is given by (e,n) which is: \n" + "e = " + rsa.e + "\n" + "n = " + rsa.n );
        System.out.println(rsa.phi);
        System.out.println("Enter the message to encode:");
        String message = in.readLine();
        System.out.println("Message in bytes: "
                + bytesToString(message.getBytes()));
        // encrypt
        byte[] encrypted = rsa.encrypt(message.getBytes());
         System.out.println("Encoded message: "
                + bytesToString(encrypted));
        // decrypt
        byte[] decrypted = rsa.decrypt(encrypted);
        System.out.println("Decrypted message: " + new String(decrypted));
    }
}
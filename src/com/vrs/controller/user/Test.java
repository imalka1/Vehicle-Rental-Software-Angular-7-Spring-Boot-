package com.vrs.controller.user;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

public class Test {
    public static void main(String[] args) {
//        try {
//            String text = "Hello World";
////            String key = "Bar12345Bar12345"; // 128 bit key
//            // Create key and cipher
//            String passphrase = "correct horse battery staple";
//            MessageDigest digest = MessageDigest.getInstance("SHA");
//            digest.update(passphrase.getBytes());
//            SecretKeySpec key = new SecretKeySpec(digest.digest(), 0, 16, "AES");
//            Cipher aes = Cipher.getInstance("AES/ECB/PKCS5Padding");
//            aes.init(Cipher.ENCRYPT_MODE, key);
//            byte[] ciphertext = aes.doFinal("my cleartext".getBytes());
//            RentalSystem.out.println(new String(ciphertext));
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

//        RentalSystem.out.println(1);
//        try {
//            Thread.sleep(2000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
//        Thread thread = Thread.currentThread();
//        int x=2;
//        System.out.println(1);
//        new Thread(() -> {
////            try {
////                thread.join();
////            } catch (InterruptedException e) {
////                e.printStackTrace();
////            }
//            System.out.println(x);
//        }).start();
//
//        try {
//            Thread.sleep(5000);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
// System.out.println(3);
//        System.out.println(4);

        Random random = new Random();
        System.out.println(10000+random.nextInt(10000));
    }
}

package com.example.CsudhPlanner.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.lang.NonNull;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.security.spec.KeySpec;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Random;
import com.example.CsudhPlanner.secrets;


public class Person {

    @NonNull
    private final Integer id;

    @NonNull
    private final String Firstname;
    @NonNull
    private final String LastName;
    private final String email;
    @NonNull
    private final ArrayList<Integer> completedCourses;
    private final ArrayList<Integer> currentCourses;
    private final Integer schoolPlan;
    @NonNull
    private final String password;

    @NonNull
    private final String salt; //Salts Need to be generated from front End

    private static final Random RANDOM = new SecureRandom();


    public Person(@NonNull @JsonProperty("id") Integer id,
                  @NonNull @JsonProperty("FirstName") String FirstName,
                  @NonNull @JsonProperty("LastName") String LastName,
                  @NonNull @JsonProperty("email") String email,
                  @NonNull @JsonProperty("completedCourses") ArrayList<Integer> completed,
                  @JsonProperty("currentCourses") ArrayList<Integer> current,
                  @JsonProperty("schoolPlan") Integer schoolPlan,
                  @NonNull @JsonProperty("password") String password,
                  @NonNull @JsonProperty("salt") String salt) {

        this.id = id;
        this.Firstname = FirstName;
        this.LastName = LastName;
        this.email = email;
        this.completedCourses = completed;
        this.currentCourses = current;
        this.schoolPlan = schoolPlan;
        this.password = password;
        this.salt = salt;
    }




    @NonNull
    public Integer getId(){
        return id;
    }

    @NonNull
    public String getFirstname(){
        return Firstname;
    }

    @NonNull
    public String getLastname(){
        return LastName;
    }

    public String getEmail(){
        return email;
    }

    public String getPassword(){ return password;}

    public String returnSalt(){ return salt;}

    @NonNull
    public ArrayList<Integer> getCompletedCourses(){
        return completedCourses;
    }

    public ArrayList<Integer> getCurrentCourses(){return currentCourses;}

    public Integer getSchoolPlan(){return schoolPlan;}



    //Methods to hold passwords     //Methods Referenced here: https://howtodoinjava.com/java/java-security/aes-256-encryption-decryption/in SQL database Securely

    public String getSalt(int length){
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int c = RANDOM.nextInt(62);
            if (c <= 9) {
                sb.append(String.valueOf(c));
            } else if (c < 36) {
                sb.append((char) ('a' + c - 10));
            } else {
                sb.append((char) ('A' + c - 36));
            }
        }
        return sb.toString();
    }

    public String encrypt(String strToEncrypt,String salt)
    {
        try
        {
            byte[] iv = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
            IvParameterSpec ivspec = new IvParameterSpec(iv);

            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            KeySpec spec = new PBEKeySpec(secrets.secretKey.toCharArray(), salt.getBytes(), 65536, 256);
            SecretKey tmp = factory.generateSecret(spec);
            SecretKeySpec secretKey = new SecretKeySpec(tmp.getEncoded(), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivspec);
            return Base64.getEncoder().encodeToString(cipher.doFinal(strToEncrypt.getBytes(StandardCharsets.UTF_8)));
        }
        catch (Exception e)
        {
            System.out.println("Error while encrypting: " + e.toString());
        }
        return null;
    }

    public String decrypt(String strToDecrypt,String salt) {
        try
        {
            byte[] iv = { 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 };
            IvParameterSpec ivspec = new IvParameterSpec(iv);

            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            KeySpec spec = new PBEKeySpec(secrets.secretKey.toCharArray(), salt.getBytes(), 65536, 256);
            SecretKey tmp = factory.generateSecret(spec);
            SecretKeySpec secretKeyS = new SecretKeySpec(tmp.getEncoded(), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, secretKeyS, ivspec);
            return new String(cipher.doFinal(Base64.getDecoder().decode(strToDecrypt)));
        }
        catch (Exception e) {
            System.out.println("Error while decrypting: " + e.toString());
        }
        return null;
    }






}

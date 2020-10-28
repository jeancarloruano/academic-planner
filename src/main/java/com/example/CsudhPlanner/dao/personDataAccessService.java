package com.example.CsudhPlanner.dao;

import com.example.CsudhPlanner.model.Course;
import com.example.CsudhPlanner.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;
import org.springframework.stereotype.Repository;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import javax.swing.text.html.Option;
import java.security.spec.KeySpec;
import java.sql.Array;
import java.sql.SQLException;
import java.util.*;

@Repository("postgres")
public class personDataAccessService implements personDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public personDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    // People Methods
    @Override
    public int insertPerson(Person person) {
        String sql = "Insert INTO person (id, FirstName,LastName, email, completedCourses,password,salt) VALUES (?,?,?,?,?,?,?)";
        return jdbcTemplate.update(sql,
                person.getId(),
                person.getFirstname(),
                person.getLastname(),
                person.getEmail(),
                createSqlArray(person.getCompletedCourses()),
                person.encrypt(person.getPassword(),person.returnSalt()),
                person.returnSalt()
        );
    }

    @Override
    public List<Person> selectAllPeople() {
        final String sql = "SELECT * FROM person";
        return jdbcTemplate.query(sql,(resultSet , i) -> {
            int id = resultSet.getInt("id");
            String FirstName = resultSet.getString("FirstName");
            String LastName = resultSet.getString("LastName");
            String email = resultSet.getString("email");
            ArrayList<Integer> test = createArrayList(resultSet.getArray("completedCourses"));
            String password = resultSet.getString("password");
            String salt = resultSet.getString("salt");
            return new Person(
                    id,
                    FirstName,
                    LastName,
                    email,
                    test,
                    password,
                    salt);
        });
    }

    private java.sql.Array createSqlArray(ArrayList<Integer> courses){
        java.sql.Array intArray = null;
        try{
            intArray = Objects.requireNonNull(jdbcTemplate.getDataSource()).getConnection().createArrayOf("integer", courses.toArray());
        } catch (SQLException ignore){
        }
        return intArray;
    }

    private ArrayList<Integer> createArrayList(Array input){
        ArrayList<Integer> output = new ArrayList<>();

        try {
            Integer[] test = (Integer[]) input.getArray();
            output.addAll(Arrays.asList(test));

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return output;
    }

    @Override
    public Optional<Person> selectPersonById(Integer id) {
        final String sql = "SELECT id,FirstName,LastName,email,completedCourses,password,salt FROM person WHERE id = ?";
        Person person = jdbcTemplate.queryForObject(
                sql,
                new Object[]{id},
                (resultSet , i) -> {
                    int personId = resultSet.getInt("id");
                    String FirstName = resultSet.getString("FirstName");
                    String LastName = resultSet.getString("LastName");
                    String email = resultSet.getString("email");
                    ArrayList<Integer> test = createArrayList(resultSet.getArray("completedCourses"));
                    String password = resultSet.getString("password");
                    String salt = resultSet.getString("salt");
                    return new Person(
                            personId,
                            FirstName,
                            LastName,
                            email,
                            test,
                            password,
                            salt);
                });

        return Optional.ofNullable(person);
    }

    @Override
    public Optional<Person> selectPersonByEmail(String email){
        final String sql = "SELECT id,FirstName,LastName,email,completedCourses,password,salt FROM person WHERE email = ?";
        Person person = jdbcTemplate.queryForObject(
                sql,
                new Object[]{email},
                (resultSet , i) -> {
                    int personId = resultSet.getInt("id");
                    String FirstName = resultSet.getString("FirstName");
                    String LastName = resultSet.getString("LastName");
                    String emails = resultSet.getString("email");
                    ArrayList<Integer> test = createArrayList(resultSet.getArray("completedCourses"));
                    String password = resultSet.getString("password");
                    String salt = resultSet.getString("salt");
                    return new Person(
                            personId,
                            FirstName,
                            LastName,
                            emails,
                            test,
                            password,
                            salt);
                });

        return Optional.ofNullable(person);
    }

    @Override
    public int deletePersonById(int id) {
        String sql = "DELETE FROM person WHERE id = " + id;
        return jdbcTemplate.update(sql);
    }

    @Override
    public int updatePersonById(int id, Person person) {
        String sql = "UPDATE person " +
                "SET completedCourses =  '"  + createSqlArray(person.getCompletedCourses()) +
                "' WHERE id = " + id;

        jdbcTemplate.update(sql);


        return 0;
    }

    @Override
    public ArrayList<ArrayList<Course>> standardPlan(int id){
        ArrayList<ArrayList<Course>> plan1 = new ArrayList<>();
        List<Course> allCourses = selectAllCourses();
        ArrayList<Course> allCourses2 = new ArrayList<>(allCourses);

        Optional<Person> tempPerson = selectPersonById(id);
        Person person = tempPerson.get();
        List<Course> personCourses = new ArrayList<>();

        for(Integer i : person.getCompletedCourses()){
            Optional<Course> temp = selectCourseById(i);
            Course c = temp.get();
            personCourses.add(c);
        }

        allCourses2.removeIf(c -> person.getCompletedCourses().contains(c.getNumber()));


        ArrayList<Course> temp = new ArrayList<>();
        int tally = 0;
        for(Course c : allCourses2){
            if(tally > 10){
                plan1.add(temp);
                temp = new ArrayList<>();
                tally = 0;
            }

            temp.add(c);
            tally += c.getCredits();
        }
        return plan1;
    }


    @Override
    public ArrayList<ArrayList<Course>> acceleratedPlan(int id){
        ArrayList<ArrayList<Course>> plan1 = new ArrayList<>();
        List<Course> allCourses = selectAllCourses();
        ArrayList<Course> allCourses2 = new ArrayList<>(allCourses);

        Optional<Person> tempPerson = selectPersonById(id);
        Person person = tempPerson.get();
        List<Course> personCourses = new ArrayList<>();

        for(Integer i : person.getCompletedCourses()){
            Optional<Course> temp = selectCourseById(i);
            Course c = temp.get();
            personCourses.add(c);
        }

        allCourses2.removeIf(c -> person.getCompletedCourses().contains(c.getNumber()));


        ArrayList<Course> temp = new ArrayList<>();
        int tally = 0;
        for(Course c : allCourses2){
            if(tally > 13){
                plan1.add(temp);
                temp = new ArrayList<>();
                tally = 0;
            }

            temp.add(c);
            tally += c.getCredits();
        }
        return plan1;
    }

    @Override
    public ArrayList<ArrayList<Course>> partTimePlan(int id){
        ArrayList<ArrayList<Course>> plan1 = new ArrayList<>();
        List<Course> allCourses = selectAllCourses();
        ArrayList<Course> allCourses2 = new ArrayList<>(allCourses);

        Optional<Person> tempPerson = selectPersonById(id);
        Person person = tempPerson.get();
        List<Course> personCourses = new ArrayList<>();

        for(Integer i : person.getCompletedCourses()){
            Optional<Course> temp = selectCourseById(i);
            Course c = temp.get();
            personCourses.add(c);
        }

        allCourses2.removeIf(c -> person.getCompletedCourses().contains(c.getNumber()));


        ArrayList<Course> temp = new ArrayList<>();
        int tally = 0;
        for(Course c : allCourses2){
            if(tally > 3){
                plan1.add(temp);
                temp = new ArrayList<>();
                tally = 0;
            }

            temp.add(c);
            tally += c.getCredits();
        }
        return plan1;
    }

    @Override
    public boolean checkPassword(String email,String password){

        Optional<Person> person = selectPersonByEmail(email);
        Person storedUser = person.get();

        String de = storedUser.decrypt(storedUser.getPassword(),storedUser.returnSalt());

        return password.equals(de);


    }





    //Course Methods
    @Override
    public int insertCourse(Course course) {
        String sql = "Insert INTO courses (number, name, description, prerequisites) VALUES (?,?,?,?)";
        return jdbcTemplate.update(sql,
                course.getNumber(),
                course.getName(),
                course.getDescription(),
                createSqlArray(course.getPrerequistes()));
    }

    @Override
    public List<Course> selectAllCourses(){
        final String sql = "SELECT * FROM courses";
        return jdbcTemplate.query(sql,(resultSet , i) -> {
            int number = resultSet.getInt("number");
            String name = resultSet.getString("name");
            String description = resultSet.getString("description");
            ArrayList<Integer> test = createArrayList(resultSet.getArray("prerequisites"));
            int credits = resultSet.getInt("credits");
            return new Course(
                    number,
                    name,
                    description,
                    test,
                    credits);
        });
    }

    @Override
    public Optional<Course> selectCourseById(Integer number){
        final String sql = "SELECT * FROM courses WHERE number = ?";
        Course course = jdbcTemplate.queryForObject(
                sql,
                new Object[]{number},
                (resultSet , i) -> {
                    int courseID = resultSet.getInt("number");
                    String name = resultSet.getString("name");
                    String description = resultSet.getString("description");
                    ArrayList<Integer> prerequisites = createArrayList(resultSet.getArray("prerequisites"));
                    int credits = resultSet.getInt("credits");
                    return new Course(
                            courseID,
                            name,
                            description,
                            prerequisites,
                            credits);
                });

        return Optional.ofNullable(course);
    }

    @Override
    public int deleteCourseById(int number){
        String sql = "DELETE FROM courses WHERE number = " + number;
        return jdbcTemplate.update(sql);
    }

    @Override
    public int updateCourseById(int number, Course course) {
        String sql = "UPDATE courses " +
                "SET prerequisites =  '"  + createSqlArray(course.getPrerequistes()) +
                "' WHERE number = " + number;

        jdbcTemplate.update(sql);
        return 0;
    }
}

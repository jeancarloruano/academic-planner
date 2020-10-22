package com.example.CsudhPlanner.dao;

import com.example.CsudhPlanner.model.Course;
import com.example.CsudhPlanner.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
        String sql = "Insert INTO person (id, name, email, completedCourses) VALUES (?,?,?,?)";
        return jdbcTemplate.update(sql,
                person.getId(),
                person.getName(),
                person.getEmail(),
                createSqlArray(person.getCompletedCourses()));
    }

    @Override
    public List<Person> selectAllPeople() {
        final String sql = "SELECT * FROM person";
        return jdbcTemplate.query(sql,(resultSet , i) -> {
            int id = resultSet.getInt("id");
            String name = resultSet.getString("name");
            String email = resultSet.getString("email");
            ArrayList<Integer> test = createArrayList(resultSet.getArray("completedCourses"));

            return new Person(
                    id,
                    name,
                    email,
                    test);
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
        final String sql = "SELECT id,name,email,completedCourses FROM person WHERE id = ?";
        Person person = jdbcTemplate.queryForObject(
                sql,
                new Object[]{id},
                (resultSet , i) -> {
                    int personId = resultSet.getInt("id");
                    String name = resultSet.getString("name");
                    String email = resultSet.getString("email");
                    ArrayList<Integer> test = createArrayList(resultSet.getArray("completedCourses"));
                    return new Person(
                            personId,
                            name,
                            email,
                            test);
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
    public ArrayList<Integer> getPersonsNeededCourseList(String name, Person person){
        String sql = "SELECT completedCourses FROM person WHERE name = ?";
        Array comCourses = (Array) jdbcTemplate.query(sql,(resultSet , i) -> {
            ArrayList<Integer> test = createArrayList(resultSet.getArray("prerequisites"));
            return test;
        });

        ArrayList<Integer> CC = createArrayList(comCourses);



        return CC;

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
            return new Course(
                    number,
                    name,
                    description,
                    test);
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
                    return new Course(
                            courseID,
                            name,
                            description,
                            prerequisites);
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

package com.example.CsudhPlanner.dao;

import com.example.CsudhPlanner.model.Course;
import com.example.CsudhPlanner.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
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
        String sql = "Insert INTO person (id, FirstName,LastName, email, completedCourses,currentCourses,schoolPlan,password,salt) VALUES (?,?,?,?,?,?,?,?,?)";
        return jdbcTemplate.update(sql,
                person.getId(),
                person.getFirstname(),
                person.getLastname(),
                person.getEmail(),
                createSqlArray(person.getCompletedCourses()),
                createSqlArray(person.getCurrentCourses()),
                person.getSchoolPlan(),
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
            ArrayList<String> test = createArrayList(resultSet.getArray("completedCourses"));
            ArrayList<String> current = createArrayList(resultSet.getArray("currentCourses"));
            Integer schoolPlan = resultSet.getInt("schoolPlan");
            String password = resultSet.getString("password");
            String salt = resultSet.getString("salt");
            return new Person(
                    id,
                    FirstName,
                    LastName,
                    email,
                    test,
                    current,
                    schoolPlan,
                    password,
                    salt);
        });
    }

    private java.sql.Array createSqlArray(ArrayList<String> courses){
        java.sql.Array intArray = null;
        try{
            intArray = Objects.requireNonNull(jdbcTemplate.getDataSource()).getConnection().createArrayOf("TEXT", courses.toArray());
        } catch (SQLException ignore){
        }
        return intArray;
    }

    private ArrayList<String> createArrayList(Array input){
        ArrayList<String> output = new ArrayList<>();

        try {
            String[] test = (String[]) input.getArray();
            output.addAll(Arrays.asList(test));

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return output;
    }

    @Override
    public Optional<Person> selectPersonById(Integer id) {
        final String sql = "SELECT * FROM person WHERE id = ?";
        Person person = jdbcTemplate.queryForObject(
                sql,
                new Object[]{id},
                (resultSet , i) -> {
                    int personId = resultSet.getInt("id");
                    String FirstName = resultSet.getString("FirstName");
                    String LastName = resultSet.getString("LastName");
                    String email = resultSet.getString("email");
                    ArrayList<String> test = createArrayList(resultSet.getArray("completedCourses"));
                    ArrayList<String> current = createArrayList(resultSet.getArray("currentCourses"));
                    Integer schoolPlan = resultSet.getInt("schoolPlan");
                    String password = resultSet.getString("password");
                    String salt = resultSet.getString("salt");
                    return new Person(
                            personId,
                            FirstName,
                            LastName,
                            email,
                            test,
                            current,
                            schoolPlan,
                            password,
                            salt);
                });

        return Optional.ofNullable(person);
    }

    @Override
    public Optional<Person> selectPersonByEmail(String email){
        final String sql = "SELECT * FROM person WHERE email = ?";
        Person person = jdbcTemplate.queryForObject(
                sql,
                new Object[]{email},
                (resultSet , i) -> {
                    int personId = resultSet.getInt("id");
                    String FirstName = resultSet.getString("FirstName");
                    String LastName = resultSet.getString("LastName");
                    String emails = resultSet.getString("email");
                    ArrayList<String> test = createArrayList(resultSet.getArray("completedCourses"));
                    ArrayList<String> current = createArrayList(resultSet.getArray("currentCourses"));
                    Integer schoolPlan = resultSet.getInt("schoolPlan");
                    String password = resultSet.getString("password");
                    String salt = resultSet.getString("salt");
                    return new Person(
                            personId,
                            FirstName,
                            LastName,
                            emails,
                            test,
                            current,
                            schoolPlan,
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
                "', schoolPlan = '" + person.getSchoolPlan() +
                "', currentCourses = '" + createSqlArray(person.getCurrentCourses())+
                "' WHERE id = " + id;

        jdbcTemplate.update(sql);
        return 0;
    }

    @Override
    public ArrayList<ArrayList<Course>> standardPlan(String email){
        ArrayList<ArrayList<Course>> plan1 = new ArrayList<>();
        List<Course> allCourses = selectAllCourses();
        ArrayList<Course> allCourses2 = new ArrayList<>(allCourses);

        Optional<Person> tempPerson = selectPersonByEmail(email);
        Person person = tempPerson.get();

        allCourses2.removeIf(c -> person.getCompletedCourses().contains(c.getKeyNumber()));
        allCourses2.removeIf(c -> person.getCurrentCourses().contains(c.getKeyNumber()));




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

            if(allCourses2.get(allCourses2.toArray().length - 1) == c){
                plan1.add(temp);
            }
        }
        return plan1;
    }

    @Override
    public ArrayList<ArrayList<Course>> acceleratedPlan(String email){
        ArrayList<ArrayList<Course>> plan1 = new ArrayList<>();
        List<Course> allCourses = selectAllCourses();
        ArrayList<Course> allCourses2 = new ArrayList<>(allCourses);

        Optional<Person> tempPerson = selectPersonByEmail(email);
        Person person = tempPerson.get();

        allCourses2.removeIf(c -> person.getCompletedCourses().contains(c.getNumber()));
        allCourses2.removeIf(c -> person.getCurrentCourses().contains(c.getNumber()));

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

            if(allCourses2.get(allCourses2.toArray().length - 1) == c){
                plan1.add(temp);
            }
        }
        return plan1;
    }

    @Override
    public ArrayList<ArrayList<Course>> partTimePlan(String email){
        ArrayList<ArrayList<Course>> plan1 = new ArrayList<>();
        List<Course> allCourses = selectAllCourses();
        ArrayList<Course> allCourses2 = new ArrayList<>(allCourses);

        Optional<Person> tempPerson = selectPersonByEmail(email);
        Person person = tempPerson.get();


        allCourses2.removeIf(c -> person.getCompletedCourses().contains(c.getNumber()));
        allCourses2.removeIf(c -> person.getCurrentCourses().contains(c.getNumber()));


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

            if(allCourses2.get(allCourses2.toArray().length - 1) == c){
                plan1.add(temp);
            }
        }
        return plan1;
    }



    //Verify with wrong email given

    @Override
    public boolean checkPassword(String email,String password){
        try{
        Optional<Person> person = selectPersonByEmail(email);
        Person storedUser = person.get();

            String de = storedUser.decrypt(storedUser.getPassword(), storedUser.returnSalt());

            return password.equals(de);
        }catch (Exception o) {
            return false;
        }

    }

    @Override
    public ArrayList<String> currentCourses(String email){
        Optional<Person> temp = selectPersonByEmail(email);
        Person temp2 = temp.get();
        return temp2.getCurrentCourses();
    }

    @Override
    public ArrayList<String> neededCourses(int id){
        Optional<Person> temp = selectPersonById(id);
        Person person = temp.get();

        List<Course> courses = selectAllCourses();

        ArrayList<String> tempList = new ArrayList<>();

        courses.removeIf(c -> person.getCompletedCourses().contains(c.getKeyNumber()));
        courses.removeIf(c -> person.getCurrentCourses().contains(c.getKeyNumber()));


        for(Course c : courses){
            tempList.add(c.getKeyNumber());
        }

        return tempList;


    }

    @Override
    public Integer schoolPlan(int id){
        Optional<Person> temp = selectPersonById(id);
        Person person = temp.get();

        return person.getSchoolPlan();
    }

    public int passwordChange(int id, String newPass){
        Optional<Person> temp = selectPersonById(id);
        Person person = temp.get();

        String salt = person.returnSalt();
        String sql = "UPDATE person "+
                     "SET password = '" + person.encrypt(newPass,person.returnSalt()) +
                     "' WHERE id = " + id;

        jdbcTemplate.update(sql);


        return 0;
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
            String keyNumber = resultSet.getString("keyNumber");
            int number = resultSet.getInt("number");
            String name = resultSet.getString("name");
            String description = resultSet.getString("description");
            ArrayList<String> test = createArrayList(resultSet.getArray("prerequisites"));
            int credits = resultSet.getInt("credits");
            return new Course(
                    keyNumber,
                    number,
                    name,
                    description,
                    test,
                    credits);
        });
    }

    @Override
    public Optional<Course> selectCourseById(String keyNumber){
        final String sql = "SELECT * FROM courses WHERE keyNumber = ?";
        Course course = jdbcTemplate.queryForObject(
                sql,
                new Object[]{keyNumber},
                (resultSet , i) -> {
                    String keyNumber2 = resultSet.getString("keyNumber");
                    int courseID = resultSet.getInt("number");
                    String name = resultSet.getString("name");
                    String description = resultSet.getString("description");
                    ArrayList<String> prerequisites = createArrayList(resultSet.getArray("prerequisites"));
                    int credits = resultSet.getInt("credits");
                    return new Course(
                            keyNumber2,
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

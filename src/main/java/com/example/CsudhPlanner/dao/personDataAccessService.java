package com.example.CsudhPlanner.dao;

import com.example.CsudhPlanner.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("postgres")
public class personDataAccessService implements personDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public personDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /*
    @Override
    public int insertPerson(int id, Person person) {
        return 0;
    }
*/

    @Override
    public int insertPerson(Person person) {
        String sql = "Insert INTO person (id, name, email) VALUES (" + person.getId() +",'" + person.getName() +"','" + person.getEmail() + "')";
        return jdbcTemplate.update(sql);
    }

    //Method to format people from the postgres database to the person class (UUID , name) and return them as a list
    @Override
    public List<Person> selectAllPeople() {
        final String sql = "SELECT id, name FROM person";
        return jdbcTemplate.query(sql,(resultSet , i) -> {
            int id = resultSet.getInt("id");
            String name = resultSet.getString("name");
            return new Person(
                    id,
                    name);
        });
    }

    @Override
    public Optional<Person> selectPersonById(int id) {
        final String sql = "SELECT id, name FROM person WHERE id = ?";
        Person person = jdbcTemplate.queryForObject(
                sql,
                new Object[]{id},
                (resultSet , i) -> {
                    int personId = resultSet.getInt("id");
                    String name = resultSet.getString("name");
                    return new Person(personId, name);
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
        return 0;
    }
}

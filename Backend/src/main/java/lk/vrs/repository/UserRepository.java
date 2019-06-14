package lk.vrs.repository;

import lk.vrs.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT u FROM User u WHERE userName=?1 AND password=?2 AND role=?3")
    User getUser(String username, String password, String role);

}

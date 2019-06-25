package lk.vrs.repository;

import lk.vrs.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "FROM User WHERE userName=?1 AND userPassword=?2 AND userRole=?3")
    User getUser(String username, String userPassword, String userRole);

}

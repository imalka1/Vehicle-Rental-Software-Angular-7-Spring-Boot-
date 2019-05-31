package lk.vrs.repository;

import lk.vrs.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    @Query(value = "SELECT userId FROM User WHERE userName=?1 AND password=?2 AND role=?3")
    Object getUserId(String username, String password, String role);

}

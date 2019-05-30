package lk.vrs.service.impl;

import lk.vrs.entity.User;
import lk.vrs.repository.UserRepository;
import lk.vrs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean chkLogin(User user) {
        Object userId = userRepository.getUserId(user.getUserName(), user.getPassword(), user.getRole());
        if (userId != null) {
            return true;
        }
        return false;
    }
}

package lk.vrs.service.impl;

import lk.vrs.entity.User;
import lk.vrs.repository.UserRepository;
import lk.vrs.service.UserService;
import lk.vrs.session.SessionStack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User chkLogin(User user) {
        User loggedUser = userRepository.getUser(user.getUserName(), user.getPassword(), user.getRole());
        if (loggedUser != null) {
            User userObj = userRepository.findById(loggedUser.getUserId()).get();
            SessionStack.setUser(userObj);
            return userObj;
        }
        return null;
    }
}

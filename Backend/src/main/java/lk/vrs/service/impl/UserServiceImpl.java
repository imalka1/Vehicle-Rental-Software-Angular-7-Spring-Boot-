package lk.vrs.service.impl;

import lk.vrs.entity.User;
import lk.vrs.repository.UserRepository;
import lk.vrs.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User chkLogin(User user) {
        Object userId = userRepository.getUserId(user.getUserName(), user.getPassword(), user.getRole());
        if (userId != null) {
            User userObj = userRepository.findById(Long.parseLong(userId.toString())).get();
            userObj.setSecurityKey(generateRandomNumber());
            return userRepository.save(userObj);
        }
        return null;
    }

    @Override
    public boolean chkUserViaSecurityKey(User user) {
        Object userId = userRepository.getUserViaSecurityKey(user.getUserId(), user.getSecurityKey());
        if (userId != null) {
            return true;
        }
        return false;
    }

    private int generateRandomNumber() {
        Random random = new Random();
        return random.nextInt(10000000);
    }
}

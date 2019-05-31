package lk.vrs.session;

import lk.vrs.entity.User;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class SessionStack {
    private static Set<Integer> users = new HashSet<>();

    public static boolean userExists(int userObjCode) {
        return users.contains(userObjCode);
    }

    public static void setUser(User user) {
        SessionStack.users.add(user.hashCode());
    }

    public static void removeUser(int userObjCode) {
        if (userExists(userObjCode)) {
            users.remove(userObjCode);
        }
    }
}

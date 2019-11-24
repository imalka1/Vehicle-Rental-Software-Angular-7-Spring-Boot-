package com.vrs.controller.user;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/get_online_count")
public class UserWebSocketController {
    private static Set<Session> userSessions = Collections.newSetFromMap(new ConcurrentHashMap<Session, Boolean>());

    @OnOpen
    public void onOpen(Session userSession) {
        userSessions.add(userSession);
        broadcast(userSessions.size(), userSession);
    }

    @OnClose
    public void onClose(Session userSession) {
        userSessions.remove(userSession);
        broadcast(userSessions.size(), userSession);
    }

    @OnMessage
    public void onMessage(String message, Session userSession) {
//        broadcast(userSessions.size(), userSession);
//        System.out.println(message);
    }

    private static void broadcast(int msg, Session userSession) {
        for (Session session : userSessions) {
//            if (session != userSession) {
            session.getAsyncRemote().sendText(String.valueOf(msg));
//            }
        }
    }
}

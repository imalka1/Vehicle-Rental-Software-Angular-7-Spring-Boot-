package com.vrs.controller.reservation;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/get_reservation_socket")
public class ReservationWebSocketController {

    private static Set<Session> userSessions = Collections.newSetFromMap(new ConcurrentHashMap<Session, Boolean>());

    @OnOpen
    public void onOpen(Session userSession) {
        userSessions.add(userSession);
        System.out.println(userSessions.size());
    }

    @OnClose
    public void onClose(Session userSession) {
        userSessions.remove(userSession);
        System.out.println(2);
    }

    @OnMessage
    public void onMessage(String message, Session userSession) {
//        broadcast(message, userSession);
//        System.out.println(message);
    }

    private static void broadcast(String msg, Session userSession) {
        for (Session session : userSessions) {
            if (session != userSession) {
                session.getAsyncRemote().sendText(msg);
            }
        }
    }

    public static Set<Session> getUserSessions() {
        return userSessions;
    }

}

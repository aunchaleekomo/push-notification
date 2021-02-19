package com.example.notification.controller;

import com.example.notification.model.NotificationModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotiRestController {

    @Autowired
    private SimpMessagingTemplate template;

    @PostMapping("/api/message")
    public ResponseEntity<Object> sendMsg(@RequestBody NotificationModel notification ) {
        this.template.convertAndSend("/message",notification);
        return new ResponseEntity<>(notification, HttpStatus.OK);
    }
}

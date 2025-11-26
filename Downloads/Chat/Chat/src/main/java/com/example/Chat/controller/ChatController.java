package com.example.Chat.controller;

import com.example.Chat.model.ChatMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {
    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public ChatMessage sendmessage(ChatMessage message){
    return message;
    }

    @GetMapping("chat")
    public  String chat(){
        return "chat";
    }

}

package com.example.Chat.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
//@NoArgsConstructor
public class ChatMessage {
    private long id;
    private String sender;
    private String content;

    public void setId(long id) {
        this.id = id;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public long getId() {
        return id;
    }

    public String getSender() {
        return sender;
    }

    public String getContent() {
        return content;
    }

    public ChatMessage(long id, String sender, String content) {
        this.id = id;
        this.sender = sender;
        this.content = content;
    }

    public ChatMessage() {
    }
}

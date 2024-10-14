package com.demo.FocusBurst.model;


import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "accounts")
public class Account {

    @Id
    private ObjectId id;
    private String username;
    private String email;
    private String password;
}

package com.example.todoapplication.exception;

public class IdNotFoundException extends RuntimeException {

    public IdNotFoundException(Long id){
        super("Could not found the todo with Id  "+ id );
    }

}
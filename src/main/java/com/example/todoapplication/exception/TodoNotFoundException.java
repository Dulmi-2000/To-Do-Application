package com.example.todoapplication.exception;
public class TodoNotFoundException extends RuntimeException {
    public TodoNotFoundException(Long id) {

        super("Could not found the Todo with the given title ");
    }
}
package com.example.todoapplication.controller;


import com.example.todoapplication.exception.IdNotFoundException;
import com.example.todoapplication.exception.TodoNotFoundException;
import com.example.todoapplication.model.todo;
import com.example.todoapplication.repository.todoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@CrossOrigin
@RestController
public class todoController {
    @Autowired
    private todoItemRepository todoItemRepository ;

    @PostMapping("/addTodo")
    public todo newTodo(@RequestBody todo newtodoItem) {
        return todoItemRepository.save(newtodoItem);
    }

    @GetMapping("/getAllTodos")
    public List<todo> getAllTodos() {
        return todoItemRepository.findAll();
    }
    @GetMapping("/getbyid/{id}")
    public ResponseEntity<todo> getUserById(@PathVariable Long id) {
        Optional<todo> todoOptional = todoItemRepository.findById(id);
        return todoOptional.map(ResponseEntity::ok)
                .orElseThrow(() -> new IdNotFoundException(id));
    }




    @PutMapping("/updateTodo/{id}")
    public todo updateTodo(@PathVariable Long id, @RequestBody todo updatedTodo) {
        Optional<todo> optionalTodoItem = todoItemRepository.findById(id);
        if (optionalTodoItem.isPresent()) {
            todo existingTodoItem = optionalTodoItem.get();
            existingTodoItem.setTitle(updatedTodo.getTitle());
            existingTodoItem.setDescription(updatedTodo.getDescription());
            existingTodoItem.setCompleted(updatedTodo.isCompleted());

            return todoItemRepository.save(existingTodoItem);
        } else {
            throw new RuntimeException("TodoItem not found with id " + id);
        }

    }
    //delete user
    @DeleteMapping("/deleteTodo/{id}")
    String deleteUser(@PathVariable Long id){
        if(!todoItemRepository.existsById(id)){
            throw new TodoNotFoundException(id);
        }
        todoItemRepository.deleteById(id);
        return "User with id "+id+" has been deleted successfully.";
    }
}

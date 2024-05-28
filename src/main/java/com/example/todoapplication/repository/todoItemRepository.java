package com.example.todoapplication.repository;

import com.example.todoapplication.model.todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface todoItemRepository extends JpaRepository<todo, Long> {

}

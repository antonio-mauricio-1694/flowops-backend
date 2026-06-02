package com.flowops.backend.repository;

import com.flowops.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Por enquanto, teremos acesso a todos os métodos CRUD padrão automaticamente
}
package com.tictactoe.backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tictactoe.backend.entity.Game;

@Repository
public interface GameRepository extends CrudRepository<Game, Long> {
	
}

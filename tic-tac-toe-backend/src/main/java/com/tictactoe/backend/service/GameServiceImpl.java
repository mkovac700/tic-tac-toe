package com.tictactoe.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tictactoe.backend.entity.Game;
import com.tictactoe.backend.repository.GameRepository;

@Service
public class GameServiceImpl implements GameService{

	@Autowired
	private GameRepository gameRepository;
	
	@Override
	public Game saveGame(Game game) {
		return gameRepository.save(game);
	}

	@Override
	public List<Game> fetchAllGames() {
		return (List<Game>) gameRepository.findAll();
	}
	
}

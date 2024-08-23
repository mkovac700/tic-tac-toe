package com.tictactoe.backend.service;

import java.util.List;

import com.tictactoe.backend.entity.Game;

public interface GameService {
	Game saveGame(Game game);
	List<Game> fetchAllGames();
}

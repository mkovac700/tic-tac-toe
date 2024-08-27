package com.tictactoe.backend.service;

import java.util.List;

import com.tictactoe.backend.entity.Game;
import com.tictactoe.backend.entity.GameResponse;

public interface GameService {
	Game saveGame(Game game);
	GameResponse fetchAllGames();
}

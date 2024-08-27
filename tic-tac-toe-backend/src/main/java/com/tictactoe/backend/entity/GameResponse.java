package com.tictactoe.backend.entity;

import java.util.List;

public class GameResponse {
	private List<Game> games;
	
	private int count;
	
	public GameResponse(List<Game> games, int count) {
		this.games = games;
		this.count = count;
	}

	public List<Game> getGames() {
		return games;
	}

	public void setGames(List<Game> games) {
		this.games = games;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
	
	
}

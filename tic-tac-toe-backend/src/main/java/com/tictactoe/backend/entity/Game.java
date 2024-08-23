package com.tictactoe.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Game {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	private LocalDateTime timestamp;
	private String winner;
	
	protected Game() {}
	
	public Game(LocalDateTime timestamp, String winner) {
		this.timestamp = timestamp;
		this.winner = winner;
	}

	public Long getId() {
		return id;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public String getWinner() {
		return winner;
	}
	
	
}

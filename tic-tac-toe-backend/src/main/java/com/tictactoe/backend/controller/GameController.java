package com.tictactoe.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/game")
public class GameController {
	@PostMapping("/calculateWinner")
	public String [] calculateWinner(@RequestBody List<String> squares) {
		System.out.println("received array: " + squares);
		
		int[][] lines = {
				{0, 1, 2}, 
				{3, 4, 5}, 
				{6, 7, 8}, 
				{0, 3, 6}, 
				{1, 4, 7}, 
				{2, 5, 8}, 
				{0, 4, 8}, 
				{6, 4, 2}
		};
		
		for(int i = 0; i < lines.length; i++) {
			int [] currentLine = lines[i];
			int a = currentLine[0];
			int b = currentLine[1];
			int c = currentLine[2];
			
			if(squares.get(a) != null && squares.get(a).equals(squares.get(b)) && squares.get(a).equals(squares.get(c))) {
				System.out.println("result: " + squares.get(a));
				return new String [] {squares.get(a)};	
			}
		}
		
		System.out.println("result: " + null);
		return new String[] {null};
	}
}

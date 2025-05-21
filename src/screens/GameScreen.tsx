import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameBoard from '../components/GameBoard';
import ControlPad from '../components/ControlPad';
import { 
  Direction, 
  Position, 
  getNextHeadPosition, 
  isValidDirectionChange, 
  hasCollidedWithWalls,
  hasCollidedWithSelf,
  generateRandomPosition
} from '../utils/gameUtils';

// Game constants
const GRID_SIZE = 15;
const CELL_SIZE = Math.floor(Dimensions.get('window').width * 0.9 / GRID_SIZE);
const GAME_SPEED = 150; // milliseconds between moves

const GameScreen = () => {
  // Game state
  const [snake, setSnake] = useState<Position[]>([
    { x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }
  ]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Refs to prevent stale state in the game loop
  const snakeRef = useRef(snake);
  snakeRef.current = snake;
  
  const directionRef = useRef(direction);
  directionRef.current = direction;
  
  const isGameOverRef = useRef(isGameOver);
  isGameOverRef.current = isGameOver;
  
  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;
  
  // Game loop
  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (isPausedRef.current || isGameOverRef.current) return;
      moveSnake();
    }, GAME_SPEED);
    
    return () => clearInterval(gameLoop);
  }, []);
  
  // Snake movement logic
  const moveSnake = () => {
    const head = snakeRef.current[0];
    const newHead = getNextHeadPosition(head, directionRef.current);
    
    // Check for collisions (walls or self)
    if (
      hasCollidedWithWalls(newHead, GRID_SIZE) || 
      hasCollidedWithSelf(newHead, snakeRef.current.slice(0, -1))
    ) {
      setIsGameOver(true);
      return;
    }
    
    // Create new snake array with new head
    const newSnake = [newHead, ...snakeRef.current];
    
    // Check if snake ate food
    if (newHead.x === food.x && newHead.y === food.y) {
      setScore(prevScore => prevScore + 1);
      setFood(generateRandomPosition(GRID_SIZE, newSnake));
    } else {
      // Remove tail if no food was eaten
      newSnake.pop();
    }
    
    setSnake(newSnake);
  };
  
  // Change direction handler
  const handleDirectionChange = (newDirection: Direction) => {
    // Only change direction if it's valid
    if (isValidDirectionChange(directionRef.current, newDirection)) {
      setDirection(newDirection);
    }
  };
  
  // Reset game
  const resetGame = () => {
    setSnake([{ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }]);
    setFood(generateRandomPosition(GRID_SIZE, [{ x: Math.floor(GRID_SIZE / 2), y: Math.floor(GRID_SIZE / 2) }]));
    setDirection('RIGHT');
    setIsGameOver(false);
    setScore(0);
    setIsPaused(false);
  };
  
  // Toggle pause
  const togglePause = () => {
    setIsPaused(!isPaused);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
      
      <GameBoard 
        snake={snake}
        food={food}
        gridSize={GRID_SIZE}
        cellSize={CELL_SIZE}
      />
      
      <ControlPad onDirectionChange={handleDirectionChange} />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={togglePause}
          disabled={isGameOver}
        >
          <Text style={styles.buttonText}>{isPaused ? 'Resume' : 'Pause'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.resetButton]} 
          onPress={resetGame}
        >
          <Text style={styles.buttonText}>{isGameOver ? 'Play Again' : 'Reset'}</Text>
        </TouchableOpacity>
      </View>
      
      {isGameOver && (
        <View style={styles.gameOverOverlay}>
          <Text style={styles.gameOverText}>Game Over!</Text>
          <Text style={styles.finalScoreText}>Final Score: {score}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  scoreContainer: {
    marginVertical: 10,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  resetButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameOverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  finalScoreText: {
    fontSize: 28,
    color: 'white',
  },
});

export default GameScreen; 
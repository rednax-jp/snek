import React from 'react';
import { View, StyleSheet } from 'react-native';

type Position = { x: number; y: number };

interface GameBoardProps {
  snake: Position[];
  food: Position;
  gridSize: number;
  cellSize: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food, gridSize, cellSize }) => {
  // Create grid cells
  const renderGrid = () => {
    const grid = [];
    
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        // Check if current cell contains snake
        const isSnake = snake.some(segment => segment.x === col && segment.y === row);
        
        // Check if current cell contains food
        const isFood = food.x === col && food.y === row;
        
        // Check if it's the snake's head
        const isHead = snake[0].x === col && snake[0].y === row;
        
        // Determine cell style
        let cellStyle = styles.cell;
        if (isSnake) {
          cellStyle = isHead ? styles.snakeHead : styles.snakeBody;
        } else if (isFood) {
          cellStyle = styles.food;
        }
        
        grid.push(
          <View 
            key={`${row}-${col}`}
            style={[
              cellStyle, 
              { 
                width: cellSize, 
                height: cellSize,
                left: col * cellSize,
                top: row * cellSize
              }
            ]}
          />
        );
      }
    }
    
    return grid;
  };
  
  return (
    <View 
      style={[
        styles.gameBoard, 
        { 
          width: gridSize * cellSize, 
          height: gridSize * cellSize 
        }
      ]}
    >
      {renderGrid()}
    </View>
  );
};

const styles = StyleSheet.create({
  gameBoard: {
    borderWidth: 2,
    borderColor: '#000',
    position: 'relative',
    backgroundColor: '#ddd',
  },
  cell: {
    position: 'absolute',
    borderWidth: 0.5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  snakeBody: {
    position: 'absolute',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  snakeHead: {
    position: 'absolute',
    backgroundColor: '#388E3C',
    borderRadius: 4,
  },
  food: {
    position: 'absolute',
    backgroundColor: '#F44336',
    borderRadius: 10,
  },
});

export default GameBoard; 
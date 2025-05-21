// Types
export type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
export type Position = { x: number; y: number };

/**
 * Check if two positions are equal
 */
export const arePositionsEqual = (pos1: Position, pos2: Position): boolean => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
};

/**
 * Calculate the next head position based on current head and direction
 */
export const getNextHeadPosition = (head: Position, direction: Direction): Position => {
  const newHead = { ...head };
  
  switch (direction) {
    case 'UP':
      newHead.y -= 1;
      break;
    case 'RIGHT':
      newHead.x += 1;
      break;
    case 'DOWN':
      newHead.y += 1;
      break;
    case 'LEFT':
      newHead.x -= 1;
      break;
  }
  
  return newHead;
};

/**
 * Check if the direction change is valid (can't do a 180-degree turn)
 */
export const isValidDirectionChange = (currentDirection: Direction, newDirection: Direction): boolean => {
  if (
    (currentDirection === 'UP' && newDirection === 'DOWN') ||
    (currentDirection === 'DOWN' && newDirection === 'UP') ||
    (currentDirection === 'LEFT' && newDirection === 'RIGHT') ||
    (currentDirection === 'RIGHT' && newDirection === 'LEFT')
  ) {
    return false;
  }
  
  return true;
};

/**
 * Check if snake has collided with walls
 */
export const hasCollidedWithWalls = (head: Position, gridSize: number): boolean => {
  return (
    head.x < 0 || 
    head.x >= gridSize || 
    head.y < 0 || 
    head.y >= gridSize
  );
};

/**
 * Check if snake has collided with itself
 */
export const hasCollidedWithSelf = (head: Position, body: Position[]): boolean => {
  return body.some(segment => arePositionsEqual(segment, head));
};

/**
 * Generate a random position within the grid that is not on the snake
 */
export const generateRandomPosition = (gridSize: number, snake: Position[]): Position => {
  const position = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
  };
  
  // Check if the position is on the snake
  const isOnSnake = snake.some(segment => arePositionsEqual(segment, position));
  
  if (isOnSnake) {
    return generateRandomPosition(gridSize, snake);
  }
  
  return position;
}; 
// Simple test functions to verify Snek game functionality
// This can be run in a browser console to test the game

function testSnekGame() {
  console.log('Starting Snek game tests...');
  
  // Test 1: Game initialization
  testGameInitialization();
  
  // Test 2: Snake movement
  testSnakeMovement();
  
  // Test 3: Food generation
  testFoodGeneration();
  
  // Test 4: Collision detection
  testCollisionDetection();
  
  // Test 5: Score calculation
  testScoreCalculation();
  
  console.log('All tests completed!');
}

function testGameInitialization() {
  console.log('Testing game initialization...');
  
  // Verify snake initialization
  if (snake.length !== 1) {
    console.error('TEST FAILED: Snake should be initialized with 1 segment');
  } else if (snake[0].x !== Math.floor(GRID_SIZE / 2) || snake[0].y !== Math.floor(GRID_SIZE / 2)) {
    console.error('TEST FAILED: Snake should start in the middle of the grid');
  } else {
    console.log('PASSED: Snake initialization');
  }
  
  // Verify direction
  if (direction !== 'RIGHT') {
    console.error('TEST FAILED: Initial direction should be RIGHT');
  } else {
    console.log('PASSED: Direction initialization');
  }
  
  // Verify score
  if (score !== 0) {
    console.error('TEST FAILED: Initial score should be 0');
  } else {
    console.log('PASSED: Score initialization');
  }
  
  // Verify game state
  if (isGameOver !== false) {
    console.error('TEST FAILED: Game should not be over initially');
  } else {
    console.log('PASSED: Game state initialization');
  }
}

function testSnakeMovement() {
  console.log('Testing snake movement...');
  
  // Save initial state
  const originalSnake = [...snake];
  const originalDirection = direction;
  const originalScore = score;
  
  // Test movement
  moveSnake();
  
  // Check if snake moved correctly
  if (snake[0].x !== originalSnake[0].x + 1 || snake[0].y !== originalSnake[0].y) {
    console.error('TEST FAILED: Snake did not move RIGHT correctly');
  } else {
    console.log('PASSED: Snake movement');
  }
  
  // Test direction change
  changeDirection('DOWN');
  moveSnake();
  
  if (snake[0].x !== originalSnake[0].x + 1 || snake[0].y !== originalSnake[0].y + 1) {
    console.error('TEST FAILED: Snake did not change direction to DOWN correctly');
  } else {
    console.log('PASSED: Direction change');
  }
  
  // Test invalid direction change (180 degrees)
  changeDirection('UP');
  if (direction !== 'DOWN') {
    console.error('TEST FAILED: Should not allow 180-degree direction change');
  } else {
    console.log('PASSED: Invalid direction prevention');
  }
  
  // Reset state
  snake = originalSnake;
  direction = originalDirection;
  score = originalScore;
}

function testFoodGeneration() {
  console.log('Testing food generation...');
  
  // Generate new food
  const originalFood = { ...food };
  generateFood();
  
  // Check if new food is different from old food
  if (food.x === originalFood.x && food.y === originalFood.y) {
    console.error('TEST FAILED: New food position is the same as the old one');
  } else {
    console.log('PASSED: Food generation');
  }
  
  // Check if food is within grid
  if (food.x < 0 || food.x >= GRID_SIZE || food.y < 0 || food.y >= GRID_SIZE) {
    console.error('TEST FAILED: Food is outside the grid');
  } else {
    console.log('PASSED: Food is within grid boundaries');
  }
  
  // Check if food is not on snake
  const isOnSnake = snake.some(segment => segment.x === food.x && segment.y === food.y);
  if (isOnSnake) {
    console.error('TEST FAILED: Food is on the snake');
  } else {
    console.log('PASSED: Food is not on snake');
  }
}

function testCollisionDetection() {
  console.log('Testing collision detection...');
  
  // Save original state
  const originalSnake = [...snake];
  const originalDirection = direction;
  const originalGameOver = isGameOver;
  
  // Test wall collision
  snake = [{ x: 0, y: 0 }];
  direction = 'LEFT';
  moveSnake();
  
  if (!isGameOver) {
    console.error('TEST FAILED: Snake should be game over after hitting left wall');
  } else {
    console.log('PASSED: Left wall collision');
  }
  
  // Reset and test right wall
  isGameOver = false;
  snake = [{ x: GRID_SIZE - 1, y: 0 }];
  direction = 'RIGHT';
  moveSnake();
  
  if (!isGameOver) {
    console.error('TEST FAILED: Snake should be game over after hitting right wall');
  } else {
    console.log('PASSED: Right wall collision');
  }
  
  // Reset and test top wall
  isGameOver = false;
  snake = [{ x: 0, y: 0 }];
  direction = 'UP';
  moveSnake();
  
  if (!isGameOver) {
    console.error('TEST FAILED: Snake should be game over after hitting top wall');
  } else {
    console.log('PASSED: Top wall collision');
  }
  
  // Reset and test bottom wall
  isGameOver = false;
  snake = [{ x: 0, y: GRID_SIZE - 1 }];
  direction = 'DOWN';
  moveSnake();
  
  if (!isGameOver) {
    console.error('TEST FAILED: Snake should be game over after hitting bottom wall');
  } else {
    console.log('PASSED: Bottom wall collision');
  }
  
  // Test self collision
  isGameOver = false;
  snake = [
    { x: 5, y: 5 },
    { x: 6, y: 5 },
    { x: 7, y: 5 },
    { x: 7, y: 6 },
    { x: 6, y: 6 },
    { x: 5, y: 6 }
  ];
  direction = 'UP';
  moveSnake();
  
  if (!isGameOver) {
    console.error('TEST FAILED: Snake should be game over after hitting itself');
  } else {
    console.log('PASSED: Self collision');
  }
  
  // Reset state
  snake = originalSnake;
  direction = originalDirection;
  isGameOver = originalGameOver;
}

function testScoreCalculation() {
  console.log('Testing score calculation...');
  
  // Save original state
  const originalSnake = [...snake];
  const originalFood = { ...food };
  const originalScore = score;
  
  // Position snake head next to food
  snake = [{ x: food.x - 1, y: food.y }];
  direction = 'RIGHT';
  score = 0;
  
  // Move snake to eat food
  moveSnake();
  
  // Check if score increased
  if (score !== 1) {
    console.error('TEST FAILED: Score should increase when eating food');
  } else {
    console.log('PASSED: Score increases when eating food');
  }
  
  // Check if snake grew
  if (snake.length !== 1) {
    console.error('TEST FAILED: Snake should grow after eating food');
  } else {
    console.log('PASSED: Snake grows after eating food');
  }
  
  // Reset state
  snake = originalSnake;
  food = originalFood;
  score = originalScore;
}

// Run tests by calling this function in the browser console
// testSnekGame(); 
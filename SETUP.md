# Snek Game - Setup Instructions

## Project Overview

Snek is a modern reimagining of the classic Snake game for iOS and Android devices. The game features:

- Classic snake gameplay with touch controls
- Score tracking and game over screens
- Pause/resume functionality
- Modern UI with smooth animations

## Prerequisites

Before you can run this project, you'll need to install:

1. **Node.js and npm** - Download and install from [nodejs.org](https://nodejs.org/)
2. **Expo CLI** - Once Node.js is installed, run:
   ```
   npm install -g expo-cli
   ```
3. For testing on real devices:
   - **Expo Go** app installed on your iOS or Android device

## Project Setup

1. Clone the repository:
   ```
   git clone https://github.com/rednax-jp/snek.git
   cd snek
   ```

2. Install project dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

   This will display a QR code in your terminal.

4. Running on a device:
   - **iOS**: Scan the QR code with your iPhone camera
   - **Android**: Scan the QR code with the Expo Go app
   
   Alternatively, press 'a' in the terminal to run on an Android emulator or 'i' to run on an iOS simulator if you have them set up.

## Project Structure

- `src/components/` - Reusable UI components (GameBoard, ControlPad)
- `src/screens/` - Main game screen
- `src/utils/` - Helper functions and game logic
- `src/assets/` - Game images and resources

## Development Notes

- The game grid is set to 15x15 by default. You can adjust this in `src/screens/GameScreen.tsx`
- Game speed is set to 150ms between moves. Adjust this for difficulty in the same file
- Color schemes and styling can be modified in the StyleSheet objects in each component

## Missing Assets

Before publishing, you'll need to add the following image assets:

1. `icon.png` - App icon (1024x1024 recommended)
2. `adaptive-icon.png` - Android adaptive icon foreground
3. `splash.png` - Splash screen image
4. `favicon.png` - Web favicon

Place these in the `src/assets/` directory.

## Troubleshooting

- If you encounter errors with the Metro bundler, try clearing the cache with:
  ```
  npx expo start --clear
  ```
- If you have issues with dependencies, try removing the node_modules folder and running npm install again:
  ```
  rm -rf node_modules
  npm install
  ```

## Next Steps for Enhancement

1. Add game difficulty levels (adjusting speed)
2. Add sound effects
3. Implement local high score storage
4. Add different themes/skins for the snake
5. Implement obstacle levels for added challenge 
# Snek - Modern Snake Game for Mobile

A modern implementation of the classic Snake game for iOS and Android, built with React Native and Expo.

## Features

- Classic Snake gameplay with modern UI
- Touch controls optimized for mobile
- Score tracking
- Game over and pause functionality
- Responsive design works on various screen sizes

## HTML Test Version

This repository includes a simple HTML version of the game for testing purposes. This version uses pure HTML, CSS, and JavaScript, and can be run directly in a browser without any dependencies.

### Running the HTML Version

1. Clone the repository:
   ```
   git clone https://github.com/rednax-jp/snek.git
   cd snek
   ```

2. If you have Node.js installed, you can run the simple HTTP server:
   ```
   node server.js
   ```
   Then open your browser to http://localhost:3000

3. Alternatively, you can simply open the `index.html` file directly in your browser.

### PWA Support

The HTML version is also set up as a Progressive Web App (PWA), which means it can be installed on your mobile device or desktop for offline use.

To install on mobile:
1. Open the game in your browser
2. Tap the browser menu
3. Select "Add to Home Screen" or "Install App"

## React Native Version

The React Native version of the game requires more setup but provides a better native experience.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://expo.dev/tools)
- For iOS testing: macOS with Xcode
- For Android testing: Android Studio with an emulator

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/rednax-jp/snek.git
   cd snek
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```
   npm start
   # or
   yarn start
   ```

4. Follow the instructions in the terminal to:
   - Run on iOS simulator (requires macOS)
   - Run on Android emulator
   - Scan the QR code with the Expo Go app on your device

## How to Play

- Use the directional buttons to control the snake
- Eat the red food to grow and increase your score
- Avoid hitting the walls or your own tail
- Use the pause button to take a break
- After game over, press "Play Again" to restart

## Project Structure

```
snek/
├── src/
│   ├── components/     # Reusable components (React Native)
│   ├── screens/        # Game screens (React Native)
│   ├── utils/          # Helper functions
│   └── assets/         # Images, fonts, etc.
├── App.tsx             # Main React Native app component
├── index.html          # HTML test version
├── service-worker.js   # For PWA offline support
├── manifest.json       # For PWA installation
├── server.js           # Simple HTTP server for testing
├── package.json        # Dependencies
└── README.md           # This file
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

Created by Rednax-JP.  Hell Snake
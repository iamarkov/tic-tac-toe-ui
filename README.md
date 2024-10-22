
# Tic-Tac-Toe UI

## Overview

This is a simple React application built with **Vite** that consumes the Tic-Tac-Toe server's state heartbeat. The UI updates in real-time as players make moves in the game.

## Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/iamarkov/tic-tac-toe-ui.git
   ```

2. Navigate to the project directory:
   ```bash
   cd tic-tac-toe-ui
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Make sure the Tic-Tac-Toe game server WebSocket is exposed at:
   ```bash
   ws://localhost:8080/tic-tac-toe
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

The application will be running and displaying the game state in real-time.

## License

This project is licensed under the IM Solutions License.
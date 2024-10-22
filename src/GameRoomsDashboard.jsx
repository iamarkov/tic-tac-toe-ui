import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const GameRoomsDashboard = () => {
  const [serverState, setServerState] = useState({
    rooms: []
  });
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/tic-tac-toe',
      onConnect: () => {
        setConnectionStatus('Connected');
        client.subscribe('/topic/state', (message) => {
          console.log(message.body);
          const state = JSON.parse(message.body);
          console.log(state);
          setServerState(state);
        });
        client.publish({
            destination: '/app/state',
            body: JSON.stringify({}),
        });
      },
      onDisconnect: () => {
        console.log('Disconnected')
        setConnectionStatus('Disconnected');
      },
      onError: (error) => {
        console.error('STOMP error:', error);
        setConnectionStatus('Error');
      },
      onWebSocketClose: (error) => {
        setConnectionStatus('Disconnected');
      }
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  const renderGameField = (gameField) => {
    return (
      <div className="game-board">
        {gameField.map((cell, index) => (
          // <div key={index} className="cell">
          <div 
            key={index} 
            className={`cell ${cell?.toLowerCase() === 'x' ? 'x' : ''} ${cell?.toLowerCase() === 'o' ? 'o' : ''}`}
          >
            {cell || '-'}
          </div>
        ))}
      </div>
    );
  };

  const renderPlayers = (players) => {
    return (
      <div className="players">
        {players.map((player, index) => (
          <div key={index} className="player">
            <span className={`status ${player.online ? 'online' : 'offline'}`}>
              {player.online ? "● Online" : "○ Offline"}
            </span>
            {player.online}
            <span>{player.username} ({player.symbol})</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Game Rooms</h1>
        <span className={`connection-status ${connectionStatus.toLowerCase()}`}>
          {connectionStatus}
        </span>
      </div>

      <div className="rooms">
        {serverState.rooms.map((room) => (
          <div key={room.id} className="room">
            <h2>Room {room.id}</h2>
            <div className="game-container">
              <div>
                <h3>Game Board</h3>
                {renderGameField(room.gameField)}
              </div>

              <div>
                <h3>State: {room.state}</h3>
              </div>

              <div>
                <h3>Winner: {room.winner}</h3>
              </div>

              <div>
                <h3>Players</h3>
                {renderPlayers(room.players)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameRoomsDashboard;
export interface User {
    date: string;
    ticket: string;
    type: string;
    status: string;
    risk: string;
  }
  

  export interface ServerToClientEvents {
    startGame: (users: User[]) => void;
    // endGame: (random: number) => void;
    // notifyJoinedPlayers: (players: Player[]) => void;
    // // checkAccount: (user: User) => void
  
    // notifyPlayerWithdrawn: (players: Player[]) => void;
    // currentPositionUpdated: (currentPosition: number) => void;
  }
  
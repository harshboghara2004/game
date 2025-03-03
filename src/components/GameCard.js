// import React from 'react';
// import { Link } from 'react-router-dom';
// import './GameCard.css';

// const GameCard = ({ game, onPlay }) => {
//   const { gameImage, description, gameCategory, slug } = game;

//   return (
//     <div className="game-card" onClick={() => onPlay(game)}>
//       <img src={gameImage} alt={gameCategory} className="game-image" />
//       <div className="game-details">
//         <h3>{gameCategory}</h3>
//         <p>{description}</p>
//         {/* SEO-friendly URL using slug */}
//         <Link to={`/game/${slug}`} className="play-btn">
//           Play Now
//         </Link>
//       </div>
//     </div>
//   );
// };




/*

// export default GameCard;
import React from "react";
import './GameCard.css';

const GameCard = ({ game, onGameSelect }) => {
  return (
    <div className="game-card" onClick={() => onGameSelect(game)}>
      <img src={game.gameImage} alt={game.gameTitle} className="game-image" />
      <h3 className="game-title">{game.gameTitle}</h3>
    </div>
  );
};

export default GameCard;
*/
/*
import React from "react";
import './GameCard.css';

const GameCard = ({ game, onGameSelect }) => {
  return (
    <div className="game-card" onClick={() => onGameSelect(game)}>
      <img src={game.gameImage} alt={game.gameTitle} className="game-image" />
      <h3 className="game-title">{game.gameTitle}</h3>
    </div>
  );
};

export default GameCard;*/

import React from "react";
import { useNavigate } from "react-router-dom";
import './GameCard.css';

const GameCard = ({ game }) => {
  const navigate = useNavigate();

  return (
    <div className="game-card" onClick={() => navigate(`/game/${game.slug}`)}>
      <img src={game.gameImage} alt={game.gameTitle} className="game-image" />
      <h3 className="game-title">{game.gameTitle}</h3>
    </div>
  );
};

export default GameCard;

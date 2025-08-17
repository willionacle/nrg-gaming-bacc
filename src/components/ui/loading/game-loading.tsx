import logo from '@/assets/images/logo.png';
import loading from '@/assets/images/loading.png';

const GameLoading = () => {
  return (
    <div className="game-loader">
      <div className="game-loader-content">
        <img className="loading-swirl" src={loading} />
        <img className="loading-logo" src={logo} />
      </div>
    </div>
  );
};

export default GameLoading;

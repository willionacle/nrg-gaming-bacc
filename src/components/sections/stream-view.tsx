'use client';

import { isLandscape } from '@/utils/globalFunctions';
import { useSearchParams } from 'react-router-dom';

const StreamView = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  if (isLandscape() || category === 'niu') return;

  return (
    <div className="stream-view">
      <iframe
        width="796"
        height="447"
        src="https://www.youtube.com/embed/qVVQ0ZSS7aM?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=qVVQ0ZSS7aM"
        title="£1200 Start Live Dealer Casino Baccarat Session"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default StreamView;

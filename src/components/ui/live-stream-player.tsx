import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Box, BoxProps, Center, Loader } from '@mantine/core';
import { IconVideoFilled } from '@tabler/icons-react';
import clsx from 'clsx';

interface Props extends BoxProps {
  src: string; // Can be .m3u8 or play.html?id=...
  width?: string;
  height?: string;
}

const HLSPlayer: React.FC<Props> = ({ src, width = '100%', height = '100%', ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(false);

  const isIframeSource = (url: string): boolean => {
    try {
      const parsed = new URL(url);
      return parsed.pathname.includes('play.html') && parsed.searchParams.get('id') !== null;
    } catch {
      return false;
    }
  };

  const getHlsUrl = (inputUrl: string): string | undefined => {
    try {
      const url = new URL(inputUrl);
      const id = url.searchParams.get('id');
      if (url.pathname.includes('play.html') && id) {
        const app = url.pathname.split('/')[1]; // e.g., WebRTCAppEE
        return `${url.origin}/${app}/streams/${id}.m3u8`;
      }
      return inputUrl;
    } catch {
      return undefined;
    }
  };

  useEffect(() => {
    if (isIframeSource(src)) return; // Skip HLS setup for iframe URLs

    const video = videoRef.current;
    const hlsUrl = getHlsUrl(src);

    if (!video || !hlsUrl) return;

    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);
    const handleCanPlay = () => setIsLoading(false);
    const handleStalled = () => setIsLoading(true);

    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('stalled', handleStalled);

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
        video.removeEventListener('waiting', handleWaiting);
        video.removeEventListener('playing', handlePlaying);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('stalled', handleStalled);
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl;
    }
  }, [src]);

  return (
    <Box pos="relative" onClick={() => setZoom(!zoom)} w={width} h={height} {...props}>
      {isIframeSource(src) ? (
        <iframe
          src={src}
          // width="100%"
          // height="100%"
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{ border: 'none', backgroundColor: 'black', aspectRatio: '16 / 9' }}
          className={clsx({ 'stream-zoom': zoom })}
        />
      ) : (
        <>
          <video
            ref={videoRef}
            width="100%"
            height="100%"
            style={{ backgroundColor: 'black' }}
            autoPlay
            muted
            playsInline
          />
          {isLoading && (
            <Center
              pos="absolute"
              className="stream-loading"
              bg="#000"
              top={0}
              left={0}
              w="100%"
              h="100%"
              style={{ zIndex: 0 }}
            >
              <IconVideoFilled color="white" size={40} />
              <Loader color="white" size={70} />
            </Center>
          )}
        </>
      )}
    </Box>
  );
};

export default HLSPlayer;

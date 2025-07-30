import { useCallback, useEffect, useState } from 'react';

type ImageStatus = 'loading' | 'loaded' | 'error';

type UseImageLoadStatusProps = {
  src: string;
  fallbackSrc?: string;
  retryCount?: number;
  onLoad?: () => void;
  onError?: () => void;
};

export function useImageLoadStatus({
  src,
  fallbackSrc,
  retryCount = 0,
  onLoad,
  onError,
}: UseImageLoadStatusProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [status, setStatus] = useState<ImageStatus>('loading');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setCurrentSrc(src);
    setStatus('loading');
    setAttempts(0);
  }, [src]);

  const handleLoad = useCallback(() => {
    setStatus('loaded');
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    if (attempts < retryCount) {
      setAttempts(prev => prev + 1);
      setStatus('loading');
      setCurrentSrc(src);
    } else if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setStatus('loading');
    } else {
      setStatus('error');
      onError?.();
    }
  }, [attempts, retryCount, fallbackSrc, currentSrc, onError, src]);

  return { currentSrc, status, handleLoad, handleError };
}

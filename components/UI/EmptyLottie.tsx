import { useEffect, useRef } from 'react';
import Lottie from 'lottie-react-native';

export default function EmptyLottie() {
  const animationRef = useRef<Lottie>(null)
  
  useEffect(() => {
    animationRef.current?.play()
  }, [])

  return (
    <Lottie
      ref={animationRef}
      source={require('../../assets/lottie/empty.json')}
    />
  );
}
import { useEffect, useRef } from 'react';
import Lottie from 'lottie-react-native';

export default function ResetLottie() {
  const animationRef = useRef<Lottie>(null)
  
  useEffect(() => {
    animationRef.current?.play(70)
  }, [])

  return (
    <Lottie
      ref={animationRef}
      source={require('../../assets/lottie/fp.json')}
    />
  );
}
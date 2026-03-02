import { useState, useEffect, useRef } from 'react';

export function useCounterAnimation(targetValue, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(targetValue);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);
  const targetValueRef = useRef(targetValue);
  
  // Update count when targetValue changes (for initial load)
  useEffect(() => {
    if (!hasAnimated) {
      setCount(targetValue);
    }
  }, [targetValue, hasAnimated]);

  // Update target value ref when it changes
  useEffect(() => {
    targetValueRef.current = targetValue;
  }, [targetValue]);

  // Intersection Observer to detect when element is in view
  useEffect(() => {
    if (!startOnView || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(elementRef.current);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [startOnView]);

  // Start animation when in view and target value is available
  useEffect(() => {
    if (!isInView || hasAnimated || !targetValue || targetValue === 0) return;
    
    startAnimation();
    setHasAnimated(true);
  }, [isInView, hasAnimated, targetValue]);

  const startAnimation = () => {
    const startTime = Date.now();
    const startValue = 0;
    const endValue = parseInt(targetValueRef.current) || 0;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation (easeOutQuart)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  };

  return { count, elementRef, isAnimating: !hasAnimated && isInView };
}

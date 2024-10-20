import { useEffect } from 'react';

export const useMathJax = () => {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-MML-AM_CHTML';
      script.async = true;
      script.onload = () => {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
      };
      document.head.appendChild(script);
    }
  }, []);
};

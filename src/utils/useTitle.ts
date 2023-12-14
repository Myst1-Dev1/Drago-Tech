import { useEffect } from 'react';

export function useTitle(title: any) {
   useEffect(() => {
     const prevTitle = document.title;
     document.title = title;
 
     return () => {
       console.log(`Restoring title to: ${prevTitle}`);
       document.title = prevTitle;
     };
   }, [title]);
 }
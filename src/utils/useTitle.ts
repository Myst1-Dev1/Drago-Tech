import { useEffect } from 'react';

export function useTitle(title: any) {
   useEffect(() => {
     const prevTitle = document.title;
     console.log(`Setting title to: ${title}`);
     document.title = title;
 
     return () => {
       console.log(`Restoring title to: ${prevTitle}`);
       document.title = prevTitle;
     };
   }, [title]);
 }
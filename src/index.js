import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';

import './reset.css';
import './styles.css';

const root = createRoot(document.querySelector('#root'));
root.render(<App />);






// import { createRoot } from "react-dom/client"
// import { Suspense } from "react"
// import AppNew  from "./components/AppNew"
// import "./stylesNew.css"

// createRoot(document.getElementById("root")).render(
//   <>
//     <Suspense fallback={null}>
//       <AppNew />
//     </Suspense>
//   </>,
// )
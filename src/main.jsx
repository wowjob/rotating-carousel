import React from 'react'
import ReactDOM from 'react-dom/client'
import { Global, RotatingCarousel } from './component'

ReactDOM.createRoot(document.getElementById('rotating-carousel')).render(
  <React.StrictMode>
    <Global />
    <RotatingCarousel />
  </React.StrictMode>,
)

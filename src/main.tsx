import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Flowbite } from 'flowbite-react'


createRoot(document.getElementById('root')!).render(

  <Flowbite>

    <StrictMode>

      <App />

    </StrictMode>
  </Flowbite>
  ,

)

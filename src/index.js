import {createRoot} from 'react-dom/client';

import './index.css';
import App from './App';

const container = document.getElementById('result')

const loadingElement = document.getElementById('loading')
loadingElement.remove() //after loading delete temporary message

const root = createRoot(container);
root.render(<App />)

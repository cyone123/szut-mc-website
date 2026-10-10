import { renderToString } from 'react-dom/server';
import App from './App';

// Build-time only; the deployed site remains static.
export function render(): string {
  return renderToString(<App />);
}

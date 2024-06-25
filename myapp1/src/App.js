import { useContext } from 'react';
import './App.css';
import AppRoute from './routes/appRoute';
import { ThemeContext } from './theme/themeContext';

function App() {
  const { mode, setMode } = useContext(ThemeContext);
  console.log('App:', { mode, setMode }); // Debug log

  return (
    <div className={`App ${mode}`}>
      <AppRoute></AppRoute>
    </div>
  );
}

export default App;

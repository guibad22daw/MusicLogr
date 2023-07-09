import AppRouter from "./AppRouter";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IdiomaContextProvider } from "./context/IdiomaContext";

function App() {
  return (
    <IdiomaContextProvider>
      <AppRouter />
    </IdiomaContextProvider>
  );
}

export default App;
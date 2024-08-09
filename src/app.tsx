import { GrispiProvider } from "./contexts/grispi-context";
import { StoreProvider } from "./contexts/store-context";
import { HomePage } from "./pages/home-page";

const App = () => {
  return (
    <StoreProvider>
        <GrispiProvider>
          <HomePage />
        </GrispiProvider>
    </StoreProvider>
  );
};

export default App;

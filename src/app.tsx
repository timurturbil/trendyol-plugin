import { GrispiProvider } from "./contexts/grispi-context";
import { StoreProvider } from "./contexts/store-context";
import { AuthPage } from "./pages/auth-page";
import { HomePage } from "./pages/home-page";

const App = () => {
  return (
    <StoreProvider>
      <GrispiProvider>
        <Router/>
      </GrispiProvider>
    </StoreProvider>
  );
};

function Router() {
  const tAuthToken = localStorage.getItem("trendyolAuthorizationToken");
  if (tAuthToken) {
    return <HomePage />;
  }
  return <AuthPage />;
}

export default App;

// import { GrispiProvider } from "./contexts/grispi-context";
import { TrendyolProvider } from "./contexts/trendyol-context";
import { StoreProvider } from "./contexts/store-context";
import { WelcomeScreen } from "./screens/welcome-screen";
import { GrispiProvider } from "./contexts/grispi-context";
//import { GrispiProvider } from "./contexts/grispi-context";

const App = () => {
  return (
    <StoreProvider>
      <GrispiProvider>
        <TrendyolProvider>
          <WelcomeScreen />
        </TrendyolProvider>
      </GrispiProvider>
    </StoreProvider>
  );
};

// const App = () => {
//   return (
//     <StoreProvider>
//       <GrispiProvider>
//         <WelcomeScreen />
//       </GrispiProvider>
//     </StoreProvider>
//   );
// };

export default App;

// import { GrispiProvider } from "./contexts/grispi-context";
import { StoreProvider } from "./contexts/store-context";
import { WelcomeScreen } from "./screens/welcome-screen";

const App = () => {
  return (
    <StoreProvider>
        <WelcomeScreen />
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

import { observer } from "mobx-react-lite";

import {
  Screen,
  ScreenContent,
  ScreenHeader,
  ScreenTitle,
} from "@/components/ui/screen";

export const WelcomeScreen = observer(() => {
  return (
    <Screen>
      <ScreenHeader>
        <ScreenTitle>Welcome Screen</ScreenTitle>
      </ScreenHeader>
      <ScreenContent>
        <div className="p-6">Welcome to Grispi Plugin React Starter.</div>
      </ScreenContent>
    </Screen>
  );
});

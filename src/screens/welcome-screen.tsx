import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import { LoadingWrapper } from "@/components/loading-wrapper";
import {
  Screen,
  ScreenContent,
  ScreenHeader,
  ScreenTitle,
} from "@/components/ui/screen";
import { useStore } from "@/contexts/store-context";
import { cn } from "@/lib/utils";

export const WelcomeScreen = observer(() => {
  return (
    <Screen>
      <ScreenHeader>
        <ScreenTitle>Welcome Screen</ScreenTitle>
      </ScreenHeader>
      <ScreenContent>
        <div>Welcome to Grispi Plugin React Starter.</div>
      </ScreenContent>
    </Screen>
  );
});

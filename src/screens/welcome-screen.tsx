import { observer } from "mobx-react-lite";

import { LoadingWrapper } from "@/components/loading-wrapper";
import {
  Screen,
  ScreenContent,
  ScreenHeader,
  ScreenTitle,
} from "@/components/ui/screen";
import { useGrispi } from "@/contexts/grispi-context";

export const WelcomeScreen = observer(() => {
  const { ticket, loading } = useGrispi();

  return (
    <Screen>
      <ScreenHeader>
        <ScreenTitle>Grispi</ScreenTitle>
      </ScreenHeader>
      <ScreenContent>
        {loading ? (
          <LoadingWrapper />
        ) : (
          <div className="flex flex-col gap-3 p-6">
            <span className="text-center text-xs font-bold uppercase text-primary">
              Welcome to starter
            </span>
            <div className="flex flex-col divide-y *:py-2 *:text-xs">
              <div className="flex items-center justify-between">
                <span>Key</span>
                <span className="font-bold">{ticket?.key}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Time</span>
                <span className="font-bold">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </ScreenContent>
    </Screen>
  );
});

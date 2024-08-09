import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { grispiAPI } from "@/grispi/client/api";
import { useStore } from "./store-context";
import { GrispiBundle, Settings, Ticket } from "@/types/grispi.type";
import { Customer } from "@/types/trendyol.type";
import { responseItemSize, supplierId } from "@/lib/constants";

type GrispiContextType = {
  ticket: Ticket | null;
  settings: Settings | null;
  loading: boolean;
};

const GrispiContext = createContext<GrispiContextType | null>(null);

//const plugin = window.Grispi.instance();

export const GrispiProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const trendyolStore = useStore().trendyol;
  const [loading, setLoading] = useState<boolean>(false);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  useEffect(() => {
    grispiAPI.orders.getCustomers(supplierId, responseItemSize).then((response) => {
      const customers = response as Customer[];
      trendyolStore.updateCustomer(customers[0]);
      trendyolStore.updateCustomers(customers);
      trendyolStore.updateOrder(customers[0].orders[0]);
      trendyolStore.updateOrders(customers[0].orders);
    });

    // plugin.init().then(async (bundle: GrispiBundle) => {
    //   setLoading(true);

    //   grispiAPI.authentication.setTenantId(bundle.context.tenantId);
    //   grispiAPI.authentication.setToken(bundle.context.token);
    //   grispiAPI.authentication.setTrendyolToken(trendyolAuthorization);
    //   grispiAPI.orders.getCustomers(supplierId, responseItemSize).then((response) => {
    //     const customers = response as Customer[];
    //     trendyolStore.updateCustomer(customers[0]);
    //     trendyolStore.updateCustomers(customers);
    //     trendyolStore.updateOrder(customers[0].orders[0]);
    //     trendyolStore.updateOrders(customers[0].orders);
        
    //   });
    //   // const ticket = await grispiAPI.tickets.getTicket(
    //   //   bundle.context.ticketKey
    //   // );
    //   // setTicket(ticket);
    //   setLoading(false);
    // }).catch((err: any) => {
    //   console.log("grispi-context", "init", "Error when initializing plugin", err);
    // });

    // plugin.currentTicketUpdated = async (ticket: Ticket) => {
    //   setLoading(true);

    //   try {
    //     const response = await grispiAPI.tickets.getTicket(ticket.key);
    //     setTicket(response);
    //   } catch (err) {
    //     console.error(
    //       "grispi-context",
    //       "currentTicketUpdated",
    //       "Error when fetching ticket details",
    //       ticket.key
    //     );
    //   }

    //   setLoading(false);
    // };
  }, []);

  return (
    <GrispiContext.Provider
      value={{
        ticket,
        settings,
        loading
      }}
    >
      {children}
    </GrispiContext.Provider>
  );
};

export const useGrispi = () => {
  const grispi = useContext(GrispiContext);

  if (!grispi) {
    throw new Error("useGrispi must be used within a GrispiProvider.");
  }

  return grispi;
};
export {};
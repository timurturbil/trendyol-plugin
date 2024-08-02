import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { grispiAPI } from "@/grispi/client/api";
import { GrispiBundle, Settings, Ticket } from "@/types/grispi.type";
import { Customer, Order } from "@/types/trendyol.type";
import { grispiAuthorization, responseItemSize, supplierId, tenantId, trendyolAuthorization } from "@/lib/constants";

type GrispiContextType = {
  ticket: Ticket | null;
  settings: Settings | null;
  loading: boolean;
  order: Order | null;
  orders: Order[] | null;
  customer: Customer | null;
  customers: Customer[] | null;
  setOrder: (order: Order) => void;
  setOrders: (orders: Order[]) => void;
  setCustomer: (customer: Customer) => void;
  showAllOrders: boolean;
  setShowAllOrders: (showAllOrders: boolean) => void;
};

const GrispiContext = createContext<GrispiContextType | null>(null);

const plugin = window.Grispi.instance();

export const GrispiProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [showAllOrders, setShowAllOrders] = useState<boolean>(false);

  useEffect(() => {
    // plugin._init().then(async (bundle: GrispiBundle) => {
    //   setLoading(true);

    //   grispiAPI.authentication.setTenantId(bundle.context.tenantId);
    //   grispiAPI.authentication.setToken(bundle.context.token);

    //   const ticket = await grispiAPI.tickets.getTicket(
    //     bundle.context.ticketKey
    //   );

    //   setTicket(ticket);
    //   setSettings(bundle.settings);
    //   setLoading(false);
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

    grispiAPI.authentication.setTenantId(tenantId);
    grispiAPI.authentication.setToken(grispiAuthorization);
    grispiAPI.authentication.setTrendyolToken(trendyolAuthorization);
    setLoading(true);
    grispiAPI.orders.getCustomers(supplierId, responseItemSize).then((response) => {
      const customers = response as Customer[];
      setCustomer(customers[0]);
      setOrders(customers[0].orders);
      setOrder(customers[0].orders[0]);
      setCustomers(customers);
      setLoading(false);
    });

  }, []);

  return (
    <GrispiContext.Provider
      value={{
        ticket,
        settings,
        loading,
        order,
        orders,
        customer,
        customers,
        setOrder,
        setOrders,
        setCustomer,
        showAllOrders,
        setShowAllOrders
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
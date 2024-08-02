 import React, {
   ReactNode,
   createContext,
   useContext,
   useEffect,
   useState,
 } from "react";

 import { trendyolAPI } from "@/lib/api";
 import { Customer, Order } from "@/types/trendyol.type";
import { responseItemSize, supplierId } from "@/lib/constants";

 type TrendyolContextType = {
   order: Order | null;
   orders: Order[] | null;
   customer: Customer | null;
   customers: Customer[] | null;
   setOrder: (order: Order) => void;
   setOrders: (orders: Order[]) => void;
   setCustomer: (customer: Customer) => void;
   loading: boolean;
   showAllOrders: boolean;
   setShowAllOrders: (showAllOrders: boolean) => void;
 };

 const TrendyolContext = createContext<TrendyolContextType | null>(null);

//  const plugin = window.GrispiClient.instance();

 export const TrendyolProvider: React.FC<{
   children: ReactNode;
 }> = ({ children }) => {
   const [loading, setLoading] = useState<boolean>(true);
   const [order, setOrder] = useState<Order | null>(null);
   const [orders, setOrders] = useState<Order[] | null>(null);
   const [customer, setCustomer] = useState<Customer | null>(null);
   const [customers, setCustomers] = useState<Customer[] | null>(null);
   const [showAllOrders, setShowAllOrders] = useState<boolean>(false);

   useEffect(() => {  
        trendyolAPI.orders.getCustomers(supplierId, responseItemSize).then((response) => {
          const customers = response as Customer[];
          setCustomer(customers[0]);
          setOrders(customers[0].orders);
          setOrder(customers[0].orders[0]);
          setCustomers(customers);
          setLoading(false);
        });
   }, []);

   return (
     <TrendyolContext.Provider
       value={{
         order,
         orders,
         customer,
         customers,
         setOrder,
         setOrders,
         setCustomer,
         loading,
         showAllOrders,
         setShowAllOrders
       }}
     >
       {children}
     </TrendyolContext.Provider>
   );
 };

 export const useTrendyol = () => {
   const trendyol = useContext(TrendyolContext);

   if (!trendyol) {
     throw new Error("useTrendyol must be used within a TrendyolProvider.");
   }

   return trendyol;
 };
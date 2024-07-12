import { observer } from "mobx-react-lite";
import ReactJson from 'react-json-view'
import { LoadingWrapper } from "@/components/loading-wrapper";
import {
  Screen,
  ScreenContent,
  ScreenHeader,
  ScreenTitle,
} from "@/components/ui/screen";
import { useTrendyol } from "@/contexts/trendyol-context";

export const WelcomeScreen = observer(() => {
  const { order, orders, customer, customers, setOrder, setOrders, setCustomer, loading } = useTrendyol();
  return (
    <Screen>
      <ScreenHeader>
        <ScreenTitle>Trendyol Plugin</ScreenTitle>
      </ScreenHeader>
      <ScreenContent>
          {(loading) ? (
             <LoadingWrapper />
          ) : (
          <div className="flex flex-col gap-3 p-6">
            <span className="text-left text-xs font-bold uppercase text-primary">
              Müşteriler
            </span>
            <div className="flex flex-col divide-y *:py-2 *:text-xs">
              {(customers != null  && customer != null) ? customers.map((cus,index) => {
                return (
                    <div className="flex items-center justify-between"
                         style={{backgroundColor: cus.customerId == customer.customerId ? "#f0f0f0" : "transparent"}}
                         key={index}
                         >
                        <span>{cus.customerFirstName + " " + cus.customerLastName}</span>
                        <button
                          className="text-xs text-white bg-primary rounded px-2 py-1"
                          onClick={() => {
                            setCustomer(cus);
                            setOrder(cus.orders[0]);
                            setOrders(cus.orders);
                          }}
                        >
                          Detay
                        </button>
                    </div>
                );
              }): <> </>}
            </div>
            <span className="text-left text-xs font-bold uppercase text-primary">
               Müşteri Bilgileri
            </span>
            {customer != null ? <div className="flex flex-col divide-y *:py-2 *:text-xs">
                           <div className="flex items-center justify-between">
                             <span>Customer Full Name</span>
                             <span className="font-bold">{customer.customerFirstName + " " + customer.customerLastName}</span>
                           </div>
                           <div className="flex items-center justify-between">
                             <span>Customer Email</span>
                             <span className="font-bold">{customer.customerEmail}</span>
                           </div>
                           <div className="flex items-center justify-between">
                             <span>Customer ID</span>
                             <span className="font-bold">{customer.customerId}</span>
                           </div>
                         </div>: <></>}
            <span className="text-left text-xs font-bold uppercase text-primary">
              Müşterinin Son Siparişleri
            </span>
            <div className="flex flex-col divide-y *:py-2 *:text-xs">
              {(orders != null && order != null) ? orders.map((ord, index) => {
                if(index > 5) return;
                return (
                    <div className="flex items-center justify-between"
                         style={{backgroundColor: ord.orderNumber == order.orderNumber ? "#f0f0f0" : "transparent"}}
                         onClick={() => setOrder(ord)}
                         key={index}>
                        <span>{ord.orderNumber} ({new Date(ord.orderDate).toLocaleString()})</span>
                        <button
                          className="text-xs text-white bg-primary rounded px-2 py-1"
                          onClick={() => setOrder(ord)}
                        >
                          Detay
                        </button>
                    </div>
                );
              }): <> </>}
            </div>
            <span className="text-left text-xs font-bold uppercase text-primary">
              Seçilen Sipariş Detayı ({order != null ? order.orderNumber : "null"})
            </span>
            <div className="flex flex-col divide-y *:py-2 *:text-xs">
              {order != null ? <>
                <div className="flex items-center justify-between">
                    <span>Cargo Tracking Number</span>
                    <span className="font-bold">{order.cargoTrackingNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                   <span>Cargo Provider Name</span>
                   <span className="font-bold">{order.cargoProviderName}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Order Number</span>
                    <span className="font-bold">{order.orderNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Order Date</span>
                    <span className="font-bold">{new Date(order.orderDate).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Order Status</span>
                    <span className="font-bold">{order.status}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Package Histories</span>
                    <span className="font-bold">{order.packageHistories.map((item) => {
                        return (
                            <div className="flex items-center justify-between">
                                <span>({new Date(item.createdDate).toLocaleString()}) {item.status} </span>
                            </div>
                        )
                    })}</span>
                </div>
              </>: <> </>}

            {order != null ? <ReactJson collapsed={true} src={order}/> : <span>Seçili bir sipariş bulunmamaktadır.</span>}
            </div>
          </div>
          )}
      </ScreenContent>
    </Screen>
  );
});

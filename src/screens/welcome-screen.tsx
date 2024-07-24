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
import { Select } from 'antd';
import { Customer } from "@/types/trendyol.type";
import { InfoCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
export const WelcomeScreen = observer(() => {
  const { order, orders, customer, customers, setOrder, setOrders, setCustomer, loading, showAllOrders, setShowAllOrders } = useTrendyol();
  
  const customersForSelect = customers?.map((cus) => {
    return {
      value: cus.customerId,
      label: cus.customerFirstName + " " + cus.customerLastName + " (" + cus.customerId + ")"
    }
  });

  const onChange = (value: number) => {
    const selectedCustomer = customers?.find((cus) => cus.customerId == value) as Customer;
    setCustomer(selectedCustomer);
    setOrder(selectedCustomer?.orders[0]);
    setOrders(selectedCustomer?.orders);
    setShowAllOrders(false);
  };

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

          <Select
              showSearch
              placeholder="Search For Customers..."
              optionFilterProp="label"
              onChange={onChange}
              options={customersForSelect}
            />
            
            {customer != null ? <div className="flex flex-col divide-y *:py-2 *:text-xs">
              <span className="text-left text-xs font-bold uppercase text-primary">
                  Customer Information
              </span>
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
            </div>: <> </>}
            
            {(orders != null && order != null) ? <div className="flex flex-col divide-y *:py-2 *:text-xs">
              <span className="text-left text-xs font-bold uppercase text-primary">
                Last Orders of the Customer
                <Popconfirm
                  title="Info"
                  description="Orders up to 3 months are listed in this section."
                  //onConfirm={confirm}
                  showCancel={false}
                  onOpenChange={() => console.log('open change')}
                >
                  <InfoCircleOutlined style={{marginLeft: "5px"}}/>
                </Popconfirm>
                
              </span>
              {orders.map((ord, index) => {
                if(showAllOrders == false && index > 5) return;
                return (
                    <div className="flex items-center justify-between"
                         style={{backgroundColor: ord.orderNumber == order.orderNumber ? "#f0f0f0" : "transparent"}}
                         onClick={() => setOrder(ord)}
                         key={index}>
                        <span>{"ID: " + ord.orderNumber} | {"Last Modified Date: " + new Date(ord.lastModifiedDate).toLocaleString()}</span>
                        <button
                          className="text-xs text-white bg-primary rounded px-2 py-1"
                          onClick={() => setOrder(ord)}
                        >
                          Detail
                        </button>
                    </div>
                );
              })}
              {orders.length > 5 ? <span className="text-xs text-primary cursor-pointer" onClick={() => setShowAllOrders(!showAllOrders)}>
                {showAllOrders ? "Show Less" : "Show All"}
              </span> : <></>}
            </div>: <> </>}
            
            {order != null ? <div className="flex flex-col divide-y *:py-2 *:text-xs">
              <span className="text-left text-xs font-bold uppercase text-primary">
                Selected Order's Detail ({order != null ? order.orderNumber : "null"})
              </span>
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
                    <span>Last Modified Date</span>
                    <span className="font-bold">{new Date(order.lastModifiedDate).toLocaleString()}</span>
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

              <ReactJson collapsed={true} src={order}/>
            </div> : <span>Seçili bir sipariş bulunmamaktadır.</span>}
          </div>
          )}
      </ScreenContent>
    </Screen>
  );
});

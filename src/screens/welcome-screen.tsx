import { observer } from "mobx-react-lite";
import ReactJson from 'react-json-view'
import { LoadingWrapper } from "@/components/loading-wrapper";
import {
  Screen,
  ScreenContent,
  ScreenHeader,
  ScreenTitle,
} from "@/components/ui/screen";
import { Select } from 'antd';
import { Customer } from "@/types/trendyol.type";
import { InfoCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { useGrispi } from "@/contexts/grispi-context";
export const WelcomeScreen = observer(() => {
  const { 
    order, 
    orders, 
    customer, 
    customers, 
    setOrder, 
    setOrders, 
    setCustomer, 
    loading, 
    showAllOrders, 
    setShowAllOrders,
    showAllDetails,
    setShowAllDetails
  } = useGrispi();
  
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
            
            {customer != null ? <div className="flex flex-col divide-y *:py-2 *:text-xs" style={{marginTop: "10px"}}>
              <span className="text-left text-xs font-bold uppercase text-primary">
                  Customer Information
              </span>
                           <div className="flex items-center justify-between">
                             <span>Full Name</span>
                             <span className="font-bold">{customer.customerFirstName + " " + customer.customerLastName}</span>
                           </div>
                           <div className="flex items-center justify-between">
                             <span>Email</span>
                             <span className="font-bold">{customer.customerEmail}</span>
                           </div>
                           <div className="flex items-center justify-between">
                             <span>ID</span>
                             <span className="font-bold">{customer.customerId}</span>
              </div>
            </div>: <> </>}
            
            {(orders != null && order != null) ? <div className="flex flex-col divide-y *:py-2 *:text-xs" style={{marginTop: "10px"}}>
              <span className="text-left text-xs font-bold uppercase text-primary">
                Last Orders of the Customer
                <Popconfirm
                  title="Info"
                  description="The orders up to 3 months are listed in this section. They also listed in descending order by last modified date."
                  //onConfirm={confirm}
                  showCancel={false}
                  onOpenChange={() => console.log('open change')}
                >
                  <InfoCircleOutlined style={{marginLeft: "5px"}}/>
                </Popconfirm>
                
              </span>
              {orders.map((ord, index) => {
                if(showAllOrders == false && index > 3) return;
                //{"Last Modified Date: " + new Date(ord.lastModifiedDate).toLocaleString()}
                return (
                    <div className="flex items-center justify-between"
                         style={{backgroundColor: ord.orderNumber == order.orderNumber ? "#f0f0f0" : "transparent"}}
                         onClick={() => setOrder(ord)}
                         key={index}>
                        <span>{ord.lines[0].productName}</span> 
                        <button
                          className="text-xs text-white bg-primary rounded px-2 py-1"
                          onClick={() => setOrder(ord)}
                        >
                          Detail
                        </button>
                    </div>
                );
              })}
              {orders.length > 3 ? <span className="text-xs text-primary cursor-pointer" onClick={() => setShowAllOrders(!showAllOrders)}>
                {showAllOrders ? "Show Less" : "Show All"}
              </span> : <></>}
            </div>: <> </>}
            
            {order != null ? <div className="flex flex-col divide-y *:py-2 *:text-xs" style={{marginTop: "10px"}}>
              <span className="text-left text-xs font-bold uppercase text-primary">
                Selected Order's Detail
              </span>
                <div className="flex items-center justify-between">
                    <span>Cargo Tracking Number</span>
                    <span className="font-bold" style={{textAlign: "end"}}>{order.cargoTrackingNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Product Name</span>
                    <span className="font-bold" style={{textAlign: "end"}}>{order.lines[0].productName}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Order Number</span>
                    <span className="font-bold" style={{textAlign: "end"}}>{order.orderNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Order Status</span>
                    <span className="font-bold" style={{textAlign: "end"}}>{order.status}</span>
                </div>

                {showAllDetails ?
                  <>
                  <div className="flex items-center justify-between">
                   <span>Cargo Provider Name</span>
                   <span className="font-bold" style={{textAlign: "end"}}>{order.cargoProviderName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Order Date</span>
                    <span className="font-bold" style={{textAlign: "end"}}>{new Date(order.orderDate).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                      <span>Last Modified Date</span>
                      <span className="font-bold" style={{textAlign: "end"}}>{new Date(order.lastModifiedDate).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                      <span>Package Histories</span>
                      <span className="font-bold" style={{textAlign: "end"}}>{order.packageHistories.map((item) => {
                          return (
                              <div className="flex items-center justify-between">
                                  <span>({new Date(item.createdDate).toLocaleString()}) {item.status} </span>
                              </div>
                          )
                      })}</span>
                   </div>
                  </> : <></>
                }
                <span className="text-xs text-primary cursor-pointer" onClick={() => setShowAllDetails(!showAllDetails)}>
                  {showAllDetails ? "Show Less" : "Show All"}
                </span>

              <ReactJson collapsed={true} src={order}/>
            </div> : <span>Seçili bir sipariş bulunmamaktadır.</span>}
          </div>
          )}
      </ScreenContent>
    </Screen>
  );
});

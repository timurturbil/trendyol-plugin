import { HttpRequestHelper } from "../lib/http-request-helper";
import { Customer, Order, OrderResponse } from "@/types/trendyol.type";

export class Orders {
    constructor(
        private http: HttpRequestHelper
    ) {}

    async getOrder<Order>(supplierId: number, orderNumber: number): Promise<Order | null | undefined> {
        const response = await this.http.send<OrderResponse>(
            `suppliers/${supplierId}/orders?orderNumber=${orderNumber}`,
            {
                method: "GET",
                cache: "no-cache"
            }
        );

        if (response) {
            const order: Order = response.content[0] as Order;
            return order
        }
    }

    async getOrders<Order>(supplierId: number, size: number): Promise<Order[] | null | undefined> {
        const response = await this.http.send<OrderResponse>(
            `suppliers/${supplierId}/orders?size=${size}`,
            {
                method: "GET",
                cache: "no-cache"
            }
        );

        if (response) {
            const orders: Order[] = response.content as Order[];
            return orders
        }
    }

    async getCustomers<Customer>(supplierId: number): Promise<Customer[] | null | undefined> {
        const response = await this.http.send<OrderResponse>(
            `suppliers/${supplierId}/orders?size=50`,
            {
                method: "GET",
                cache: "no-cache"
            }
        );

        if (response) {
            const orders: Order[] = response.content as Order[];
            //sort orders orderDate
            orders.sort((a, b) => {
                return b.orderDate - a.orderDate;
            });
            
            const customers: Customer[] = [
                {
                    customerFirstName: orders[0].customerFirstName,
                    customerLastName: orders[0].customerLastName,
                    customerEmail: orders[0].customerEmail,
                    customerId: orders[0].customerId,
                    orders: []
                } as Customer
            ] as Customer[];

            for (const order of orders) {
                let customer = customers.find(c => (c as any).customerId === order.customerId);
                if (customer) {
                    (customer as any).orders.push(order);
                }else{
                    customers.push({
                        customerFirstName: order.customerFirstName,
                        customerLastName: order.customerLastName,
                        customerEmail: order.customerEmail,
                        customerId: order.customerId,
                        orders: [order]
                    } as Customer);
                }
            }

            return customers;
        }
    }
}







//const orders: Order[] = [
//{
//"shipmentAddress": {
//"id": 0,
//"firstName": "PM3-",
//"lastName": "Arvato ",
//"company": "",
//"address1": "Orhanlı mahallesi, Kumpas Cd. 29, 34956 Deri Osb/Tuzla/İstanbul",
//"address2": "",
//"city": "İstanbul",
//"cityCode": 34,
//"district": "Tuzla",
//"districtId": 29,
//"postalCode": "34956",
//"countryCode": "TR",
//"neighborhoodId": 29552,
//"neighborhood": "Orhanlı Mah.",
//"phone": null,
//"fullAddress": "Orhanlı mahallesi, Kumpas Cd. 29, 34956 Deri Osb/Tuzla/İstanbul     Tuzla İstanbul",
//"fullName": "PM3- Arvato"
//},
//"orderNumber": "1236889375",
//"totalDiscount": 0,
//"totalTyDiscount": 0,
//"taxNumber": null,
//"invoiceAddress": {
//"id": 12537987,
//"firstName": "ryadti",
//"lastName": "qaysar",
//"company": "",
//"address1": "mfarkan 4 ryadti",
//"address2": "",
//"city": "Abu Dhabi",
//"cityCode": 34,
//"district": "Industrial City",
//"districtId": 31,
//"postalCode": "34000",
//"countryCode": "AE",
//"neighborhoodId": 29202,
//"neighborhood": "Suadiye Mah",
//"phone": null,
//"fullAddress": "mfarkan 4 ryadti     Industrial City Abu Dhabi",
//"fullName": "ryadti qaysar"
//},
//"customerFirstName": "Easy",
//"customerEmail": "pf+7xmvz5pm@trendyolmail.com",
//"customerId": 25372480,
//"customerLastName": "Return",
//"id": 58662415,
//"cargoTrackingNumber": 7250000138171414,
//"cargoProviderName": "Yurtiçi Kargo Marketplace",
//"lines": [
//{
//"quantity": 1,
//"salesCampaignId": 61,
//"productSize": "Tek Ebat",
//"merchantSku": "merchantSku",
//"productName": "Playstation 7 SONYPS55, one size",
//"productCode": 68661256,
//"merchantId": 2738,
//"discount": 0,
//"tyDiscount": 0,
//"discountDetails": [
//{
//"lineItemPrice": 0,
//"lineItemDiscount": 0,
//"lineItemTyDiscount": 0
//}
//],
//"productColor": "Mavi",
//"id": 7306855,
//"sku": "urjeasealo3223",
//"vatBaseAmount": 18,
//"barcode": "urjeasealo3223",
//"orderLineItemStatusName": "ReadyToShip",
//"fastDeliveryOptions": []
//}
//],
//"orderDate": 1720783169964,
//"tcIdentityNumber": "11111111111",
//"packageHistories": [
//{
//"createdDate": 1720772371067,
//"status": "Awaiting"
//},
//{
//"createdDate": 1720772464630,
//"status": "Created"
//}
//],
//"shipmentPackageStatus": "ReadyToShip",
//"status": "Created",
//"whoPays": 1,
//"deliveryType": "normal",
//"timeSlotId": 0,
//"estimatedDeliveryStartDate": 1674887878000,
//"estimatedDeliveryEndDate": 1674887878000,
//"totalPrice": 0,
//"deliveryAddressType": "Shipment",
//"agreedDeliveryDate": 1720904340000,
//"fastDelivery": false,
//"originShipmentDate": 1720772371039,
//"lastModifiedDate": 1720772484691,
//"commercial": false,
//"fastDeliveryType": "",
//"deliveredByService": false,
//"agreedDeliveryDateExtendible": false,
//"extendedAgreedDeliveryDate": 0,
//"agreedDeliveryExtensionEndDate": 0,
//"agreedDeliveryExtensionStartDate": 0,
//"warehouseId": 144854,
//"groupDeal": false,
//"micro": true,
//"giftBoxRequested": false,
//"3pByTrendyol": false
//},
//{
//"shipmentAddress": {
//"id": 0,
//"firstName": "PM3-",
//"lastName": "Arvato ",
//"company": "",
//"address1": "Orhanlı mahallesi, Kumpas Cd. 29, 34956 Deri Osb/Tuzla/İstanbul",
//"address2": "",
//"city": "İstanbul",
//"cityCode": 34,
//"district": "Tuzla",
//"districtId": 29,
//"postalCode": "34956",
//"countryCode": "TR",
//"neighborhoodId": 29552,
//"neighborhood": "Orhanlı Mah.",
//"phone": null,
//"fullAddress": "Orhanlı mahallesi, Kumpas Cd. 29, 34956 Deri Osb/Tuzla/İstanbul     Tuzla İstanbul",
//"fullName": "PM3- Arvato"
//},
//"orderNumber": "1236889377",
//"totalDiscount": 0,
//"totalTyDiscount": 0,
//"taxNumber": null,
//"invoiceAddress": {
//"id": 12537995,
//"firstName": "ryadti",
//"lastName": "qaysar",
//"company": "",
//"address1": "mfarkan 4 ryadti",
//"address2": "",
//"city": "Abu Dhabi",
//"cityCode": 34,
//"district": "Industrial City",
//"districtId": 31,
//"postalCode": "34000",
//"countryCode": "AE",
//"neighborhoodId": 29202,
//"neighborhood": "Suadiye Mah",
//"phone": null,
//"fullAddress": "mfarkan 4 ryadti     Industrial City Abu Dhabi",
//"fullName": "ryadti qaysar"
//},
//"customerFirstName": "Easy",
//"customerEmail": "pf+dweyza56@trendyolmail.com",
//"customerId": 25372480,
//"customerLastName": "Return",
//"id": 58662421,
//"cargoTrackingNumber": 7250000138171254,
//"cargoProviderName": "Yurtiçi Kargo Marketplace",
//"lines": [
//{
//"quantity": 1,
//"salesCampaignId": 61,
//"productSize": "Tek Ebat",
//"merchantSku": "merchantSku",
//"productName": "Playstation 7 SONYPS55, one size",
//"productCode": 68661256,
//"merchantId": 2738,
//"discount": 0,
//"tyDiscount": 0,
//"discountDetails": [
//{
//"lineItemPrice": 0,
//"lineItemDiscount": 0,
//"lineItemTyDiscount": 0
//}
//],
//"productColor": "Mavi",
//"id": 7306860,
//"sku": "urjeasealo3223",
//"vatBaseAmount": 18,
//"barcode": "urjeasealo3223",
//"orderLineItemStatusName": "ReadyToShip",
//"fastDeliveryOptions": []
//}
//],
//"orderDate": 1720783190377,
//"tcIdentityNumber": "11111111111",
//"packageHistories": [
//{
//"createdDate": 1720772396106,
//"status": "Awaiting"
//},
//{
//"createdDate": 1720772404370,
//"status": "Created"
//}
//],
//"shipmentPackageStatus": "ReadyToShip",
//"status": "Created",
//"whoPays": 1,
//"deliveryType": "normal",
//"timeSlotId": 0,
//"estimatedDeliveryStartDate": 1674887878000,
//"estimatedDeliveryEndDate": 1674887878000,
//"totalPrice": 0,
//"deliveryAddressType": "Shipment",
//"agreedDeliveryDate": 1720904340000,
//"fastDelivery": false,
//"originShipmentDate": 1720772396083,
//"lastModifiedDate": 1720772424552,
//"commercial": false,
//"fastDeliveryType": "",
//"deliveredByService": false,
//"agreedDeliveryDateExtendible": false,
//"extendedAgreedDeliveryDate": 0,
//"agreedDeliveryExtensionEndDate": 0,
//"agreedDeliveryExtensionStartDate": 0,
//"warehouseId": 144854,
//"groupDeal": false,
//"micro": true,
//"giftBoxRequested": false,
//"3pByTrendyol": false
//},
//{
//"shipmentAddress": {
//"id": 0,
//"firstName": "PM3-",
//"lastName": "Arvato ",
//"company": "",
//"address1": "Orhanlı mahallesi, Kumpas Cd. 29, 34956 Deri Osb/Tuzla/İstanbul",
//"address2": "",
//"city": "İstanbul",
//"cityCode": 34,
//"district": "Tuzla",
//"districtId": 29,
//"postalCode": "34956",
//"countryCode": "TR",
//"neighborhoodId": 29552,
//"neighborhood": "Orhanlı Mah.",
//"phone": null,
//"fullAddress": "Orhanlı mahallesi, Kumpas Cd. 29, 34956 Deri Osb/Tuzla/İstanbul     Tuzla İstanbul",
//"fullName": "PM3- Arvato"
//},
//"orderNumber": "1236889378",
//"totalDiscount": 0,
//"totalTyDiscount": 0,
//"taxNumber": null,
//"invoiceAddress": {
//"id": 12537999,
//"firstName": "ryadti",
//"lastName": "qaysar",
//"company": "",
//"address1": "mfarkan 4 ryadti",
//"address2": "",
//"city": "Abu Dhabi",
//"cityCode": 34,
//"district": "Industrial City",
//"districtId": 31,
//"postalCode": "34000",
//"countryCode": "AE",
//"neighborhoodId": 29202,
//"neighborhood": "Suadiye Mah",
//"phone": null,
//"fullAddress": "mfarkan 4 ryadti     Industrial City Abu Dhabi",
//"fullName": "ryadti qaysar"
//},
//"customerFirstName": "Easy",
//"customerEmail": "pf+7zo5z6lx@trendyolmail.com",
//"customerId": 25372480,
//"customerLastName": "Return",
//"id": 58662422,
//"cargoTrackingNumber": 7250000138171278,
//"cargoProviderName": "Yurtiçi Kargo Marketplace",
//"lines": [
//{
//"quantity": 1,
//"salesCampaignId": 61,
//"productSize": "Tek Ebat",
//"merchantSku": "merchantSku",
//"productName": "Playstation 7 SONYPS55, one size",
//"productCode": 68661256,
//"merchantId": 2738,
//"discount": 0,
//"tyDiscount": 0,
//"discountDetails": [
//{
//"lineItemPrice": 0,
//"lineItemDiscount": 0,
//"lineItemTyDiscount": 0
//}
//],
//"productColor": "Mavi",
//"id": 7306863,
//"sku": "urjeasealo3223",
//"vatBaseAmount": 18,
//"barcode": "urjeasealo3223",
//"orderLineItemStatusName": "ReadyToShip",
//"fastDeliveryOptions": []
//}
//],
//"orderDate": 1720783190377,
//"tcIdentityNumber": "11111111111",
//"packageHistories": [
//{
//"createdDate": 1720772400395,
//"status": "Awaiting"
//},
//{
//"createdDate": 1720772404509,
//"status": "Created"
//}
//],
//"shipmentPackageStatus": "ReadyToShip",
//"status": "Created",
//"whoPays": 1,
//"deliveryType": "normal",
//"timeSlotId": 0,
//"estimatedDeliveryStartDate": 1674887878000,
//"estimatedDeliveryEndDate": 1674887878000,
//"totalPrice": 0,
//"deliveryAddressType": "Shipment",
//"agreedDeliveryDate": 1720904340000,
//"fastDelivery": false,
//"originShipmentDate": 1720772400364,
//"lastModifiedDate": 1720772424511,
//"commercial": false,
//"fastDeliveryType": "",
//"deliveredByService": false,
//"agreedDeliveryDateExtendible": false,
//"extendedAgreedDeliveryDate": 0,
//"agreedDeliveryExtensionEndDate": 0,
//"agreedDeliveryExtensionStartDate": 0,
//"warehouseId": 144854,
//"groupDeal": false,
//"micro": true,
//"giftBoxRequested": false,
//"3pByTrendyol": false
//},
//{
//"shipmentAddress": {
//"id": 0,
//"firstName": "PM3-",
//"lastName": "Arvato ",
//"company": "",
//"address1": "Orhanlı mahallesi, Kumpas Cd. 29, 34956 Deri Osb/Tuzla/İstanbul",
//"address2": "",
//"city": "İstanbul",
//"cityCode": 34,
//"district": "Tuzla",
//"districtId": 29,
//"postalCode": "34956",
//"countryCode": "TR",
//"neighborhoodId": 29552,
//"neighborhood": "Orhanlı Mah.",
//"phone": null,
//"fullAddress": "Orhanlı mahallesi, Kumpas Cd. 29, 34956 Deri Osb/Tuzla/İstanbul     Tuzla İstanbul",
//"fullName": "PM3- Arvato"
//},
//"orderNumber": "1236889376",
//"totalDiscount": 0,
//"totalTyDiscount": 0,
//"taxNumber": null,
//"invoiceAddress": {
//"id": 12537991,
//"firstName": "ryadti",
//"lastName": "qaysar",
//"company": "",
//"address1": "mfarkan 4 ryadti",
//"address2": "",
//"city": "Abu Dhabi",
//"cityCode": 34,
//"district": "Industrial City",
//"districtId": 31,
//"postalCode": "34000",
//"countryCode": "AE",
//"neighborhoodId": 29202,
//"neighborhood": "Suadiye Mah",
//"phone": null,
//"fullAddress": "mfarkan 4 ryadti     Industrial City Abu Dhabi",
//"fullName": "ryadti qaysar"
//},
//"customerFirstName": "Easy",
//"customerEmail": "pf+d4o9mrb9@trendyolmail.com",
//"customerId": 25372480,
//"customerLastName": "Return",
//"id": 58662416,
//"cargoTrackingNumber": 7250000138171155,
//"cargoProviderName": "Yurtiçi Kargo Marketplace",
//"lines": [
//{
//"quantity": 1,
//"salesCampaignId": 61,
//"productSize": "Tek Ebat",
//"merchantSku": "merchantSku",
//"productName": "Playstation 7 SONYPS55, one size",
//"productCode": 68661256,
//"merchantId": 2738,
//"discount": 0,
//"tyDiscount": 0,
//"discountDetails": [
//{
//"lineItemPrice": 0,
//"lineItemDiscount": 0,
//"lineItemTyDiscount": 0
//}
//],
//"productColor": "Mavi",
//"id": 7306858,
//"sku": "urjeasealo3223",
//"vatBaseAmount": 18,
//"barcode": "urjeasealo3223",
//"orderLineItemStatusName": "ReadyToShip",
//"fastDeliveryOptions": []
//}
//],
//"orderDate": 1720783190377,
//"tcIdentityNumber": "11111111111",
//"packageHistories": [
//{
//"createdDate": 1720772391581,
//"status": "Awaiting"
//},
//{
//"createdDate": 1720772404360,
//"status": "Created"
//}
//],
//"shipmentPackageStatus": "ReadyToShip",
//"status": "Created",
//"whoPays": 1,
//"deliveryType": "normal",
//"timeSlotId": 0,
//"estimatedDeliveryStartDate": 1674887878000,
//"estimatedDeliveryEndDate": 1674887878000,
//"totalPrice": 0,
//"deliveryAddressType": "Shipment",
//"agreedDeliveryDate": 1720904340000,
//"fastDelivery": false,
//"originShipmentDate": 1720772391545,
//"lastModifiedDate": 1720772414493,
//"commercial": false,
//"fastDeliveryType": "",
//"deliveredByService": false,
//"agreedDeliveryDateExtendible": false,
//"extendedAgreedDeliveryDate": 0,
//"agreedDeliveryExtensionEndDate": 0,
//"agreedDeliveryExtensionStartDate": 0,
//"warehouseId": 144854,
//"groupDeal": false,
//"micro": true,
//"giftBoxRequested": false,
//"3pByTrendyol": false
//},
//{
//"shipmentAddress": {
//"id": 12530691,
//"firstName": "order",
//"lastName": "platform ",
//"company": "",
//"address1": "sarı harman sokak ads asd asd",
//"address2": "",
//"city": "İstanbul",
//"cityCode": 34,
//"district": "Ataşehir",
//"districtId": 40,
//"postalCode": "34000",
//"countryCode": "TR",
//"neighborhoodId": 28268,
//"neighborhood": "Aşıkveysel Mah",
//"phone": null,
//"fullAddress": "sarı harman sokak ads asd asd     Ataşehir İstanbul",
//"fullName": "order platform"
//},
//"orderNumber": "1236888027",
//"grossAmount": 909.44,
//"totalDiscount": 55.84,
//"totalTyDiscount": 0,
//"taxNumber": null,
//"invoiceAddress": {
//"id": 12530690,
//"firstName": "order",
//"lastName": "platform",
//"company": "",
//"address1": "sarı harman sokak ads asd asd",
//"address2": "",
//"city": "İstanbul",
//"cityCode": 34,
//"district": "Ataşehir",
//"districtId": 40,
//"postalCode": "34000",
//"countryCode": "TR",
//"neighborhoodId": 28268,
//"neighborhood": "Aşıkveysel Mah",
//"phone": null,
//"fullAddress": "sarı harman sokak ads asd asd     Ataşehir İstanbul",
//"fullName": "order platform"
//},
//"customerFirstName": "order",
//"customerEmail": "pf+7pavzqlp@trendyolmail.com",
//"customerId": 26366319,
//"customerLastName": "platform",
//"id": 58658780,
//"cargoTrackingNumber": 7250000138138882,
//"cargoProviderName": "Yurtiçi Kargo Marketplace",
//"lines": [
//{
//"quantity": 7,
//"salesCampaignId": 61,
//"productSize": "Tek Ebat",
//"merchantSku": "5001-2623",
//"productName": "CHRYSLER NEON- 95/99; ARKA TAMPON İÇ BAĞLANTI BRAKETİ SAĞ PLASTİK (TYG) 5001-2623, one size",
//"productCode": 69172615,
//"merchantId": 2738,
//"amount": 16.24,
//"discount": 1,
//"tyDiscount": 0,
//"discountDetails": [
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.2,
//"lineItemDiscount": 1.04,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//}
//],
//"currencyCode": "TRY",
//"id": 7302879,
//"sku": "5001-2623",
//"vatBaseAmount": 20,
//"barcode": "5001-2623",
//"orderLineItemStatusName": "Delivered",
//"price": 15.24,
//"fastDeliveryOptions": []
//},
//{
//"quantity": 7,
//"salesCampaignId": 61,
//"productSize": "Tek Ebat",
//"merchantSku": "5001-2623",
//"productName": "CHRYSLER NEON- 95/99; ARKA TAMPON İÇ BAĞLANTI BRAKETİ SAĞ PLASTİK (TYG) 5001-2623, one size",
//"productCode": 69172615,
//"merchantId": 2738,
//"amount": 16.24,
//"discount": 1,
//"tyDiscount": 0,
//"discountDetails": [
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.2,
//"lineItemDiscount": 1.04,
//"lineItemTyDiscount": 0
//}
//],
//"currencyCode": "TRY",
//"id": 7302873,
//"sku": "5001-2623",
//"vatBaseAmount": 20,
//"barcode": "5001-2623",
//"orderLineItemStatusName": "Delivered",
//"price": 15.24,
//"fastDeliveryOptions": []
//},
//{
//"quantity": 7,
//"salesCampaignId": 61,
//"productSize": "Tek Ebat",
//"merchantSku": "5001-2623",
//"productName": "CHRYSLER NEON- 95/99; ARKA TAMPON İÇ BAĞLANTI BRAKETİ SAĞ PLASTİK (TYG) 5001-2623, one size",
//"productCode": 69172615,
//"merchantId": 2738,
//"amount": 16.24,
//"discount": 1,
//"tyDiscount": 0,
//"discountDetails": [
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.2,
//"lineItemDiscount": 1.04,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//}
//],
//"currencyCode": "TRY",
//"id": 7302877,
//"sku": "5001-2623",
//"vatBaseAmount": 20,
//"barcode": "5001-2623",
//"orderLineItemStatusName": "Delivered",
//"price": 15.24,
//"fastDeliveryOptions": []
//},
//{
//"quantity": 7,
//"salesCampaignId": 61,
//"productSize": "Tek Ebat",
//"merchantSku": "5001-2623",
//"productName": "CHRYSLER NEON- 95/99; ARKA TAMPON İÇ BAĞLANTI BRAKETİ SAĞ PLASTİK (TYG) 5001-2623, one size",
//"productCode": 69172615,
//"merchantId": 2738,
//"amount": 16.24,
//"discount": 1,
//"tyDiscount": 0,
//"discountDetails": [
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.2,
//"lineItemDiscount": 1.04,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//}
//],
//"currencyCode": "TRY",
//"id": 7302874,
//"sku": "5001-2623",
//"vatBaseAmount": 20,
//"barcode": "5001-2623",
//"orderLineItemStatusName": "Delivered",
//"price": 15.24,
//"fastDeliveryOptions": []
//},
//{
//"quantity": 7,
//"salesCampaignId": 61,
//"productSize": "Tek Ebat",
//"merchantSku": "5001-2623",
//"productName": "CHRYSLER NEON- 95/99; ARKA TAMPON İÇ BAĞLANTI BRAKETİ SAĞ PLASTİK (TYG) 5001-2623, one size",
//"productCode": 69172615,
//"merchantId": 2738,
//"amount": 16.24,
//"discount": 1,
//"tyDiscount": 0,
//"discountDetails": [
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.2,
//"lineItemDiscount": 1.04,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//}
//],
//"currencyCode": "TRY",
//"id": 7302872,
//"sku": "5001-2623",
//"vatBaseAmount": 20,
//"barcode": "5001-2623",
//"orderLineItemStatusName": "Delivered",
//"price": 15.24,
//"fastDeliveryOptions": []
//},
//{
//"quantity": 7,
//"salesCampaignId": 61,
//"productSize": "Tek Ebat",
//"merchantSku": "5001-2623",
//"productName": "CHRYSLER NEON- 95/99; ARKA TAMPON İÇ BAĞLANTI BRAKETİ SAĞ PLASTİK (TYG) 5001-2623, one size",
//"productCode": 69172615,
//"merchantId": 2738,
//"amount": 16.24,
//"discount": 1,
//"tyDiscount": 0,
//"discountDetails": [
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.2,
//"lineItemDiscount": 1.04,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//}
//],
//"currencyCode": "TRY",
//"id": 7302878,
//"sku": "5001-2623",
//"vatBaseAmount": 20,
//"barcode": "5001-2623",
//"orderLineItemStatusName": "Delivered",
//"price": 15.24,
//"fastDeliveryOptions": []
//},
//{
//"quantity": 7,
//"salesCampaignId": 61,
//"productSize": "Tek Ebat",
//"merchantSku": "5001-2623",
//"productName": "CHRYSLER NEON- 95/99; ARKA TAMPON İÇ BAĞLANTI BRAKETİ SAĞ PLASTİK (TYG) 5001-2623, one size",
//"productCode": 69172615,
//"merchantId": 2738,
//"amount": 16.24,
//"discount": 1,
//"tyDiscount": 0,
//"discountDetails": [
//{
//"lineItemPrice": 15.2,
//"lineItemDiscount": 1.04,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//}
//],
//"currencyCode": "TRY",
//"id": 7302875,
//"sku": "5001-2623",
//"vatBaseAmount": 20,
//"barcode": "5001-2623",
//"orderLineItemStatusName": "Delivered",
//"price": 15.24,
//"fastDeliveryOptions": []
//},
//{
//"quantity": 7,
//"salesCampaignId": 61,
//"productSize": "Tek Ebat",
//"merchantSku": "5001-2623",
//"productName": "CHRYSLER NEON- 95/99; ARKA TAMPON İÇ BAĞLANTI BRAKETİ SAĞ PLASTİK (TYG) 5001-2623, one size",
//"productCode": 69172615,
//"merchantId": 2738,
//"amount": 16.24,
//"discount": 1,
//"tyDiscount": 0,
//"discountDetails": [
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.2,
//"lineItemDiscount": 1.04,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//},
//{
//"lineItemPrice": 15.25,
//"lineItemDiscount": 0.99,
//"lineItemTyDiscount": 0
//}
//],
//"currencyCode": "TRY",
//"id": 7302876,
//"sku": "5001-2623",
//"vatBaseAmount": 20,
//"barcode": "5001-2623",
//"orderLineItemStatusName": "Delivered",
//"price": 15.24,
//"fastDeliveryOptions": []
//}
//],
//"orderDate": 1720718425466,
//"tcIdentityNumber": "11111111111",
//"currencyCode": "TRY",
//"packageHistories": [
//{
//"createdDate": 1720707627618,
//"status": "Awaiting"
//},
//{
//"createdDate": 1720707635914,
//"status": "Created"
//},
//{
//"createdDate": 1720707636275,
//"status": "Shipped"
//},
//{
//"createdDate": 1720707636275,
//"status": "Delivered"
//}
//],
//"shipmentPackageStatus": "Delivered",
//"status": "Delivered",
//"whoPays": 1,
//"deliveryType": "normal",
//"timeSlotId": 0,
//"estimatedDeliveryStartDate": 1723294146000,
//"estimatedDeliveryEndDate": 1723294146000,
//"totalPrice": 853.6,
//"deliveryAddressType": "Shipment",
//"agreedDeliveryDate": 1721312435903,
//"fastDelivery": false,
//"originShipmentDate": 1720707627529,
//"lastModifiedDate": 1720707636275,
//"commercial": false,
//"fastDeliveryType": "",
//"deliveredByService": false,
//"agreedDeliveryDateExtendible": false,
//"extendedAgreedDeliveryDate": 0,
//"agreedDeliveryExtensionEndDate": 0,
//"agreedDeliveryExtensionStartDate": 0,
//"warehouseId": 144854,
//"groupDeal": false,
//"micro": false,
//"giftBoxRequested": false,
//"3pByTrendyol": false
//}
//] as Order[];
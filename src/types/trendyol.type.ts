export interface Customer {
    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
    customerId: number;
    orders: Order[];
}

export interface OrderResponse {
    content: Order[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface Order {
    shipmentAddress: Address;
    orderNumber: string;
    totalDiscount: number;
    totalTyDiscount: number;
    taxNumber: string;
    invoiceAddress: Address;
    customerFirstName: string;
    customerEmail: string;
    customerId: number;
    customerLastName: string;
    id: number;
    cargoTrackingNumber: string;
    cargoProviderName: string;
    lines: Line[];
    orderDate: number;
    tcIdentityNumber: string;
    currencyCode: string;
    packageHistories: PackageHistory[];
    shipmentPackageStatus: string;
    status: string;
    whoPays: number;
    deliveryType: string;
    timeSlotId: number;
    estimatedDeliveryStartDate: number;
    estimatedDeliveryEndDate: number;
    totalPrice: number;
    deliveryAddressType: string;
    agreedDeliveryDate: number;
    fastDelivery: boolean;
    originShipmentDate: number;
    lastModifiedDate: number;
    commercial: boolean;
    fastDeliveryType: string;
    deliveredByService: boolean;
    agreedDeliveryDateExtendible: boolean;
    extendedAgreedDeliveryDate: number;
    agreedDeliveryExtensionEndDate: number;
    agreedDeliveryExtensionStartDate: number;
    warehouseId: number;
    groupDeal: boolean;
    micro: boolean;
    giftBoxRequested: boolean;
    _3pByTrendyol: boolean;
}

interface Address {
    id: number;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    cityCode: number;
    district: string;
    districtId: number;
    postalCode: string;
    countryCode: string;
    neighborhoodId: number;
    phone: string;
    fullAddress: string;
    fullName: string;
}

interface Line {
    quantity: number;
    salesCampaignId: number;
    merchantSku: string;
    productName: string;
    productCode: number;
    merchantId: number;
    discount: number;
    tyDiscount: number;
    discountDetails: DiscountDetail[];
    currencyCode: string;
    id: number;
    sku: string;
    vatBaseAmount: number;
    barcode: string;
    orderLineItemStatusName: string;
    fastDeliveryOptions: any[];
}

interface DiscountDetail {
    lineItemPrice: number;
    lineItemDiscount: number;
    lineItemTyDiscount: number;
}

interface PackageHistory {
    createdDate: number;
    status: string;
}
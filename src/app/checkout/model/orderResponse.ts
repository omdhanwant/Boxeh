export interface orderResponse{
    code: number,
    status: boolean,
    message: string,
    data: {
      order_id: number,
      status: string,
      date_created: string,
      total: string,
      items: [
        {
          id: number,
          name: string,
          product_id: number,
          variation_id: number,
          quantity: number,
          tax_class: number,
          subtotal: number,
          subtotal_tax: number,
          total: number,
          total_tax: number,
          taxes: [
            
          ],
          meta_data:{
            id: number,
            key: string,
            value: string,
          }[],
          sku: string,
          price: string,
        }
      ]
    }
  }
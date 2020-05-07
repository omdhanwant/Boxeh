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

  export interface paymentMethods
  {
    code: number,
    status: boolean,
    message: string,
    data: {
            id:string,
            title:string,
            description:string,
            order:string,
            enabled:string,
            method_title:string,
            method_description:string,
            method_supports: [],
            settings: {
                title: {
                    id: string,
                    label: string,
                    description: string,
                    type: string,
                    value: string,
                    default: string,
                    tip: string,
                    placeholder: string,
                },
                instructions: {
                    id: string,
                    label: string,
                    description: string,
                    type: string,
                    value: string,
                    default: string,
                    tip: string,
                    placeholder:string, 
                },
                enable_for_methods: {
                    id: string,
                    label: string,
                    description: string,
                    type: string,
                    value: string,
                    default: string,
                    tip: string,
                    placeholder: string,
                    options: {}
                },
                enable_for_virtual: {},
                entityId: {
                  default: string;
                  description: string;
                  id:string;
                  label:string;
                  placeholder:string;
                  tip:string;
                  type:string;
                  value:string;
                }
            },
        }[]
}

export interface shippingMethods{
  code: number,
  status: boolean,
  message: string,
  data: [
      {
          id:string,
          instance_id:string,
          title:string,
          order:string,
          enabled:string,
          method_id:string,
          method_title:string,
          method_description:string,
          settings: {
              title: {
                  id:string,
                  label:string,
                  description:string,
                  type:string,
                  value:string,
                  default:string,
                  tip:string,
                  placeholder:string,
              },
              tax_status: {
                  id:string,
                  label:string,
                  description:string,
                  type:string,
                  value:string,
                  default:string,
                  tip:string,
                  placeholder:string,
                  options: {
                      taxable:string,
                      none:string,
                  }
              },
              cost: {
                  id:string,
                  label:string,
                  description:string,
                  type:string,
                  value:number,
                  default:string,
                  tip:string,
                  placeholder:string,
              }
          },
          _links: {
              self: [
                  {
                      href:string,
                  }
              ],
              collection: [
                  {
                      href:string,
                  }
              ],
              describes: [
                  {
                      href: string,
                  }
              ]
          }
      }
  ]
}
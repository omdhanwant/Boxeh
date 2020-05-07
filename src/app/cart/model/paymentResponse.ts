export interface paymentResponse{
    id:string;
    paymentType:string;
    paymentBrand:string;
    result: {
        code:string;
        description:string;
    },
    card: {
        bin: string;
        last4Digits:string;
        holder: string;
        expiryMonth: number;
        expiryYear: number;
    },
    redirect: {
        url: string;
        parameters: {
          name: string;
          value: string;
        }[]
    },
    risk: {
        score: number;
    },
    buildNumber: string;
    timestamp: string;
    ndc: string;
}
declare module 'sib-api-v3-sdk' {
  export interface SmtpEmailData {
    to: Array<{
      email: string;
      name: string;
    }>;
    templateId: number;
    params?: Record<string, any>;
  }

  export class SendSmtpEmail implements SmtpEmailData {
    to: Array<{
      email: string;
      name: string;
    }>;
    templateId: number;
    params?: Record<string, any>;
  }

  export class ApiClient {
    static instance: ApiClient;
    authentications: {
      'api-key': {
        apiKey: string;
      };
    };
  }

  export class TransactionalEmailsApi {
    constructor();
    sendTransacEmail(data: SendSmtpEmail): Promise<any>;
  }
} 
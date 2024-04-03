type Attachment = {
    title: string;
    text?: string;
    imageurl?: string;
};
export declare const sendMessage: (url: string, attachments?: Attachment[]) => Promise<void>;
export {};

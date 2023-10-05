export declare const getMsgFiles: (dir: string) => Promise<string[]>;
export declare const getMsgFilesData: (dir: string, namespace: string) => Promise<{
    path: string;
    data: string;
    namespace: string;
    name: string;
}[]>;

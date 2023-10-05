import { IConfig } from '../types/config';
/** Take in a ros definition string and generates a typescript interface */
export declare const generateFromRosMsg: (rosDefinition: string, typePrefix?: string, rosVersion?: IConfig['rosVersion']) => string;

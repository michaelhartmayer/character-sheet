import Operation from '../Operation';
declare class RoundUp extends Operation {
    static type: string;
    static from(addOperation: any): RoundUp;
    import(): void;
    export(): {
        type: string;
    };
    transform(value: any, resolver: any): number;
}
export default RoundUp;

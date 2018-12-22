import Operation from '../Operation';
declare class RoundDown extends Operation {
    static type: string;
    static from(addOperation: any): RoundDown;
    import(): void;
    export(): {
        type: string;
    };
    transform(value: any, resolver: any): number;
}
export default RoundDown;

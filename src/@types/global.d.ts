export { };

declare global {
    type VoidFunction = () => void;
    type ISelectOption = {
        label: string;
        value: string | number;
        selected?: boolean;
    };
    type ITabItem = {
        label: string;
        value: string | number;
        selected?: boolean;
    };
    type IProduct = {
        id: string,
        name: string,
        price: number,
    }
}
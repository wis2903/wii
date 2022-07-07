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
    type IColor = {
        label: string,
        value: string,
        images?: string[],
    };
    type IStorageItemValue = Record<string, unknown> | Array | undefined;
    type IBuyer = {
        name: string,
        phoneNumber: string,
        email: string,
        address: string,
    }
    type IBuyerInfoValidationError = {
        name?: string,
        address?: string,
        email?: string,
        phoneNumber?: string,
    }
    type IFileInfo = {
        file: File,
        blob: Blob,
    }
}
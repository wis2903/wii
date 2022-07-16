export { };

declare global {
    interface IComponentIconInfo {
        type: 'image' | 'fa',
        value: string,
        onClick?: VoidFunction,
    }
    interface IInputComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
        label: string,
        className?: string,
        required?: boolean,
        icon?: IComponentIconInfo,
        error?: string,
        initValue?: string | number,
        inputRef?: React.LegacyRef<HTMLInputElement>,
        onValueChange?: (value: string) => void,
        onEnter?: VoidFunction,
        clear?: (func: VoidFunction) => void,
    }
    interface IPopupTitleComponentProps {
        text: string,
        icon?: IComponentIconInfo,
    }
}
export { };

declare global {
    interface IComponentIconInfo {
        type: 'image' | 'fa',
        value: string,
    }
    interface IInputComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
        className?: string,
        required?: boolean,
        icon?: string,
        label: string,
        onValueChange?: (value: string) => void,
        error?: string,
        initValue?: string | number,
    }
    interface IPopupTitleComponentProps {
        text: string,
        icon?: IComponentIconInfo,
    }
}
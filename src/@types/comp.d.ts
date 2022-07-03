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
    }
    interface IPopupTitleComponentProps {
        text: string,
        icon?: IComponentIconInfo,
    }
}
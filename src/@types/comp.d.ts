export { };

declare global {
    interface IInputComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
        className?: string,
        icon?: string,
        label: string,
    }
}
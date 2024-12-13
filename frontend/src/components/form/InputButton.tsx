import styles from './InputButton.module.css';

interface PropsInputButton {
    type: 'button' | 'submit';
    value:string;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export default function InputButton({className, ...rest}: PropsInputButton ) {
    const combinedClassName = className ? `${styles.button} ${className}` : `${styles.button}`;

    return <input className={combinedClassName}{...rest}/>
}
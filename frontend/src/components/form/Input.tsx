import styles from './Input.module.css';

interface PropsInput {
    type:string;
    name: string;
    placeholder?:string;
    value:string;
    disabled?: boolean;
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({className, ...rest}: PropsInput) {
    const combinedClassName = className ?  `${className} ${styles.input}` : `${styles.input}`;

    return <input className={combinedClassName} {...rest}/>
}
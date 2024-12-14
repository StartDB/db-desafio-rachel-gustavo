import styles from './Input.module.css';

interface PropsInput {
    type:string;
    name: string;
    placeholder?:string;
    value:string;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({...rest}: PropsInput) {
    return <input className={styles.input} {...rest}/>
}
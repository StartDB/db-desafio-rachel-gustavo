import styles from './InputButton.module.css';

interface PropsInputButton {
    type: 'button' | 'submit';
    value:string;
    className?: string;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export default function InputButton({className, ...rest}: PropsInputButton ) {
    const combinedClassName = className ?  `${className} ${styles.btn}` : `${styles.button}`;

    return <input className={combinedClassName}{...rest}/>
}
import styles from './InputButton.module.css';

interface PropsInputButton {
    type: 'button' | 'submit';
    value:string;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

export default function InputButton({...rest}: PropsInputButton ) {
    return <input className={styles.button}{...rest}/>
}
import styles from './Label.module.css';

interface propsLabel {
    content: string;
}

export default function Label({content}: propsLabel){
    return <label htmlFor="" className={styles.title}>{content}</label>
}
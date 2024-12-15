import styles from './Legend.module.css';

interface propsLegend {
    content: string;
}

export default function Lagend({content}: propsLegend){
    return <legend className={styles.title}>{content}</legend>
}
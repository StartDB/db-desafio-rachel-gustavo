import styles from './MainTitle.module.css';

interface propsMainTitle {
    content: string;
    className?: string;
}

export default function MainTitle({className , content }: propsMainTitle){
    const combinedClassName = className ? `${styles.mainTitle} ${className}` : `${styles.mainTitle}`;

    return <h1 className={combinedClassName}>{content}</h1>
}
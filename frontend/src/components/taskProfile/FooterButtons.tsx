import { useNavigate } from 'react-router';
import styles from './TaskProfile.module.css';

interface FooterDefaultDefaultProps {
    isCompleteButtonVisible: boolean
    isFooterVisible: boolean 
    isDefautlButtonVisible: boolean
    contentDefaultButton: string
    onDefaultButtonClick?: () => void; 
    onCompleteButtonClick?: () => void;
}

export default function FooterButtons({isCompleteButtonVisible, isFooterVisible, isDefautlButtonVisible, contentDefaultButton, onDefaultButtonClick, onCompleteButtonClick}: FooterDefaultDefaultProps) {
    const navigate = useNavigate()

    function returnPreviousPage(e: React.MouseEvent<HTMLAnchorElement>): void {
        e.preventDefault()
        navigate(-1)
    }

    return (
        <footer className={styles.containerFooter} style={ {visibility:  isFooterVisible ? "visible" : "hidden" }}>
            <a className={`navigationLink ${styles.linkReturn}`} href="#" onClick={returnPreviousPage}>Voltar</a>

            <button
                className={styles.buttonMain}
                style={ {visibility:  isCompleteButtonVisible ? "visible" : "hidden" }}
                onClick={onCompleteButtonClick ? onCompleteButtonClick : undefined}>
                Concluir
            </button>

            <button
                className={styles.buttonMain}
                style={{ visibility: isDefautlButtonVisible ? "visible" : "hidden" }}
                onClick={onDefaultButtonClick ? onDefaultButtonClick : undefined}>
                {contentDefaultButton}
            </button>
        </footer>
    )
}
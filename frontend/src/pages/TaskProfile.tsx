import { useNavigate } from "react-router";
import MainTitle from "../components/MainTitle";
import styles from './TaskProfile.module.css';

export default function TaskProfile() {
    const navigate = useNavigate();

    function returnPreviousPage(e: React.MouseEvent<HTMLAnchorElement>): void{
        e.preventDefault()
        navigate(-1)
    }

    return (
        <main className={styles.containerBackgroundMain}>
            <section className="container-section-base">
                <MainTitle content="Página da Tarefa" />
                <a href="#" onClick={returnPreviousPage}>Voltar</a>
            </section>
        </main>
    )
}
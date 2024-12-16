import MainTitle from "../components/MainTitle";
import styles from './TaskProfile.module.css';

export default function TaskProfile() {
    
    return (
        <main className={styles.containerBackgroundMain}>
            <section className="container-section-base container-section-dashboard">
                <MainTitle content="Página da Tarefa" />
            </section>
        </main>
    )
}
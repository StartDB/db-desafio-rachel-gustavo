import MainTitle from "../components/MainTitle";
import styles from './TaskProfile.module.css';

export default function TaskProfile() {
    
    return (
        <main className={`${styles.containerTaskProfile} container-section-initial`}>
            <section className="container-section-initial">
                <MainTitle content="Página da Tarefa" />
            </section>
        </main>
    )
}
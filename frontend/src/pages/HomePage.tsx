import styles from './HomePage.module.css';

export default function HomePage() {
    return (
        <>
            <div className={styles.containerHomePage}>
                <section className={styles.containerTitleHomePage}>
                    <div>
                        <h1>Cuidar Mais</h1>
                        <p>Um espaço onde ajuda e companhia se encontram.</p>
                    </div>
                </section>
                <section id="sobre" className={styles.containerAboutUsHomePage}>
                    <h2>Sobre nós</h2>

                    <div>
                        <p>No Cuidar Mais, acreditamos na força da conexão humana para superar a solidão e os desafios enfrentados por muitos idosos. Nossa plataforma foi criada para unir quem precisa de ajuda com quem está disposto a oferecer apoio, promovendo interações enriquecedoras e transformadoras entre gerações</p>

                        <p>Nosso objetivo é simplificar o encontro entre idosos e voluntários, criando uma rede de solidariedade onde cada interação conta. Aqui, valorizamos o cuidado mútuo, a troca de experiências e o poder do companheirismo para construir uma sociedade mais acolhedora e inclusiva.</p>
                    </div>
                </section>
                <section id="como-funciona" className={styles.containerHowWorksHomePage}>
                    <h2>Como funciona?</h2>
                    <div>
                        <h3 className={styles.subTitleHowWorksHomePage}>Voluntário</h3>
                        <p>Após o cadastro, você poderá visualizar as tarefas criadas por idosos que precisam de ajuda, como ensinar tecnologia ou oferecer companhia.</p>

                        <p>Quando encontrar uma tarefa que te interesse, basta aceitá-la e você terá acesso ao telefone e e-mail do idoso para entrar em contato.</p>
                    </div>
                    <div>
                        <h3 className={styles.subTitleHowWorksHomePage}>Idoso</h3>

                        <p>Ao se cadastrar, você pode criar tarefas indicando o tipo de ajuda que precisa, como auxílio nas compras ou apoio para exercícios leves.</p>

                        <p>Após registrar sua tarefa, você poderá aguardar que um voluntário aceite e entre em contato com você para combinar os detalhes.</p>

                        <p>Nossa plataforma também garante que você tenha acesso às informações de contato do voluntário, como telefone e e-mail.</p>
                    </div>
                </section>
            </div>
        </>
    )
}
import styles from './Section.module.scss'

type Props = {
  id: string
  title: string
  children?: React.ReactNode
}

export default function Section({ id, title, children }: Props) {
  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className="container">
        <h2 id={`${id}-title`} className={styles.heading}>{title}</h2>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </section>
  )
}

import styles from './MapEmbed.module.scss'

type Props = {
  src: string
  title: string
}

export default function MapEmbed({ src, title }: Props) {
  return (
    <div className={styles.wrap}>
      <iframe
        className={styles.map}
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
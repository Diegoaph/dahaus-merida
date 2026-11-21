import styles from './OpeningBadge.module.scss'
import { useOpenNow, type Schedule } from '../../hooks/useOpenNow'

type Props = {
  schedule: Schedule
}

export function OpeningBadge({ schedule }: Props) {
  const status = useOpenNow(schedule)

  return (
    <span className={styles.badge} role="status">
      <span className={`${styles.dot} ${status.openNow ? styles.dotOn : ''}`} aria-hidden="true" />
      {status.label}
    </span>
  )
}
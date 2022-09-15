import styles from './section-cards.module.css'
import Card from './card'
import Link from 'next/link'

const SectionCards = (props) => {

  const { title, videos = [], size } = props

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, id) => {
          console.log('this vid!!!!!!', video.id.videoId)
          return <Link key={id} href={`/video/${video.id.videoId}`}><a><Card key={id} imgUrl={video.snippet.thumbnails.high.url} size={size} /></a></Link>
        }) }
       
      </div>
    </section>
  )
}

export default SectionCards
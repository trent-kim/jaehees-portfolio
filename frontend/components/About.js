import Link from 'next/link'
import groq from 'groq'
import client from '../client'
import {PortableText} from '@portabletext/react'
import styles from '@/styles/About.module.css'

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit('max').auto('format')}
        />
      )
    }
  }
}



const About = ({about}) => {
  console.log(about)

  const {intro, bio} = about

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.label}></div>
      </div>
      <div className={styles.info}>
      
        <PortableText
          value={intro}
          components={ptComponents}
        />
        <PortableText
          value={bio}
          components={ptComponents}
        />
      
        <button>More Info</button>
      </div>
    </div>
  )
}
  
export default About
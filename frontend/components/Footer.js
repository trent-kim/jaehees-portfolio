import Link from 'next/link'
import styles from '@/styles/Footer.module.css'

const Footer = () => {


    return (
        <div className={styles.container}>
            <div className={styles.footer}>
                <div className={styles.info}>
                    <div className={styles.field}>
                        <div className={styles.label}>Site by</div>
                        <p className={styles.h1}>
                        <Link
                            target="_blank"
                            rel="noreferrer"
                            href="https://trentkim.com/"
                    
                        >
                            Trent Kim
                        </Link>
                        </p>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.field}>
                        <div className={styles.label}>&#169;</div>
                        <p className={styles.h1}>
                            Jaehee Cheong 2023
                        </p>
                    </div>
                </div>
            </div>
            
            <div className={styles.footer}>
                <div className={styles.info}>
                    <div className={styles.field}>
                        <div className={styles.label}>Contact</div>
                        <p className={styles.h1}>
                        <Link
                            target="_blank"
                            rel="noreferrer"
                            href="mailto:jaehee9948@gmail.com"
                        >
                        Email
                        </Link>
                        <br></br>
                        <Link
                            target="_blank"
                            rel="noreferrer"
                            href="https://vimeo.com/jaeheecheong"
                        >
                        Vimeo
                        </Link>
                        <br></br>
                        <Link
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.instagram.com/jhee_c218/?hl=en"
                        >
                        Instagram
                        </Link>
                        </p>
                    </div>
                </div>
            </div>
                
                {/* <Link
                target="_blank"
                rel="noreferrer"
                href="mailto:jaehee9948@gmail.com"
                
                >
                <button>Email</button>
                </Link>
                
                <Link
                target="_blank"
                rel="noreferrer"
                href="https://vimeo.com/jaeheecheong"
               
                >
                <button>Vimeo</button>
                </Link>
                <Link
                target="_blank"
                rel="noreferrer"
                href="https://www.instagram.com/jhee_c218/?hl=en"
                
                >
                <button>Instagram</button>
                </Link>
                <Link
                target="_blank"
                rel="noreferrer"
                href="https://drive.google.com/file/d/1M6iXqoMSbGpA1R7Jx2zqJcReLVLjqczc/view?usp=share_link"
                
                >
                <button>Resume</button>
                </Link> */}

       
        </div>

    )
}

export default Footer
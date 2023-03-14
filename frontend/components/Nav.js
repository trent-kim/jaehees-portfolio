import React, { useState } from 'react';
import Link from 'next/link'
import styles from '@/styles/Nav.module.css'

const Nav = () => {
    const [isHover, setIsHover] = useState(false);


    return (
        <nav>
            <div 
            className={styles.logo}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            >
                <Link href="/">
                <div className={styles.jCircle} style={{ transform: `rotate(${isHover ? "45" : "405"}deg)` }}></div>
               <div className={styles.cCircle} style={{ transform: `rotate(${isHover ? "0" : "-360"}deg)` }}></div>
               </Link>
            </div>
            <div className={styles.links}>
                
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
       
        </nav>

    )
}

export default Nav
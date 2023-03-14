import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import Link from 'next/link';
import { Archivo } from 'next/font/google'
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import BackToTopButton from "../components/BackToTopButton";


const archivo = Archivo({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'] 
})

export const siteTitle = 'Jaehee Cheong';

export default function Layout({ children, home}) {
    return (
        <div>
            <Head>

            </Head>
            <Nav></Nav>
            {!home && (
                <div className={styles.back}>
                    <Link href="/#projects"><button>Back</button></Link>
                </div>
                )
            }
            <main className={archivo.className}>
                
                {children}
            </main>
            <Footer></Footer>
            <BackToTopButton/>
        </div>
    )
  }
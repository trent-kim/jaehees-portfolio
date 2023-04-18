import Nav from "../components/Nav";
import Footer from "../components/Footer";
import BackToTopButton from "../components/BackToTopButton";

export default function Layout({ children, home, about }) {
  return (
    <div>
      <Nav home={home}></Nav>

      <main className="px-xs pt-xs">
        {children}
        <BackToTopButton />
      </main>
      <Footer about={about}></Footer>
    </div>
  );
}

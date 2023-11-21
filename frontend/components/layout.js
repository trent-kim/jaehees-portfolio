import Nav from "../components/Nav2";
import Footer from "../components/Footer2";
import BackToTopButton from "../components/BackToTopButton";

export default function Layout({ children, home, about, page, setPage }) {
  return (
    <main className="">
      <Nav home={home} page={page} setPage={setPage}></Nav>

        {children}
        {/* <BackToTopButton /> */}
      <Footer about={about}></Footer>
    </main>
  );
}

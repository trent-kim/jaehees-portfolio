import Nav from "../components/Nav2";
import Footer from "../components/Footer2";

export default function Layout({ children, home, about, page, setPage }) {
  return (
    <main className="">
      <Nav home={home} page={page} setPage={setPage}></Nav>
      {children}
      <Footer about={about}></Footer>
    </main>
  );
}

import Header from "./Header";
import NavbarL from "./NavbarL";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div class="container-scroller">
      <Header />
      <div class="container-fluid page-body-wrapper">
        <NavbarL />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

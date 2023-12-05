
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container-fluid">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;

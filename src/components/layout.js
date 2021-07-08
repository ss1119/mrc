import Footer from "../components/footer";

function Layout({ children }) {
  return (
    <div className="min-w-full">
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

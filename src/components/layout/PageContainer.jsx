import Navbar from './Navbar';
import Footer from './Footer';

const PageContainer = ({ children, showNavbar = true, showFooter = true, className = '' }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      
      <main className={`flex-grow ${className}`}>
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default PageContainer;
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>AgriNode</h3>
          <p>Empowering farmers with real-time market intelligence.</p>
        </div>
        
        <div className="footer-links">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#main">Home</a></li>
            <li><a href="#Second-Section">Live Updates</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: kuldeeppatel2052007@gmail.com</p>
          <div className="social-icons">
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-linkedin"></i>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 AgriNode. Data provided by OGD India.</p>
      </div>
    </footer>
  );
}

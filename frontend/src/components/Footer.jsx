const Footer = () => {
  return (
    <footer className="footer-grid">
      <div className="footer-content">
        <div className="projeto">
          <img src="/images/logo-memory-test.png" alt="memory test logo" />
          <a href="https://github.com/LuizGustavoSalvador/memory-test-react" rel='noreferrer' target="_blank">Acesse o projeto Memory Test</a>
        </div>
        <div className="devers">
          <h3>Desenvolvido por</h3>
          <a href="https://github.com/LuizGustavoSalvador" rel='noreferrer' target="_blank">
            <img src="/images/github-logo.png" alt="github logo" />
            <p>Luiz Gustavo Fontanela Salvador</p>
          </a>
          <a href="https://github.com/GabrielMazzorana" rel='noreferrer' target="_blank">
            <img src="/images/github-logo.png" alt="github logo" />
            <p>Gabriel Silveira</p>
          </a>
        </div>
      </div>
      <div className="subfooter">
        <span className="copyright">©Memory Test. Todos os direitos Reservados.</span>
      </div>
    </footer>
  );
};

export default Footer;

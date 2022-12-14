import React from 'react';
import VercelLogo from '../../../static/vercel.svg';
// import styles from '../../styles/Home.module.css';

function Footer() {
  return (
    <footer>
      {/* <footer className={styles.footer}> */}
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span>
          <img src={VercelLogo} alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </footer>
  );
}
export default Footer;

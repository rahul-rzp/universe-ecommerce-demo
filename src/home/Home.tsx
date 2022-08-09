import React, { useState } from 'react';
import loadable from '@loadable/component';
import errorService from '@razorpay/universe-cli/errorService';
import YusKid from '../../static/yus-kid.png';
import Logo from '../../static/razorpay-logo.svg';

// This will create a separate JS bundle
const SampleComponent = loadable(() => import('./SampleComponent'));

const Home = (): JSX.Element => {
  const [count, setCount] = useState(0);
  const [crashState, setCrashState] = useState<null | { text: string }>({
    text: 'Crash the UI',
  });

  return (
    <main>
      <h1>Home</h1>
      <p>Cool kids in the town</p>
      <img src={Logo} height="100px" alt="RZP Logo" />
      <img src={YusKid} height="100px" alt="Yusss Kid" />
      <br />
      <button onClick={(): void => setCount((prevCount) => prevCount + 1)}>GG {count}</button>
      <button onClick={(): void => setCrashState(null)}>
        {
          //@ts-expect-error - Error created intentionally
          crashState.text
        }
      </button>
      <button onClick={(): void => errorService.captureError('Testing errors')}>
        Capture an error
      </button>
      <SampleComponent />
    </main>
  );
};

export default Home;

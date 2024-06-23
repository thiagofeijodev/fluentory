import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles, Button } from '@fluentui/react-components';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Login = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const onClick = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);

        setErrorMessage(errorMessage);
      });
  };

  const onClickFacebookLogin = () => {
    const provider = new FacebookAuthProvider();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);

        setErrorMessage(errorMessage);
      });
  };

  return (
    <div className={styles.root}>
      <Button onClick={onClick}>Google</Button>
      <Button onClick={onClickFacebookLogin}>Facebook</Button>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Login;

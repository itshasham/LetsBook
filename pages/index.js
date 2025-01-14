import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/Navbar_function/Home');
  }, [router]);

  return null;
};

export default Home;

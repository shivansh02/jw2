'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-jwt', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const { token } = await response.json();
        // cookie expires in 1 hr
        Cookies.set('jwt_token', token, { expires: 1/24 });
        router.push('/protected');
      } else {
        console.error('Failed to generate token');
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Log in'}
      </button>
    </div>
  );
}
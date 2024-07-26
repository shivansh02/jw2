'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface ProtectedData {
  message: string;
}

export default function ProtectedPage() {
  const [data, setData] = useState<ProtectedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = Cookies.get('jwt_token');
      
      if (!token) {
        setError('No JWT found. Redirecting to login page...');
        setTimeout(() => {
            window.location.href = '/login';
            }, 2000);
        return;
      }

      try {
        const response = await fetch('/api/protected', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            const result: ProtectedData = await response.json();
            setData(result);
          } else {
            // Handle text response
            const text = await response.text();
            setData({ message: text });
          }
        } else {
          const errorText = await response.text();
          setError(`Failed to fetch protected data: ${errorText}`);
        }
      } catch (error) {
        setError(`Error fetching protected data: ${error instanceof Error ? error.message : String(error)}`);
      }
    };

    fetchProtectedData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>This is a protected page. Response from protected API:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
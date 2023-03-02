import Form from '@/components/Form';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div>
      <Form />
    </div>
  );
}

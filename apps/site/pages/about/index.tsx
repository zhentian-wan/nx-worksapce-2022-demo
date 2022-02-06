import { GetStaticProps } from 'next';
import './index.module.css';

/* eslint-disable-next-line */
export interface AboutProps {
  name: string;
}

export function About({ name }: AboutProps) {
  return (
    <div>
      <h1>Welcome to {name}!</h1>
    </div>
  );
}

export const getStaticProps: GetStaticProps<AboutProps> = async (context) => {
  return {
    props: {
      name: 'ZTW',
    },
  };
};

export default About;

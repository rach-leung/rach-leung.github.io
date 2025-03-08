import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const GradientHeading = ({ children, size = '3rem' }) => (
    <h1 style={{
        marginTop: '0',
        background: 'linear-gradient(270deg,rgba(141, 255, 194, 0.85),rgba(132, 255, 220, 0.82),#46f0ff,rgb(113, 139, 255),rgba(213, 123, 255, 0.83),rgb(255, 138, 237),rgb(255, 182, 113))',
        backgroundSize: '150% 150%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'gradientAnimation 5s infinite',
        fontSize: size,
    }}>
        {children}
    </h1>
);

const socialLinks = [
  { href: 'https://github.com/rach-leung', src: '/icons/github.svg', alt: 'GitHub', color: '#9f9f9f', size: '53px' },
  { href: 'https://www.linkedin.com/in/leung-rachel/', src: '/icons/linkedin.svg', alt: 'LinkedIn', color: '#0077b5', size: '55px' },
  { href: '/resume.pdf', src: '/icons/resume.svg', alt: 'Resume', color: '#f39c12', size: '43px' },
  { href: 'mailto:rachelswleung@gmail.com', src: '/icons/mail.svg', alt: 'Email', color: '#e74c3c', size: '44px' }
];

const SocialLinks = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
    {socialLinks.map(({ href, src, alt, color, size }) => (
      <a
        key={alt}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          transition: 'transform 0.3s ease',
          display: 'inline-block'
        }}
      >
        <div
          style={{
            width: size,
            height: size,
            maskImage: `url(${src})`,
            WebkitMaskImage: `url(${src})`,
            maskRepeat: 'no-repeat',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            backgroundColor: 'white',
            transition: 'background-color 0.3s ease, transform 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = color;
            e.currentTarget.style.transform = 'scale(1.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
      </a>
    ))}
  </div>
);

const Home = () => (
  <section
        id="home"
  >
   <div style={{
        marginTop: '-100px',
        alignItems: 'center',
        display: 'flex',
        maxWidth: '1200px', 
        width: '100%', 
        height: '100vh',
        gap: '50px', 
        }}
    >
      <div style={{ flex: 2, textAlign: 'left', fontSize: '3rem', marginTop: '60px' }}>
        <h3 style={{marginBottom: '0', fontSize: '3rem'}}>Hi! I'm</h3>
        <GradientHeading size='6rem'>Rachel Leung</GradientHeading>
        <p style={{ fontSize: '2rem' }}>Welcome to my space!</p>
        <SocialLinks />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Canvas style={{ width: '100%', height: '500px' }} camera={{ position: [0, 0, 8], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          
          <Model />
        </Canvas>
      </div>
    </div>
    <style>
      {`
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}
    </style>
  </section>
);

const Model = () => {
  const { scene } = useGLTF('/models/cute_alien_character.glb');
  const modelRef = useRef();

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;

      if (modelRef.current) {
        modelRef.current.rotation.y = x * Math.PI * 0.1;
        modelRef.current.rotation.x = y * Math.PI * 0.1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <primitive object={scene} ref={modelRef} scale={[5, 5, 5]} />;
};

export default Home;
export { GradientHeading };

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const StarfieldBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });

    const stars = Array.from({ length: 6500 }, () => (
      [(Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000]
    )).flat();

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(stars, 3));
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    const animate = () => {
      
      requestAnimationFrame(animate);
      
      // starField.rotation.x += 0.0015;
      starField.rotation.y += 0.0015;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}></div>;
};

export default StarfieldBackground;

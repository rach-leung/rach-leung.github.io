import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SkyBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Gradient Sky
    const skyGeometry = new THREE.SphereGeometry(500, 32, 32);
    const skyMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        void main() {
          float gradient = smoothstep(-1.0, 1.0, vPosition.y / 500.0);
          gl_FragColor = vec4(mix(vec3(0.6, 0.8, 1.0), vec3(0.2, 0.5, 1.0), gradient), 1.0);
        }
      `,
      side: THREE.BackSide
    });

    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);

    // Fluffy Clouds
    const textureLoader = new THREE.TextureLoader();
    const cloudTexture = textureLoader.load('cloud.png');

    const clouds = [];
    for (let i = 0; i < 10; i++) {
      const cloudGeometry = new THREE.PlaneGeometry(100, 50);
      const cloudMaterial = new THREE.MeshLambertMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
      cloud.position.set(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.2) * 300,
        (Math.random() - 0.5) * 1000
      );
      scene.add(cloud);
      clouds.push(cloud);
    }

    // Sun
    const sunGeometry = new THREE.SphereGeometry(50, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffdd44 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(400, 200, -100);
    scene.add(sun);

    const light = new THREE.PointLight(0xffffff, 1.5);
    light.position.copy(sun.position);
    scene.add(light);

    camera.position.z = 50;

    const animate = () => {
      requestAnimationFrame(animate);

      clouds.forEach(cloud => {
        cloud.position.x += 0.05;
        if (cloud.position.x > 500) cloud.position.x = -500;
      });

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

export default SkyBackground;

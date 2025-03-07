import { useEffect, useRef, useState } from 'react';
import { GradientHeading } from "./Home";
import * as THREE from 'three';
import emailjs from 'emailjs-com';

const Contact = () => {
    const canvasRef = useRef(null);
    const [isSent, setIsSent] = useState(false);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 1000);
    
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    
        const geometry = new THREE.TorusKnotGeometry(13, 6, 100, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true });
        const torusKnot = new THREE.Mesh(geometry, material);
        scene.add(torusKnot);
    
        torusKnot.position.set(0, 3, 0);
        camera.position.z = 50;
    
        const animate = function () {
            requestAnimationFrame(animate);
            torusKnot.rotation.x += 0.01;
            torusKnot.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();
    
        window.addEventListener('resize', () => {
            renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
            camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
            camera.updateProjectionMatrix();
        });
    
        return () => {
            window.removeEventListener('resize', () => {});
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        try {
            await emailjs.sendForm(
                'service_s7s4v6k',
                'template_n8x3yhr',
                form,
                '20-Z3iTTdu8tVAYjP'
            );

            setIsSent(true);
            form.reset();
            setTimeout(() => setIsSent(false), 5000);
        } catch (error) {
            console.error('Failed to send message:', error);
            alert('Oops! Something went wrong. Please try again.');
            // alert(`Oops! Something went wrong: ${error.text}`);
        }
    };

    return (
        <section 
            id="contact" 
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
                position: 'relative',
                minHeight: '100vh',
                width: '100%',
            }}
        >
            <div style={{
                flex: 1,
                maxWidth: '700px',
                zIndex: 2,
            }}>
                <GradientHeading size='4rem'>Contact Me</GradientHeading>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                        borderRadius: '8px',
                        backgroundColor: 'dark grey',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="name" style={{ marginBottom: '10px', fontSize: '1.2rem' }}>
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Enter your name"
                        style={{
                            padding: '10px',
                            marginBottom: '20px',
                            fontSize: '1rem',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />

                    <label htmlFor="email" style={{ marginBottom: '10px', fontSize: '1.2rem' }}>
                        Your Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        style={{
                            padding: '10px',
                            marginBottom: '20px',
                            fontSize: '1rem',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />

                    <label htmlFor="message" style={{ marginBottom: '10px', fontSize: '1.2rem' }}>
                        Your Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        placeholder="Write your message here"
                        rows="6"
                        style={{
                            padding: '10px',
                            marginBottom: '20px',
                            fontSize: '1rem',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            resize: 'none',
                            fontFamily: 'arial',
                        }}
                    ></textarea>

                    <button
                        type="submit"
                        style={{
                            padding: '12px',
                            backgroundColor: '#333',
                            color: 'white',
                            fontSize: '1rem',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#333'}
                    >
                        Send Message
                    </button>

                    {isSent && (
                        <p style={{ color: 'white', marginTop: '10px' }}>
                            Message received! I will get back to you shortly.
                        </p>
                    )}
                </form>
            </div>

            <div style={{ 
                flex: 1,
                height: '50vh',
                width: '40%',
            }}>
                <canvas
                    ref={canvasRef}
                    style={{
                        width: '200%',
                        height: '150%',
                    }}
                ></canvas>
            </div>
        </section>
    );
};

export default Contact;

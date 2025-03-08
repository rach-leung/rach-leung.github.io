import { GradientHeading } from "./Home";

const About = () => 
    <section 
        id="about" 
        style={{ 
            padding: '100px 0',
            display: 'flex',
            flexDirection: 'column',
        }}
        >
        <div className="about-wrapper"         
            style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '50px'
            }}
        >
            <div className="about-text" style={{ minWidth: '60%', fontSize: '1.2rem' }}>
                <GradientHeading size='4rem' margin='0 0'>About Me</GradientHeading>
                <p>
                    Hello! I'm Rachel and a final year Computer Science and Commerce student at UNSW.
                    I'm passionate about web development, design, and user experiences. 
                </p>
                <p>
                    <b>Languages:</b> Python, C, Java, JavaScript, HTML/CSS, Typescript
                </p>
                <p>
                    <b>Frameworks:</b> React, NodeJS, Flask
                </p>
                <p>
                    <b>Tools & Technologies:</b> Docker, MongoDB, RESTful APIs, CI/CD Pipelines
                </p>
                <p>
                    When I'm not coding, you can find me climbing, working on my car, and making videos! 
                    I enjoy exploring new technologies and learning and sharing knowledge through workshops.
                </p>
            </div>
            <div
                className="about-photo" 
                style={{
                    minWidth: '350px',
                    height: '350px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '5px solid #000',
                    backgroundImage: 'url(/photo-of-me.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    marginTop: '70px',
                }}
            ></div>

        </div>
    </section>;

export default About;

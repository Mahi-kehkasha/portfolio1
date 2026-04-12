import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SceneManager = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0B0B1A);
    scene.fog = new THREE.Fog(0x0B0B1A, 10, 100);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const purpleLight1 = new THREE.PointLight(0x6C4DF6, 2, 50);
    purpleLight1.position.set(-10, 10, -10);
    scene.add(purpleLight1);

    const purpleLight2 = new THREE.PointLight(0x9D7BFF, 2, 50);
    purpleLight2.position.set(10, -10, -10);
    scene.add(purpleLight2);

    const pinkLight = new THREE.PointLight(0xC6B6FF, 1.5, 50);
    pinkLight.position.set(0, 0, -20);
    scene.add(pinkLight);

    // SCENE 1: HERO - Floating 3D Elements
    const createHeroScene = () => {
      const heroGroup = new THREE.Group();
      heroGroup.position.z = -15;

      // Create floating panels
      const panelGeometry = new THREE.BoxGeometry(3, 2, 0.1);
      const panelMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x6C4DF6,
        metalness: 0.3,
        roughness: 0.2,
        transparent: true,
        opacity: 0.6,
        transmission: 0.5,
        emissive: 0x6C4DF6,
        emissiveIntensity: 0.2
      });

      for (let i = 0; i < 5; i++) {
        const panel = new THREE.Mesh(panelGeometry, panelMaterial.clone());
        panel.position.set(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        );
        panel.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        heroGroup.add(panel);

        // Animate panels
        gsap.to(panel.rotation, {
          y: panel.rotation.y + Math.PI * 2,
          duration: 20 + Math.random() * 10,
          repeat: -1,
          ease: 'none'
        });

        gsap.to(panel.position, {
          y: panel.position.y + (Math.random() - 0.5) * 2,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // Central wireframe sphere
      const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x9D7BFF,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      const centralSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      centralSphere.position.set(0, 0, -5);
      heroGroup.add(centralSphere);

      gsap.to(centralSphere.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

      scene.add(heroGroup);
      return heroGroup;
    };

    // SCENE 2: SERVICES - 3D Service Objects
    const createServicesScene = () => {
      const servicesGroup = new THREE.Group();
      servicesGroup.position.z = -35;

      const serviceShapes = [
        { geometry: new THREE.BoxGeometry(2, 2, 2), color: 0x6C4DF6 },
        { geometry: new THREE.ConeGeometry(1, 2, 4), color: 0x9D7BFF },
        { geometry: new THREE.SphereGeometry(1, 32, 32), color: 0xC6B6FF },
        { geometry: new THREE.TorusGeometry(1, 0.4, 16, 100), color: 0x6C4DF6 },
        { geometry: new THREE.OctahedronGeometry(1.2), color: 0x9D7BFF },
        { geometry: new THREE.CylinderGeometry(0.8, 0.8, 2, 32), color: 0xC6B6FF }
      ];

      const radius = 5;
      serviceShapes.forEach((shape, index) => {
        const angle = (index / serviceShapes.length) * Math.PI * 2;
        const material = new THREE.MeshPhysicalMaterial({
          color: shape.color,
          metalness: 0.5,
          roughness: 0.1,
          transparent: true,
          opacity: 0.8,
          emissive: shape.color,
          emissiveIntensity: 0.3
        });

        const mesh = new THREE.Mesh(shape.geometry, material);
        mesh.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.5,
          0
        );

        servicesGroup.add(mesh);

        // Floating animation
        gsap.to(mesh.position, {
          y: mesh.position.y + 0.5,
          duration: 2 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });

        gsap.to(mesh.rotation, {
          x: Math.PI * 2,
          y: Math.PI * 2,
          duration: 10 + index * 2,
          repeat: -1,
          ease: 'none'
        });
      });

      scene.add(servicesGroup);
      return servicesGroup;
    };

    // SCENE 3: PROJECTS - Curved Gallery
    const createProjectsScene = () => {
      const projectsGroup = new THREE.Group();
      projectsGroup.position.z = -55;

      const projectColors = [0x6C4DF6, 0x9D7BFF, 0xC6B6FF, 0x6C4DF6];
      const curveRadius = 8;

      projectColors.forEach((color, index) => {
        const angle = (index / projectColors.length) * Math.PI * 1.5 - Math.PI * 0.75;
        
        // Project screen
        const screenGeometry = new THREE.PlaneGeometry(3, 2);
        const screenMaterial = new THREE.MeshPhysicalMaterial({
          color: color,
          metalness: 0.3,
          roughness: 0.2,
          emissive: color,
          emissiveIntensity: 0.2,
          transparent: true,
          opacity: 0.9
        });

        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(
          Math.sin(angle) * curveRadius,
          0,
          Math.cos(angle) * curveRadius
        );
        screen.rotation.y = -angle;

        projectsGroup.add(screen);

        // Glow effect
        gsap.to(screenMaterial, {
          emissiveIntensity: 0.5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });

      scene.add(projectsGroup);
      return projectsGroup;
    };

    // SCENE 4: SKILLS - Orbit System
    const createSkillsScene = () => {
      const skillsGroup = new THREE.Group();
      skillsGroup.position.z = -75;

      // Center sphere
      const centerGeometry = new THREE.SphereGeometry(1.5, 32, 32);
      const centerMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x6C4DF6,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x6C4DF6,
        emissiveIntensity: 0.5
      });
      const centerSphere = new THREE.Mesh(centerGeometry, centerMaterial);
      skillsGroup.add(centerSphere);

      // Orbiting skills
      const orbitRadius = 4;
      const skillCount = 8;
      const skillsOrbitGroup = new THREE.Group();

      for (let i = 0; i < skillCount; i++) {
        const angle = (i / skillCount) * Math.PI * 2;
        const skillGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const skillMaterial = new THREE.MeshPhysicalMaterial({
          color: i % 2 === 0 ? 0x9D7BFF : 0xC6B6FF,
          metalness: 0.5,
          roughness: 0.3,
          emissive: i % 2 === 0 ? 0x9D7BFF : 0xC6B6FF,
          emissiveIntensity: 0.4
        });

        const skillSphere = new THREE.Mesh(skillGeometry, skillMaterial);
        skillSphere.position.set(
          Math.cos(angle) * orbitRadius,
          Math.sin(angle) * orbitRadius,
          0
        );

        skillsOrbitGroup.add(skillSphere);
      }

      skillsGroup.add(skillsOrbitGroup);

      // Rotate orbit
      gsap.to(skillsOrbitGroup.rotation, {
        z: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

      scene.add(skillsGroup);
      return skillsGroup;
    };

    // SCENE 5: CONTACT - Floating Panel
    const createContactScene = () => {
      const contactGroup = new THREE.Group();
      contactGroup.position.z = -95;

      const panelGeometry = new THREE.BoxGeometry(6, 4, 0.2);
      const panelMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x6C4DF6,
        metalness: 0.2,
        roughness: 0.1,
        transparent: true,
        opacity: 0.3,
        transmission: 0.7,
        emissive: 0x6C4DF6,
        emissiveIntensity: 0.2
      });

      const panel = new THREE.Mesh(panelGeometry, panelMaterial);
      contactGroup.add(panel);

      // Floating animation
      gsap.to(panel.position, {
        y: 0.3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      scene.add(contactGroup);
      return contactGroup;
    };

    // Particle system
    const createParticles = () => {
      const particleCount = isMobile ? 500 : 2000;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100 - 50;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleMaterial = new THREE.PointsMaterial({
        color: 0x9D7BFF,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);

      return particleSystem;
    };

    // Create all scenes
    const hero = createHeroScene();
    const services = createServicesScene();
    const projects = createProjectsScene();
    const skills = createSkillsScene();
    const contact = createContactScene();
    const particles = createParticles();

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll-based camera movement
    const setupScrollAnimation = () => {
      // Animate camera position based on scroll
      gsap.to(camera.position, {
        z: -95,
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          onUpdate: (self) => {
            // Log for debugging
            if (self.progress % 0.1 < 0.01) {
              console.log('Scroll progress:', self.progress, 'Camera Z:', camera.position.z);
            }
          }
        }
      });
    };

    // Set scroll height for navigation
    document.body.style.height = '600vh'; // 6 sections
    setupScrollAnimation();

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Subtle camera movement based on mouse
      if (!isMobile) {
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;
      }

      camera.lookAt(new THREE.Vector3(0, 0, camera.position.z - 10));

      // Rotate particles slowly
      if (particles) {
        particles.rotation.y += 0.0005;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', checkMobile);
      if (animationId) cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default SceneManager;

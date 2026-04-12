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
  const objectsRef = useRef({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0B0B1A);
    scene.fog = new THREE.Fog(0x0B0B1A, 20, 100);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const purpleLight1 = new THREE.PointLight(0x6C4DF6, 3, 50);
    purpleLight1.position.set(-10, 10, 0);
    scene.add(purpleLight1);

    const purpleLight2 = new THREE.PointLight(0x9D7BFF, 3, 50);
    purpleLight2.position.set(10, -10, 0);
    scene.add(purpleLight2);

    const pinkLight = new THREE.PointLight(0xC6B6FF, 2, 50);
    pinkLight.position.set(0, 0, 10);
    scene.add(pinkLight);

    // Particle system
    const createParticles = () => {
      const particleCount = isMobile ? 500 : 2000;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 200;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleMaterial = new THREE.PointsMaterial({
        color: 0x9D7BFF,
        size: isMobile ? 0.08 : 0.05,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      return new THREE.Points(particles, particleMaterial);
    };

    const particles = createParticles();
    scene.add(particles);
    objectsRef.current.particles = particles;

    // SCENE 1: HERO - Floating wireframe elements
    const heroGroup = new THREE.Group();
    heroGroup.position.z = 0;

    // Central wireframe sphere
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x9D7BFF,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const centralSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    heroGroup.add(centralSphere);
    objectsRef.current.heroSphere = centralSphere;

    // Floating panels
    const panelGeometry = new THREE.BoxGeometry(3, 2, 0.1);
    const panels = [];
    for (let i = 0; i < 5; i++) {
      const panelMaterial = new THREE.MeshPhysicalMaterial({
        color: i % 2 === 0 ? 0x6C4DF6 : 0x9D7BFF,
        metalness: 0.3,
        roughness: 0.2,
        transparent: true,
        opacity: 0.4,
        emissive: i % 2 === 0 ? 0x6C4DF6 : 0x9D7BFF,
        emissiveIntensity: 0.2
      });
      const panel = new THREE.Mesh(panelGeometry, panelMaterial);
      panel.position.set(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5
      );
      panel.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      );
      heroGroup.add(panel);
      panels.push(panel);
    }

    scene.add(heroGroup);
    objectsRef.current.heroGroup = heroGroup;
    objectsRef.current.panels = panels;

    // SCENE 2: SERVICES - Geometric shapes in circle
    const servicesGroup = new THREE.Group();
    servicesGroup.position.z = -40;

    const serviceShapes = [
      { geometry: new THREE.BoxGeometry(2, 2, 2), color: 0x6C4DF6 },
      { geometry: new THREE.ConeGeometry(1, 2.5, 4), color: 0x9D7BFF },
      { geometry: new THREE.SphereGeometry(1.2, 32, 32), color: 0xC6B6FF },
      { geometry: new THREE.TorusGeometry(1, 0.4, 16, 100), color: 0x6C4DF6 },
      { geometry: new THREE.OctahedronGeometry(1.3), color: 0x9D7BFF },
      { geometry: new THREE.CylinderGeometry(0.9, 0.9, 2, 32), color: 0xC6B6FF }
    ];

    const serviceObjects = [];
    const radius = 6;
    serviceShapes.forEach((shape, index) => {
      const angle = (index / serviceShapes.length) * Math.PI * 2;
      const material = new THREE.MeshPhysicalMaterial({
        color: shape.color,
        metalness: 0.6,
        roughness: 0.2,
        emissive: shape.color,
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.9
      });

      const mesh = new THREE.Mesh(shape.geometry, material);
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.3,
        0
      );
      servicesGroup.add(mesh);
      serviceObjects.push(mesh);
    });

    scene.add(servicesGroup);
    objectsRef.current.servicesGroup = servicesGroup;
    objectsRef.current.serviceObjects = serviceObjects;

    // SCENE 3: PROJECTS - Curved screen gallery
    const projectsGroup = new THREE.Group();
    projectsGroup.position.z = -80;

    const projectScreens = [];
    const curveRadius = 10;
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 1.2 - Math.PI * 0.6;
      const screenGeometry = new THREE.PlaneGeometry(4, 3);
      const screenMaterial = new THREE.MeshPhysicalMaterial({
        color: [0x6C4DF6, 0x9D7BFF, 0xC6B6FF, 0x6C4DF6][i],
        metalness: 0.4,
        roughness: 0.1,
        emissive: [0x6C4DF6, 0x9D7BFF, 0xC6B6FF, 0x6C4DF6][i],
        emissiveIntensity: 0.3
      });

      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.set(
        Math.sin(angle) * curveRadius,
        (i % 2) * 2 - 1,
        Math.cos(angle) * curveRadius
      );
      screen.rotation.y = -angle;
      projectsGroup.add(screen);
      projectScreens.push(screen);
    }

    scene.add(projectsGroup);
    objectsRef.current.projectsGroup = projectsGroup;
    objectsRef.current.projectScreens = projectScreens;

    // SCENE 4: SKILLS - Orbital system
    const skillsGroup = new THREE.Group();
    skillsGroup.position.z = -120;

    const centerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0x6C4DF6,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x6C4DF6,
        emissiveIntensity: 0.6
      })
    );
    skillsGroup.add(centerSphere);

    const orbitGroup = new THREE.Group();
    const skillSpheres = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const skillSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 16, 16),
        new THREE.MeshPhysicalMaterial({
          color: i % 2 === 0 ? 0x9D7BFF : 0xC6B6FF,
          metalness: 0.6,
          roughness: 0.3,
          emissive: i % 2 === 0 ? 0x9D7BFF : 0xC6B6FF,
          emissiveIntensity: 0.5
        })
      );
      skillSphere.position.set(
        Math.cos(angle) * 5,
        Math.sin(angle) * 5,
        0
      );
      orbitGroup.add(skillSphere);
      skillSpheres.push(skillSphere);
    }
    skillsGroup.add(orbitGroup);

    scene.add(skillsGroup);
    objectsRef.current.skillsGroup = skillsGroup;
    objectsRef.current.orbitGroup = orbitGroup;
    objectsRef.current.skillSpheres = skillSpheres;

    // SCENE 5: CONTACT - Glass panel
    const contactGroup = new THREE.Group();
    contactGroup.position.z = -160;

    const contactPanel = new THREE.Mesh(
      new THREE.BoxGeometry(7, 5, 0.3),
      new THREE.MeshPhysicalMaterial({
        color: 0x6C4DF6,
        metalness: 0.1,
        roughness: 0.05,
        transparent: true,
        opacity: 0.2,
        transmission: 0.8,
        emissive: 0x6C4DF6,
        emissiveIntensity: 0.2
      })
    );
    contactGroup.add(contactPanel);

    scene.add(contactGroup);
    objectsRef.current.contactGroup = contactGroup;

    // Continuous animations
    const animateObjects = () => {
      // Hero sphere rotation
      if (objectsRef.current.heroSphere) {
        objectsRef.current.heroSphere.rotation.y += 0.002;
        objectsRef.current.heroSphere.rotation.x += 0.001;
      }

      // Panels floating
      if (objectsRef.current.panels) {
        objectsRef.current.panels.forEach((panel, i) => {
          panel.rotation.y += 0.003;
          panel.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
        });
      }

      // Service objects rotation
      if (objectsRef.current.serviceObjects) {
        objectsRef.current.serviceObjects.forEach((obj) => {
          obj.rotation.x += 0.005;
          obj.rotation.y += 0.005;
        });
      }

      // Skills orbit rotation
      if (objectsRef.current.orbitGroup) {
        objectsRef.current.orbitGroup.rotation.z += 0.005;
      }

      // Particles rotation
      if (objectsRef.current.particles) {
        objectsRef.current.particles.rotation.y += 0.0002;
      }
    };

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      if (isMobile) return;
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // CRITICAL: Scroll-based camera animation
    const sections = [
      { z: 10, label: 'hero' },
      { z: -20, label: 'about' },
      { z: -40, label: 'services' },
      { z: -80, label: 'projects' },
      { z: -120, label: 'skills' },
      { z: -160, label: 'contact' }
    ];

    // Create ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          console.log('Scroll progress:', self.progress.toFixed(2));
        }
      }
    });

    // Animate camera through all sections
    tl.to(camera.position, {
      z: -170,
      duration: 1,
      ease: 'none'
    });

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      animateObjects();

      // Subtle mouse parallax
      if (!isMobile) {
        camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.2 - camera.position.y) * 0.05;
      }

      camera.lookAt(0, 0, camera.position.z - 10);
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
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default SceneManager;

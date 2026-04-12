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
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
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
    scene.fog = new THREE.FogExp2(0x0B0B1A, 0.008); // Depth fog for atmosphere
    sceneRef.current = scene;

    // Camera with cinematic FOV
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 15);
    cameraRef.current = camera;

    // Renderer with higher quality
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // CINEMATIC LIGHTING SETUP
    const ambientLight = new THREE.AmbientLight(0x6C4DF6, 0.3);
    scene.add(ambientLight);

    // Key light - main purple spotlight
    const keyLight = new THREE.SpotLight(0x6C4DF6, 4, 100, Math.PI / 6, 0.5);
    keyLight.position.set(-15, 20, 10);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Fill light - softer pink
    const fillLight = new THREE.SpotLight(0xC6B6FF, 2, 80, Math.PI / 5, 0.3);
    fillLight.position.set(15, 10, 5);
    scene.add(fillLight);

    // Rim light - accent
    const rimLight = new THREE.PointLight(0x9D7BFF, 3, 50);
    rimLight.position.set(0, -10, -20);
    scene.add(rimLight);

    // Light beams effect
    const beamGeometry = new THREE.CylinderGeometry(0.1, 2, 30, 8, 1, true);
    const beamMaterial = new THREE.MeshBasicMaterial({
      color: 0x6C4DF6,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const lightBeam1 = new THREE.Mesh(beamGeometry, beamMaterial);
    lightBeam1.position.set(-10, 15, -20);
    lightBeam1.rotation.z = Math.PI / 6;
    scene.add(lightBeam1);
    objectsRef.current.lightBeam1 = lightBeam1;

    const lightBeam2 = lightBeam1.clone();
    lightBeam2.position.set(10, 15, -40);
    lightBeam2.rotation.z = -Math.PI / 6;
    scene.add(lightBeam2);
    objectsRef.current.lightBeam2 = lightBeam2;

    // Enhanced particle system with depth
    const createParticles = () => {
      const particleCount = isMobile ? 800 : 3000;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const purpleColor = new THREE.Color(0x9D7BFF);
      const pinkColor = new THREE.Color(0xC6B6FF);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 150;
        positions[i + 1] = (Math.random() - 0.5) * 150;
        positions[i + 2] = (Math.random() - 0.5) * 300 - 50;

        const color = Math.random() > 0.5 ? purpleColor : pinkColor;
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }

      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const particleMaterial = new THREE.PointsMaterial({
        size: isMobile ? 0.12 : 0.08,
        transparent: true,
        opacity: 0.7,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      return new THREE.Points(particles, particleMaterial);
    };

    const particles = createParticles();
    scene.add(particles);
    objectsRef.current.particles = particles;

    // SCENE 1: HERO - Floating UI mockups + Brand element
    const heroGroup = new THREE.Group();
    heroGroup.position.set(0, 0, 0);

    // Create "MK" 3D text representation (using planes)
    const createBrandElement = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#6C4DF6';
      ctx.font = 'bold 180px Space Grotesk, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('MK', 256, 128);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });
      const geometry = new THREE.PlaneGeometry(8, 4);
      const mesh = new THREE.Mesh(geometry, material);
      return mesh;
    };

    const brandElement = createBrandElement();
    brandElement.position.set(0, 0, -8);
    heroGroup.add(brandElement);
    objectsRef.current.brandElement = brandElement;

    // Floating UI mockups (website screens)
    const createUIMockup = (color, offsetX, offsetY, offsetZ) => {
      const group = new THREE.Group();
      
      // Main screen
      const screenGeometry = new THREE.PlaneGeometry(4, 3);
      const screenMaterial = new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.1,
        roughness: 0.2,
        transparent: true,
        opacity: 0.5,
        emissive: color,
        emissiveIntensity: 0.3,
        side: THREE.DoubleSide
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      group.add(screen);

      // Glow border
      const borderGeometry = new THREE.PlaneGeometry(4.1, 3.1);
      const borderMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      const border = new THREE.Mesh(borderGeometry, borderMaterial);
      border.position.z = -0.01;
      group.add(border);

      group.position.set(offsetX, offsetY, offsetZ);
      return group;
    };

    const mockup1 = createUIMockup(0x6C4DF6, -6, 2, -3);
    const mockup2 = createUIMockup(0x9D7BFF, 6, -2, -5);
    const mockup3 = createUIMockup(0xC6B6FF, 0, -3, -7);
    heroGroup.add(mockup1, mockup2, mockup3);
    objectsRef.current.heroMockups = [mockup1, mockup2, mockup3];

    scene.add(heroGroup);
    objectsRef.current.heroGroup = heroGroup;

    // SCENE 2: SERVICES - Code Editor + Analytics Dashboard
    const servicesGroup = new THREE.Group();
    servicesGroup.position.z = -50;

    // Code Editor Panel (left)
    const createCodePanel = () => {
      const group = new THREE.Group();
      const panelGeometry = new THREE.PlaneGeometry(5, 4);
      const panelMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1a1a2e,
        metalness: 0.2,
        roughness: 0.3,
        emissive: 0x6C4DF6,
        emissiveIntensity: 0.15
      });
      const panel = new THREE.Mesh(panelGeometry, panelMaterial);
      group.add(panel);

      // Code lines simulation
      for (let i = 0; i < 8; i++) {
        const lineGeometry = new THREE.PlaneGeometry(4, 0.15);
        const lineMaterial = new THREE.MeshBasicMaterial({
          color: i % 3 === 0 ? 0x9D7BFF : i % 2 === 0 ? 0xC6B6FF : 0x6C4DF6,
          transparent: true,
          opacity: 0.6
        });
        const line = new THREE.Mesh(lineGeometry, lineMaterial);
        line.position.set(-0.3, 1.5 - i * 0.4, 0.01);
        group.add(line);
      }

      return group;
    };

    const codePanel = createCodePanel();
    codePanel.position.set(-5, 1, 0);
    servicesGroup.add(codePanel);
    objectsRef.current.codePanel = codePanel;

    // Analytics Dashboard (right)
    const createDashboard = () => {
      const group = new THREE.Group();
      const bgGeometry = new THREE.PlaneGeometry(5, 4);
      const bgMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1a1a2e,
        metalness: 0.2,
        roughness: 0.3,
        emissive: 0x9D7BFF,
        emissiveIntensity: 0.15
      });
      const bg = new THREE.Mesh(bgGeometry, bgMaterial);
      group.add(bg);

      // Graph bars
      for (let i = 0; i < 6; i++) {
        const height = 0.5 + Math.random() * 2;
        const barGeometry = new THREE.BoxGeometry(0.4, height, 0.1);
        const barMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x6C4DF6,
          emissive: 0x6C4DF6,
          emissiveIntensity: 0.5,
          metalness: 0.5,
          roughness: 0.2
        });
        const bar = new THREE.Mesh(barGeometry, barMaterial);
        bar.position.set(-2 + i * 0.8, -1 + height / 2, 0.1);
        group.add(bar);
      }

      return group;
    };

    const dashboard = createDashboard();
    dashboard.position.set(5, -1, 0);
    servicesGroup.add(dashboard);
    objectsRef.current.dashboard = dashboard;

    // Central service sphere (branding)
    const serviceSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.5, 32, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0x6C4DF6,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.6,
        emissive: 0x6C4DF6,
        emissiveIntensity: 0.4
      })
    );
    serviceSphere.position.set(0, 0, 0);
    servicesGroup.add(serviceSphere);
    objectsRef.current.serviceSphere = serviceSphere;

    scene.add(servicesGroup);
    objectsRef.current.servicesGroup = servicesGroup;

    // SCENE 3: PROJECTS - Premium Curved Gallery
    const projectsGroup = new THREE.Group();
    projectsGroup.position.z = -100;

    const createProjectScreen = (index, total, color) => {
      const group = new THREE.Group();
      const angle = (index / total) * Math.PI * 1.4 - Math.PI * 0.7;
      const radius = 12;

      // Main screen with depth
      const screenGeometry = new THREE.BoxGeometry(5, 3.5, 0.2);
      const screenMaterial = new THREE.MeshPhysicalMaterial({
        color: color,
        metalness: 0.3,
        roughness: 0.1,
        emissive: color,
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.9,
        clearcoat: 1,
        clearcoatRoughness: 0.1
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      group.add(screen);

      // Glow effect
      const glowGeometry = new THREE.PlaneGeometry(5.5, 4);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.z = 0.15;
      group.add(glow);

      group.position.set(
        Math.sin(angle) * radius,
        (index % 2) * 1.5 - 0.75,
        Math.cos(angle) * radius
      );
      group.rotation.y = -angle;

      return group;
    };

    const projectColors = [0x6C4DF6, 0x9D7BFF, 0xC6B6FF, 0x6C4DF6];
    const projectScreens = projectColors.map((color, i) => 
      createProjectScreen(i, projectColors.length, color)
    );
    projectScreens.forEach(screen => projectsGroup.add(screen));
    objectsRef.current.projectScreens = projectScreens;

    scene.add(projectsGroup);
    objectsRef.current.projectsGroup = projectsGroup;

    // SCENE 4: SKILLS - Dynamic Orbit System with Brand Center
    const skillsGroup = new THREE.Group();
    skillsGroup.position.z = -150;

    // Center brand sphere
    const centerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(2.5, 32, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0x6C4DF6,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x6C4DF6,
        emissiveIntensity: 0.6,
        clearcoat: 1
      })
    );
    skillsGroup.add(centerSphere);
    objectsRef.current.centerSphere = centerSphere;

    // Orbiting skills
    const orbitGroup = new THREE.Group();
    const skills = [
      { name: 'React', color: 0x6C4DF6 },
      { name: 'Node', color: 0x9D7BFF },
      { name: 'MongoDB', color: 0xC6B6FF },
      { name: 'SEO', color: 0x6C4DF6 },
      { name: 'Ads', color: 0x9D7BFF },
      { name: 'Analytics', color: 0xC6B6FF },
      { name: 'Express', color: 0x6C4DF6 },
      { name: 'Marketing', color: 0x9D7BFF }
    ];

    skills.forEach((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      const skillSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 16),
        new THREE.MeshPhysicalMaterial({
          color: skill.color,
          metalness: 0.7,
          roughness: 0.2,
          emissive: skill.color,
          emissiveIntensity: 0.5
        })
      );
      skillSphere.position.set(
        Math.cos(angle) * 6,
        Math.sin(angle) * 6,
        0
      );
      orbitGroup.add(skillSphere);
    });

    skillsGroup.add(orbitGroup);
    objectsRef.current.orbitGroup = orbitGroup;

    scene.add(skillsGroup);
    objectsRef.current.skillsGroup = skillsGroup;

    // SCENE 5: CONTACT - Glass Portal
    const contactGroup = new THREE.Group();
    contactGroup.position.z = -200;

    const contactPortal = new THREE.Mesh(
      new THREE.BoxGeometry(8, 6, 0.5),
      new THREE.MeshPhysicalMaterial({
        color: 0x6C4DF6,
        metalness: 0.05,
        roughness: 0.05,
        transparent: true,
        opacity: 0.15,
        transmission: 0.9,
        thickness: 0.5,
        emissive: 0x6C4DF6,
        emissiveIntensity: 0.2,
        clearcoat: 1
      })
    );
    contactGroup.add(contactPortal);
    objectsRef.current.contactPortal = contactPortal;

    scene.add(contactGroup);
    objectsRef.current.contactGroup = contactGroup;

    // Mouse tracking for interactions
    const handleMouseMove = (e) => {
      if (isMobile) return;
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // CINEMATIC CAMERA CHOREOGRAPHY with GSAP
    const setupCinematicScroll = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2, // Smoother scrubbing
        }
      });

      // Scene 1 → 2: Hero to Services
      tl.to(camera.position, {
        z: -35,
        y: 1,
        duration: 1,
        ease: 'power2.inOut'
      })
      .to(camera.rotation, {
        y: -0.1,
        duration: 1,
        ease: 'power2.inOut'
      }, '<')
      
      // Scene 2 → 3: Services to Projects
      .to(camera.position, {
        z: -85,
        y: 0,
        duration: 1,
        ease: 'power2.inOut'
      })
      .to(camera.rotation, {
        y: 0.1,
        duration: 1,
        ease: 'power2.inOut'
      }, '<')
      
      // Scene 3 → 4: Projects to Skills
      .to(camera.position, {
        z: -135,
        y: 2,
        duration: 1,
        ease: 'power2.inOut'
      })
      .to(camera.rotation, {
        y: 0,
        x: -0.05,
        duration: 1,
        ease: 'power2.inOut'
      }, '<')
      
      // Scene 4 → 5: Skills to Contact
      .to(camera.position, {
        z: -185,
        y: 0,
        duration: 1,
        ease: 'power2.inOut'
      })
      .to(camera.rotation, {
        x: 0,
        duration: 1,
        ease: 'power2.inOut'
      }, '<');
    };

    setupCinematicScroll();

    // Continuous animations
    const animateObjects = () => {
      const time = Date.now() * 0.0005;

      // Brand element pulse
      if (objectsRef.current.brandElement) {
        objectsRef.current.brandElement.material.opacity = 0.6 + Math.sin(time * 2) * 0.2;
      }

      // Hero mockups floating
      if (objectsRef.current.heroMockups) {
        objectsRef.current.heroMockups.forEach((mockup, i) => {
          mockup.position.y += Math.sin(time + i) * 0.001;
          mockup.rotation.y += 0.002;
        });
      }

      // Code panel glitch effect
      if (objectsRef.current.codePanel) {
        objectsRef.current.codePanel.rotation.y = Math.sin(time * 0.5) * 0.05;
      }

      // Dashboard bars animation
      if (objectsRef.current.dashboard) {
        objectsRef.current.dashboard.rotation.y = Math.sin(time * 0.5) * -0.05;
      }

      // Service sphere rotation
      if (objectsRef.current.serviceSphere) {
        objectsRef.current.serviceSphere.rotation.y += 0.005;
      }

      // Project screens hover effect
      if (objectsRef.current.projectScreens) {
        objectsRef.current.projectScreens.forEach((screen, i) => {
          screen.position.y += Math.sin(time + i * 0.5) * 0.002;
        });
      }

      // Skills orbit rotation
      if (objectsRef.current.orbitGroup) {
        objectsRef.current.orbitGroup.rotation.z += 0.003;
        objectsRef.current.orbitGroup.rotation.y += 0.002;
      }

      // Center sphere pulse
      if (objectsRef.current.centerSphere) {
        const scale = 1 + Math.sin(time * 3) * 0.05;
        objectsRef.current.centerSphere.scale.set(scale, scale, scale);
      }

      // Contact portal pulse
      if (objectsRef.current.contactPortal) {
        objectsRef.current.contactPortal.material.opacity = 0.15 + Math.sin(time * 2) * 0.05;
      }

      // Light beams animation
      if (objectsRef.current.lightBeam1) {
        objectsRef.current.lightBeam1.material.opacity = 0.1 + Math.sin(time) * 0.05;
      }
      if (objectsRef.current.lightBeam2) {
        objectsRef.current.lightBeam2.material.opacity = 0.1 + Math.cos(time) * 0.05;
      }

      // Particles drift
      if (objectsRef.current.particles) {
        objectsRef.current.particles.rotation.y += 0.0001;
      }
    };

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      animateObjects();

      // Subtle mouse parallax
      if (!isMobile && cameraRef.current) {
        const targetX = mouseRef.current.x * 0.3;
        const targetY = mouseRef.current.y * 0.2;
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y + 2) * 0.05;
      }

      camera.lookAt(0, 0, camera.position.z - 20);
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

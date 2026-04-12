import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OrbitalSystem = () => {
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
    scene.fog = new THREE.FogExp2(0x0B0B1A, 0.005);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 25);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // LIGHTING - Soft and elegant
    const ambientLight = new THREE.AmbientLight(0x6C4DF6, 0.3);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0x6C4DF6, 2, 100);
    keyLight.position.set(0, 10, 10);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x9D7BFF, 1, 80);
    fillLight.position.set(-10, 0, -10);
    scene.add(fillLight);

    // STAR FIELD (particles)
    const createStarField = () => {
      const starCount = isMobile ? 1000 : 3000;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200;
        positions[i + 1] = (Math.random() - 0.5) * 200;
        positions[i + 2] = (Math.random() - 0.5) * 200;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xC6B6FF,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      return new THREE.Points(geometry, material);
    };

    const starField = createStarField();
    scene.add(starField);
    objectsRef.current.starField = starField;

    // CENTER SUN (Maheen/MK Brand Identity)
    const createCenterSun = () => {
      const sunGroup = new THREE.Group();

      // Core sphere
      const coreGeometry = new THREE.SphereGeometry(1.5, 64, 64);
      const coreMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x6C4DF6,
        emissive: 0x6C4DF6,
        emissiveIntensity: 0.8,
        metalness: 0.3,
        roughness: 0.2,
        clearcoat: 1,
        clearcoatRoughness: 0.1
      });
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      sunGroup.add(core);

      // Glow layer
      const glowGeometry = new THREE.SphereGeometry(2, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x6C4DF6,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      sunGroup.add(glow);

      objectsRef.current.sunCore = core;
      objectsRef.current.sunGlow = glow;

      return sunGroup;
    };

    const centerSun = createCenterSun();
    scene.add(centerSun);
    objectsRef.current.centerSun = centerSun;

    // ORBIT RINGS
    const createOrbitRing = (radius, color, opacity) => {
      const curve = new THREE.EllipseCurve(
        0, 0,
        radius, radius,
        0, 2 * Math.PI,
        false,
        0
      );

      const points = curve.getPoints(100);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending
      });

      const ring = new THREE.Line(geometry, material);
      ring.rotation.x = Math.PI / 2;

      return ring;
    };

    // Inner ring (Skills) - Fast orbit
    const innerRing = createOrbitRing(5, 0x9D7BFF, 0.3);
    scene.add(innerRing);
    objectsRef.current.innerRing = innerRing;

    // Middle ring (Services) - Medium orbit
    const middleRing = createOrbitRing(10, 0x6C4DF6, 0.4);
    scene.add(middleRing);
    objectsRef.current.middleRing = middleRing;

    // Outer ring (Projects) - Slow orbit
    const outerRing = createOrbitRing(15, 0xC6B6FF, 0.3);
    scene.add(outerRing);
    objectsRef.current.outerRing = outerRing;

    // CREATE PLANETS/NODES
    const createPlanet = (size, color, orbitRadius, index, total, type) => {
      const angle = (index / total) * Math.PI * 2;
      
      const planetGroup = new THREE.Group();

      // Planet sphere
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshPhysicalMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.4,
        metalness: 0.6,
        roughness: 0.3,
        clearcoat: 0.8
      });
      const planet = new THREE.Mesh(geometry, material);
      planetGroup.add(planet);

      // Glow
      const glowGeometry = new THREE.SphereGeometry(size * 1.3, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      planetGroup.add(glow);

      // Position on orbit
      planetGroup.position.set(
        Math.cos(angle) * orbitRadius,
        0,
        Math.sin(angle) * orbitRadius
      );

      planetGroup.userData = {
        orbitRadius,
        angle,
        speed: type === 'skill' ? 0.3 : type === 'service' ? 0.15 : 0.08,
        type
      };

      return planetGroup;
    };

    // Skills planets (Inner orbit - 8 skills)
    const skillsPlanets = [];
    const skillColors = [0x6C4DF6, 0x9D7BFF, 0xC6B6FF, 0x6C4DF6, 0x9D7BFF, 0xC6B6FF, 0x6C4DF6, 0x9D7BFF];
    for (let i = 0; i < 8; i++) {
      const planet = createPlanet(0.3, skillColors[i], 5, i, 8, 'skill');
      scene.add(planet);
      skillsPlanets.push(planet);
    }
    objectsRef.current.skillsPlanets = skillsPlanets;

    // Services planets (Middle orbit - 6 services)
    const servicesPlanets = [];
    const serviceColors = [0x74b9ff, 0x55efc4, 0xff6b9d, 0xffeaa7, 0xa29bfe, 0xfd79a8];
    for (let i = 0; i < 6; i++) {
      const planet = createPlanet(0.5, serviceColors[i], 10, i, 6, 'service');
      scene.add(planet);
      servicesPlanets.push(planet);
    }
    objectsRef.current.servicesPlanets = servicesPlanets;

    // Projects planets (Outer orbit - 4 major projects)
    const projectsPlanets = [];
    const projectColors = [0x6C4DF6, 0x9D7BFF, 0xC6B6FF, 0x6C4DF6];
    for (let i = 0; i < 4; i++) {
      const planet = createPlanet(0.6, projectColors[i], 15, i, 4, 'project');
      scene.add(planet);
      projectsPlanets.push(planet);
    }
    objectsRef.current.projectsPlanets = projectsPlanets;

    // CONTINUOUS ANIMATIONS
    const animateOrbitalSystem = () => {
      const time = Date.now() * 0.0001;

      // Sun pulse
      if (objectsRef.current.sunCore) {
        const scale = 1 + Math.sin(time * 3) * 0.05;
        objectsRef.current.sunCore.scale.set(scale, scale, scale);
      }

      if (objectsRef.current.sunGlow) {
        const scale = 1 + Math.sin(time * 2) * 0.1;
        objectsRef.current.sunGlow.scale.set(scale, scale, scale);
      }

      // Rotate planets on their orbits
      const allPlanets = [
        ...(objectsRef.current.skillsPlanets || []),
        ...(objectsRef.current.servicesPlanets || []),
        ...(objectsRef.current.projectsPlanets || [])
      ];

      allPlanets.forEach(planet => {
        planet.userData.angle += planet.userData.speed * 0.01;
        planet.position.x = Math.cos(planet.userData.angle) * planet.userData.orbitRadius;
        planet.position.z = Math.sin(planet.userData.angle) * planet.userData.orbitRadius;
        
        // Slight float
        planet.position.y = Math.sin(planet.userData.angle * 3) * 0.3;
        
        // Slow rotation
        planet.rotation.y += 0.005;
      });

      // Star field slow rotation
      if (objectsRef.current.starField) {
        objectsRef.current.starField.rotation.y += 0.0001;
      }
    };

    // CAMERA ANIMATION ON SCROLL
    const setupCameraAnimation = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        }
      });

      // Camera moves through the system
      tl.to(camera.position, {
        z: 5,
        y: 3,
        duration: 1,
        ease: 'power1.inOut'
      })
      .to(camera.rotation, {
        x: -0.15,
        duration: 1,
        ease: 'power1.inOut'
      }, '<');
    };

    setupCameraAnimation();

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      animateOrbitalSystem();
      
      camera.lookAt(0, 0, 0);
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

export default OrbitalSystem;

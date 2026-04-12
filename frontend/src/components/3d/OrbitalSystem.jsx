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
  const planetsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
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

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x6C4DF6, 0.3);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0x6C4DF6, 2, 100);
    keyLight.position.set(0, 10, 10);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x9D7BFF, 1, 80);
    fillLight.position.set(-10, 0, -10);
    scene.add(fillLight);

    // STAR FIELD
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

    // CENTER SUN
    const createCenterSun = () => {
      const sunGroup = new THREE.Group();

      // Core
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
      sunGroup.userData.core = core;

      // Glow
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
      sunGroup.userData.glow = glow;

      return sunGroup;
    };

    const centerSun = createCenterSun();
    scene.add(centerSun);

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

    const innerRing = createOrbitRing(5, 0x9D7BFF, 0.3);
    scene.add(innerRing);

    const middleRing = createOrbitRing(10, 0x6C4DF6, 0.4);
    scene.add(middleRing);

    const outerRing = createOrbitRing(15, 0xC6B6FF, 0.3);
    scene.add(outerRing);

    // CREATE ORBITING PLANETS
    const createPlanet = (size, color, orbitRadius, startAngle, speed, type) => {
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

      // Store orbital data
      planetGroup.userData = {
        orbitRadius,
        angle: startAngle,
        speed, // radians per frame
        baseSize: size,
        planet,
        glow,
        type
      };

      // Initial position
      planetGroup.position.set(
        Math.cos(startAngle) * orbitRadius,
        0,
        Math.sin(startAngle) * orbitRadius
      );

      return planetGroup;
    };

    // Skills planets (Inner orbit - fast)
    const skillsPlanets = [];
    const skillColors = [0x6C4DF6, 0x9D7BFF, 0xC6B6FF, 0x6C4DF6, 0x9D7BFF, 0xC6B6FF, 0x6C4DF6, 0x9D7BFF];
    for (let i = 0; i < 8; i++) {
      const startAngle = (i / 8) * Math.PI * 2;
      const planet = createPlanet(0.3, skillColors[i], 5, startAngle, 0.02, 'skill');
      scene.add(planet);
      skillsPlanets.push(planet);
    }

    // Services planets (Middle orbit - medium)
    const servicesPlanets = [];
    const serviceColors = [0x74b9ff, 0x55efc4, 0xff6b9d, 0xffeaa7, 0xa29bfe, 0xfd79a8];
    for (let i = 0; i < 6; i++) {
      const startAngle = (i / 6) * Math.PI * 2;
      const planet = createPlanet(0.5, serviceColors[i], 10, startAngle, 0.01, 'service');
      scene.add(planet);
      servicesPlanets.push(planet);
    }

    // Projects planets (Outer orbit - slow)
    const projectsPlanets = [];
    const projectColors = [0x6C4DF6, 0x9D7BFF, 0xC6B6FF, 0x6C4DF6];
    for (let i = 0; i < 4; i++) {
      const startAngle = (i / 4) * Math.PI * 2;
      const planet = createPlanet(0.6, projectColors[i], 15, startAngle, 0.005, 'project');
      scene.add(planet);
      projectsPlanets.push(planet);
    }

    // Store all planets
    planetsRef.current = [...skillsPlanets, ...servicesPlanets, ...projectsPlanets];

    // Mouse tracking for parallax
    const handleMouseMove = (e) => {
      if (isMobile) return;
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

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

    // MAIN ANIMATION LOOP
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      const deltaTime = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Animate center sun pulse
      if (centerSun.userData.core) {
        const scale = 1 + Math.sin(elapsedTime * 2) * 0.05;
        centerSun.userData.core.scale.set(scale, scale, scale);
      }

      if (centerSun.userData.glow) {
        const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.1;
        centerSun.userData.glow.scale.set(scale, scale, scale);
      }

      // ANIMATE ALL PLANETS - CONTINUOUS ORBITAL MOTION
      planetsRef.current.forEach(planetGroup => {
        // Update angle for orbital rotation
        planetGroup.userData.angle += planetGroup.userData.speed;

        // Calculate new position using trigonometry
        const x = Math.cos(planetGroup.userData.angle) * planetGroup.userData.orbitRadius;
        const z = Math.sin(planetGroup.userData.angle) * planetGroup.userData.orbitRadius;
        
        // Apply position
        planetGroup.position.x = x;
        planetGroup.position.z = z;
        
        // Add subtle floating motion on Y axis
        planetGroup.position.y = Math.sin(elapsedTime * 2 + planetGroup.userData.angle) * 0.3;

        // 3D DEPTH EFFECT - Scale based on Z position
        // Planets closer to camera (positive Z) appear larger
        const depthFactor = (z / planetGroup.userData.orbitRadius) * 0.15 + 1;
        const finalScale = planetGroup.userData.baseSize * depthFactor;
        planetGroup.scale.setScalar(finalScale);

        // Opacity based on depth (subtle)
        if (planetGroup.userData.planet && planetGroup.userData.planet.material) {
          const opacityFactor = (z / planetGroup.userData.orbitRadius) * 0.2 + 0.9;
          planetGroup.userData.planet.material.opacity = Math.max(0.7, opacityFactor);
          planetGroup.userData.planet.material.transparent = true;
        }

        // Rotate planet on its axis
        planetGroup.userData.planet.rotation.y += 0.01;
      });

      // Star field slow rotation
      if (starField) {
        starField.rotation.y += 0.0002;
      }

      // SUBTLE PARALLAX - Camera responds to mouse
      if (!isMobile) {
        const targetX = mouseRef.current.x * 0.5;
        const targetY = mouseRef.current.y * 0.3;
        
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY + 8 - camera.position.y) * 0.05;
      }

      // Camera always looks at center
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

export default OrbitalSystem;

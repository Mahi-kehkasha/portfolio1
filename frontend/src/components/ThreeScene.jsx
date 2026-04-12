import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create floating 3D objects
    const objects = [];

    // 1. SEO Chart - Torus
    const torusGeometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x6C4DF6,
      emissive: 0x6C4DF6,
      emissiveIntensity: 0.3,
      wireframe: true
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-2, 1, 0);
    scene.add(torus);
    objects.push({ mesh: torus, rotationSpeed: { x: 0.01, y: 0.02 } });

    // 2. Analytics Dashboard - Box
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const boxMaterial = new THREE.MeshStandardMaterial({
      color: 0x9D7BFF,
      emissive: 0x9D7BFF,
      emissiveIntensity: 0.3,
      wireframe: true
    });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(2, -1, -1);
    scene.add(box);
    objects.push({ mesh: box, rotationSpeed: { x: 0.02, y: 0.01 } });

    // 3. Ads Platform - Octahedron
    const octaGeometry = new THREE.OctahedronGeometry(0.8);
    const octaMaterial = new THREE.MeshStandardMaterial({
      color: 0xC6B6FF,
      emissive: 0xC6B6FF,
      emissiveIntensity: 0.3,
      wireframe: true
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.set(1.5, 2, -2);
    scene.add(octahedron);
    objects.push({ mesh: octahedron, rotationSpeed: { x: 0.015, y: 0.025 } });

    // 4. Social Media - Sphere
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x6C4DF6,
      emissive: 0x6C4DF6,
      emissiveIntensity: 0.3,
      wireframe: true
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(-1.5, -1.5, -1.5);
    scene.add(sphere);
    objects.push({ mesh: sphere, rotationSpeed: { x: 0.02, y: 0.02 } });

    // 5. Web Development - Cone
    const coneGeometry = new THREE.ConeGeometry(0.5, 1.2, 32);
    const coneMaterial = new THREE.MeshStandardMaterial({
      color: 0x9D7BFF,
      emissive: 0x9D7BFF,
      emissiveIntensity: 0.3,
      wireframe: true
    });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.set(0, -2, 0);
    scene.add(cone);
    objects.push({ mesh: cone, rotationSpeed: { x: 0.01, y: 0.03 } });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6C4DF6, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x9D7BFF, 1);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      // Rotate objects
      objects.forEach(({ mesh, rotationSpeed }) => {
        mesh.rotation.x += rotationSpeed.x;
        mesh.rotation.y += rotationSpeed.y;
      });

      // Parallax effect
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ThreeScene;

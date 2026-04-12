import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CartoonSceneManager = () => {
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

    // Scene setup with light background
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f7fa);
    scene.fog = new THREE.Fog(0xf5f7fa, 20, 100);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 15);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // SOFT, PLAYFUL LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffd3a5, 0.6);
    sunLight.position.set(5, 10, 5);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xa29bfe, 0.4);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // CREATE FRIENDLY CHARACTER/MASCOT
    const createCharacter = () => {
      const characterGroup = new THREE.Group();

      // Body (rounded sphere)
      const bodyGeometry = new THREE.SphereGeometry(1.2, 32, 32);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xa29bfe,
        metalness: 0.2,
        roughness: 0.3
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.castShadow = true;
      characterGroup.add(body);

      // Head (smaller sphere on top)
      const headGeometry = new THREE.SphereGeometry(0.8, 32, 32);
      const headMaterial = new THREE.MeshStandardMaterial({
        color: 0xffeaa7,
        metalness: 0.1,
        roughness: 0.4
      });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.y = 1.7;
      head.castShadow = true;
      characterGroup.add(head);

      // Eyes (cute)
      const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const eyeMaterial = new THREE.MeshStandardMaterial({
        color: 0x2d3436,
        metalness: 0.8,
        roughness: 0.2
      });
      
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      leftEye.position.set(-0.25, 1.8, 0.65);
      characterGroup.add(leftEye);

      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      rightEye.position.set(0.25, 1.8, 0.65);
      characterGroup.add(rightEye);

      // Smile (torus)
      const smileGeometry = new THREE.TorusGeometry(0.3, 0.05, 16, 100, Math.PI);
      const smileMaterial = new THREE.MeshStandardMaterial({
        color: 0x2d3436
      });
      const smile = new THREE.Mesh(smileGeometry, smileMaterial);
      smile.position.set(0, 1.4, 0.65);
      smile.rotation.z = Math.PI;
      characterGroup.add(smile);

      // Arms (cylinders)
      const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1, 16);
      const armMaterial = new THREE.MeshStandardMaterial({
        color: 0xa29bfe
      });

      const leftArm = new THREE.Mesh(armGeometry, armMaterial);
      leftArm.position.set(-1, 0.8, 0);
      leftArm.rotation.z = Math.PI / 4;
      characterGroup.add(leftArm);

      const rightArm = new THREE.Mesh(armGeometry, armMaterial);
      rightArm.position.set(1, 0.8, 0);
      rightArm.rotation.z = -Math.PI / 4;
      characterGroup.add(rightArm);

      objectsRef.current.character = characterGroup;
      objectsRef.current.characterHead = head;
      objectsRef.current.characterBody = body;
      objectsRef.current.leftArm = leftArm;
      objectsRef.current.rightArm = rightArm;

      return characterGroup;
    };

    // SCENE 1: HERO - Character greeting
    const heroGroup = new THREE.Group();
    heroGroup.position.z = 0;

    const character = createCharacter();
    character.position.set(3, 0, 0);
    heroGroup.add(character);

    // Floating hearts/stars around character
    for (let i = 0; i < 8; i++) {
      const starGeometry = new THREE.SphereGeometry(0.2, 8, 8);
      const starMaterial = new THREE.MeshStandardMaterial({
        color: [0xff6b9d, 0xffeaa7, 0xa29bfe, 0x74b9ff][i % 4],
        metalness: 0.5,
        roughness: 0.2
      });
      const star = new THREE.Mesh(starGeometry, starMaterial);
      const angle = (i / 8) * Math.PI * 2;
      star.position.set(
        3 + Math.cos(angle) * 3,
        Math.sin(angle) * 2,
        Math.sin(angle * 2) * 2
      );
      heroGroup.add(star);
    }

    scene.add(heroGroup);
    objectsRef.current.heroGroup = heroGroup;

    // SCENE 2: SERVICES - Cartoon objects
    const servicesGroup = new THREE.Group();
    servicesGroup.position.z = -40;

    // Mini browser (website)
    const browserGeometry = new THREE.BoxGeometry(3, 2, 0.3);
    const browserMaterial = new THREE.MeshStandardMaterial({
      color: 0x74b9ff,
      metalness: 0.3,
      roughness: 0.4
    });
    const browser = new THREE.Mesh(browserGeometry, browserMaterial);
    browser.position.set(-4, 1, 0);
    servicesGroup.add(browser);

    // Growing graph (SEO)
    const graphGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const barGeometry = new THREE.BoxGeometry(0.4, 0.5 + i * 0.3, 0.4);
      const barMaterial = new THREE.MeshStandardMaterial({
        color: 0x55efc4,
        metalness: 0.5,
        roughness: 0.3
      });
      const bar = new THREE.Mesh(barGeometry, barMaterial);
      bar.position.set(i * 0.6 - 1, (0.5 + i * 0.3) / 2 - 1, 0);
      graphGroup.add(bar);
    }
    graphGroup.position.set(0, 0, 0);
    servicesGroup.add(graphGroup);

    // Dashboard (ads)
    const dashboardGeometry = new THREE.BoxGeometry(3, 2, 0.3);
    const dashboardMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6b9d,
      metalness: 0.3,
      roughness: 0.4
    });
    const dashboard = new THREE.Mesh(dashboardGeometry, dashboardMaterial);
    dashboard.position.set(4, -1, 0);
    servicesGroup.add(dashboard);

    // Character in services
    const serviceCharacter = character.clone();
    serviceCharacter.position.set(0, -2, 2);
    serviceCharacter.scale.set(0.6, 0.6, 0.6);
    servicesGroup.add(serviceCharacter);

    scene.add(servicesGroup);
    objectsRef.current.servicesGroup = servicesGroup;

    // SCENE 3: PROJECTS - Showcase room
    const projectsGroup = new THREE.Group();
    projectsGroup.position.z = -80;

    const projectColors = [0x74b9ff, 0xff6b9d, 0x55efc4, 0xffeaa7];
    projectColors.forEach((color, i) => {
      const projectGeometry = new THREE.BoxGeometry(4, 3, 0.5);
      const projectMaterial = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.4,
        roughness: 0.3
      });
      const project = new THREE.Mesh(projectGeometry, projectMaterial);
      const angle = (i / 4) * Math.PI * 1.5 - Math.PI * 0.75;
      project.position.set(
        Math.sin(angle) * 8,
        (i % 2) * 2 - 1,
        Math.cos(angle) * 8
      );
      project.rotation.y = -angle;
      projectsGroup.add(project);
    });

    scene.add(projectsGroup);
    objectsRef.current.projectsGroup = projectsGroup;

    // SCENE 4: SKILLS - Floating bubbles
    const skillsGroup = new THREE.Group();
    skillsGroup.position.z = -120;

    const skillColors = [0x74b9ff, 0xff6b9d, 0x55efc4, 0xffeaa7, 0xa29bfe, 0xfd79a8, 0x6c5ce7, 0x00b894];
    skillColors.forEach((color, i) => {
      const bubbleGeometry = new THREE.SphereGeometry(0.8, 32, 32);
      const bubbleMaterial = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.6,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9
      });
      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
      const angle = (i / 8) * Math.PI * 2;
      bubble.position.set(
        Math.cos(angle) * 5,
        Math.sin(angle) * 5,
        0
      );
      skillsGroup.add(bubble);
    });

    // Character celebrating
    const skillsCharacter = character.clone();
    skillsCharacter.position.set(0, 0, 3);
    skillsCharacter.scale.set(0.7, 0.7, 0.7);
    skillsGroup.add(skillsCharacter);

    scene.add(skillsGroup);
    objectsRef.current.skillsGroup = skillsGroup;

    // SCENE 5: CONTACT - Character inviting
    const contactGroup = new THREE.Group();
    contactGroup.position.z = -160;

    const contactCharacter = character.clone();
    contactCharacter.position.set(0, 0, 0);
    contactGroup.add(contactCharacter);

    // Invitation platform
    const platformGeometry = new THREE.CylinderGeometry(4, 4, 0.5, 32);
    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0xa29bfe,
      metalness: 0.5,
      roughness: 0.3
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -2;
    contactGroup.add(platform);

    scene.add(contactGroup);
    objectsRef.current.contactGroup = contactGroup;

    // Continuous animations
    const animateObjects = () => {
      const time = Date.now() * 0.001;

      // Character floating
      if (objectsRef.current.character) {
        objectsRef.current.character.position.y = Math.sin(time) * 0.3;
        objectsRef.current.character.rotation.y = Math.sin(time * 0.5) * 0.2;
        
        // Head bobbing
        if (objectsRef.current.characterHead) {
          objectsRef.current.characterHead.rotation.y = Math.sin(time * 2) * 0.1;
        }

        // Arms waving
        if (objectsRef.current.leftArm) {
          objectsRef.current.leftArm.rotation.z = Math.PI / 4 + Math.sin(time * 2) * 0.3;
        }
        if (objectsRef.current.rightArm) {
          objectsRef.current.rightArm.rotation.z = -Math.PI / 4 - Math.sin(time * 2 + 1) * 0.3;
        }
      }

      // Services objects
      if (objectsRef.current.servicesGroup) {
        objectsRef.current.servicesGroup.children.forEach((child, i) => {
          if (child.type === 'Mesh' || child.type === 'Group') {
            child.position.y += Math.sin(time + i) * 0.002;
            child.rotation.y += 0.003;
          }
        });
      }

      // Skills bubbles
      if (objectsRef.current.skillsGroup) {
        objectsRef.current.skillsGroup.children.forEach((child, i) => {
          if (child.type === 'Mesh') {
            child.position.y += Math.sin(time + i * 0.5) * 0.003;
            const scale = 1 + Math.sin(time * 2 + i) * 0.1;
            child.scale.set(scale, scale, scale);
          }
        });
      }
    };

    // SMOOTH CAMERA MOVEMENT
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
        z: -170,
        y: 2,
        duration: 1,
        ease: 'power1.inOut'
      })
      .to(camera.rotation, {
        y: 0,
        duration: 1,
        ease: 'power1.inOut'
      }, '<');
    };

    setupCameraAnimation();

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      animateObjects();
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

export default CartoonSceneManager;

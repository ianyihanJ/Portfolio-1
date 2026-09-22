"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { VisualArchiveItem } from "../data/visuals";

type Mood = {
  background: string;
  blob1: string;
  blob2: string;
  accent: string;
  text: string;
};

const moods: Mood[] = [
  { background: "#fffaf0", blob1: "#ffdf94", blob2: "#fce7c4", accent: "#feca4f", text: "#2e2e2e" },
  { background: "#fffaf0", blob1: "#d29a41", blob2: "#bb96af", accent: "#80455a", text: "#2e2e2e" },
  { background: "#5f81ab", blob1: "#f88b8d", blob2: "#cfbbdd", accent: "#fa7b71", text: "#f4f4f4" },
  { background: "#5b9bc2", blob1: "#ffaa00", blob2: "#00e1ff", accent: "#3c72c6", text: "#f4f4f4" },
  { background: "#7d936e", blob1: "#fdd895", blob2: "#a5b599", accent: "#fdd895", text: "#f4f4f4" },
  { background: "#765f58", blob1: "#f0b58e", blob2: "#c6d7c0", accent: "#e9a87e", text: "#f4f4f4" },
];

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform vec3 uBackgroundColor;
  uniform vec3 uBlob1Color;
  uniform vec3 uBlob2Color;
  uniform float uNoiseStrength;
  uniform float uBlobRadius;
  uniform float uBlobRadiusSecondary;
  uniform float uBlobStrength;
  uniform float uTime;
  uniform float uVelocityIntensity;

  float random(vec2 coord) {
    return fract(sin(dot(coord, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec3 color = uBackgroundColor;
    float animTime = uTime * 0.00028;
    vec2 blob1Center = vec2(
      0.50 + sin(animTime) * 0.13 + sin(animTime * 1.618) * 0.05,
      0.48 + cos(animTime * 0.794) * 0.09 + cos(animTime * 1.272) * 0.03
    );
    vec2 blob2Center = vec2(
      0.35 + cos(animTime * 0.927) * 0.11 + cos(animTime * 1.414) * 0.04,
      0.55 + sin(animTime * 1.175) * 0.07 + sin(animTime * 0.618) * 0.03
    );
    float blob1 = smoothstep(uBlobRadius, 0.0, distance(vUv, blob1Center));
    float blob2 = smoothstep(uBlobRadiusSecondary, 0.0, distance(vUv, blob2Center));
    vec3 blob1SoftColor = mix(uBlob1Color, uBackgroundColor, 0.35);
    vec3 blob2SoftColor = mix(uBlob2Color, uBackgroundColor, 0.35);
    color = mix(color, blob1SoftColor, blob1 * uBlobStrength);
    color = mix(color, blob2SoftColor, blob2 * uBlobStrength);
    color += uVelocityIntensity * 0.10;
    float grain = random(vUv * vec2(1387.13, 947.91)) - 0.5;
    color += grain * uNoiseStrength;
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function InteractiveVisualGallery({ items }: { items: VisualArchiveItem[] }) {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const rootElement = root.current;
    const canvasElement = canvas.current;
    if (!rootElement || !canvasElement || items.length === 0) return;

    let disposed = false;
    let animationFrame = 0;
    let targetProgress = 0;
    let currentProgress = 0;
    let previousProgress = 0;
    let velocity = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pointerCurrentX = 0;
    let pointerCurrentY = 0;
    let lastTrailProgress = -1;
    let trailMesh: THREE.Mesh | null = null;
    const copyElements = Array.from(
      rootElement.querySelectorAll<HTMLElement>("[data-depth-gallery-copy]"),
    );
    const entryElements = Array.from(
      rootElement.querySelectorAll<HTMLAnchorElement>("[data-depth-gallery-entry]"),
    );

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvasElement, antialias: true });
    } catch (error) {
      console.error("Depth gallery WebGL initialization failed", error);
      const failureTimer = window.setTimeout(() => setFailed(true), 0);
      return () => window.clearTimeout(failureTimer);
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.autoClear = false;

    const backgroundScene = new THREE.Scene();
    const backgroundCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const firstMood = moods[0];
    const nextBackgroundColor = new THREE.Color();
    const nextBlob1Color = new THREE.Color();
    const nextBlob2Color = new THREE.Color();
    const backgroundMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        uBackgroundColor: { value: new THREE.Color(firstMood.background) },
        uBlob1Color: { value: new THREE.Color(firstMood.blob1) },
        uBlob2Color: { value: new THREE.Color(firstMood.blob2) },
        uNoiseStrength: { value: 0.04 },
        uBlobRadius: { value: 0.65 },
        uBlobRadiusSecondary: { value: 0.507 },
        uBlobStrength: { value: 0.9 },
        uTime: { value: 0 },
        uVelocityIntensity: { value: 0 },
      },
    });
    const backgroundMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), backgroundMaterial);
    backgroundScene.add(backgroundMesh);

    const planeGeometry = new THREE.PlaneGeometry(3, 3);
    const planePositions = [-0.9, 0.8, -0.7, 1, -0.7, 0.75];
    const textureLoader = new THREE.TextureLoader();
    const textures: THREE.Texture[] = [];
    const planes: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>[] = [];
    const planeGap = 5;
    const lastPlaneIndex = items.length - 1;
    const minCameraZ = -lastPlaneIndex * planeGap + 5;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const width = canvasElement.clientWidth || window.innerWidth || 1;
      const height = canvasElement.clientHeight || window.innerHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);

      const mobile = width <= 768;
      planes.forEach((plane) => {
        const aspect = (plane.userData.aspectRatio as number | undefined) ?? 16 / 9;
        const scale = mobile ? 0.65 : 1;
        plane.scale.set(scale * aspect, scale, 1);
        plane.userData.spread = mobile ? 0.25 : 1;
      });
    };

    const updateTargetProgress = () => {
      const rect = rootElement.getBoundingClientRect();
      const distance = Math.max(rootElement.offsetHeight - window.innerHeight, 1);
      targetProgress = clamp(-rect.top / distance, 0, 1);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvasElement.getBoundingClientRect();
      pointerX = clamp(((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1, -1, 1);
      pointerY = clamp(-(((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1), -1, 1);
    };

    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    const updateTrail = (progress: number) => {
      if (Math.abs(progress - lastTrailProgress) < 0.003 && trailMesh) return;
      lastTrailProgress = progress;
      const visibleProgress = Math.max(progress, 0.018);
      const pointCount = Math.max(10, Math.round(20 + visibleProgress * 160));
      const points: THREE.Vector3[] = [];

      for (let index = 0; index <= pointCount; index += 1) {
        const p = (index / pointCount) * visibleProgress;
        const cameraAtPoint = 5 + (minCameraZ - 5) * p;
        const x = -0.96 + Math.sin(p * Math.PI * 2 * 1.85) * (window.innerWidth <= 768 ? 1.05 : 3);
        const y = -1.05 + Math.sin(p * Math.PI * 2 * 2.1) * 0.78;
        const depthProgress = -0.1 + p * 1.1;
        const z = cameraAtPoint + 1.65 - (4.78 + depthProgress * 6.52);
        points.push(new THREE.Vector3(x, y, z));
      }

      if (points.length < 2) return;
      const curve = new THREE.CatmullRomCurve3(points, false, "centripetal", 0.67);
      const geometry = new THREE.TubeGeometry(curve, Math.min(180, points.length * 3), 0.011, 6, false);

      if (!trailMesh) {
        const material = new THREE.MeshBasicMaterial({
          color: "#f6f9ff",
          transparent: true,
          opacity: 0.48,
          depthTest: false,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        trailMesh = new THREE.Mesh(geometry, material);
        trailMesh.renderOrder = 1200;
        scene.add(trailMesh);
      } else {
        trailMesh.geometry.dispose();
        trailMesh.geometry = geometry;
      }
    };

    const preload = async () => {
      const loaded = await Promise.all(
        items.map(async (item) => {
          try {
            const texture = await textureLoader.loadAsync(item.image);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            textures.push(texture);
            return texture;
          } catch (error) {
            console.warn(`Depth gallery texture failed: ${item.image}`, error);
            return null;
          }
        }),
      );

      if (disposed) return;

      items.forEach((item, index) => {
        const mood = moods[index % moods.length];
        const texture = loaded[index];
        const image = texture?.image as { width?: number; height?: number } | undefined;
        const aspectRatio = image?.width && image?.height ? image.width / image.height : 16 / 9;
        const material = new THREE.MeshBasicMaterial({
          color: texture ? "#ffffff" : mood.accent,
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
          depthWrite: false,
          opacity: index === 0 ? 1 : 0,
        });
        const plane = new THREE.Mesh(planeGeometry, material);
        plane.position.set(planePositions[index % planePositions.length], 0, -index * planeGap);
        plane.userData.baseX = planePositions[index % planePositions.length];
        plane.userData.aspectRatio = aspectRatio;
        plane.userData.spread = 1;
        plane.renderOrder = 10 + index;
        planes.push(plane);
        scene.add(plane);
      });

      resize();
      updateTargetProgress();
      updateTrail(0);
      setReady(true);

      const animate = (time: number) => {
        if (disposed) return;
        animationFrame = window.requestAnimationFrame(animate);
        currentProgress = THREE.MathUtils.lerp(currentProgress, targetProgress, reducedMotion ? 0.2 : 0.08);
        const rawVelocity = currentProgress - previousProgress;
        velocity = THREE.MathUtils.lerp(velocity, rawVelocity * 100, 0.12);
        velocity = clamp(velocity, -1.5, 1.5);
        previousProgress = currentProgress;

        const cameraZ = 5 + (minCameraZ - 5) * currentProgress;
        camera.position.z = cameraZ;
        const sampledCameraZ = cameraZ - planeGap;
        const normalizedDepth = clamp((0 - sampledCameraZ) / planeGap, 0, lastPlaneIndex);
        const currentIndex = Math.floor(normalizedDepth);
        const nextIndex = Math.min(currentIndex + 1, lastPlaneIndex);
        const blend = normalizedDepth - currentIndex;
        const scaleOnePointTwo = 1 - 1 / 1.2;
        const currentOpacityTarget = currentIndex === nextIndex
          ? 1
          : 1 - THREE.MathUtils.smoothstep(blend, scaleOnePointTwo, 0.29);
        const nextOpacityTarget = currentIndex === nextIndex
          ? 1
          : THREE.MathUtils.smoothstep(blend, 0.43, 0.56);

        pointerCurrentX = THREE.MathUtils.lerp(pointerCurrentX, pointerX, 0.08);
        pointerCurrentY = THREE.MathUtils.lerp(pointerCurrentY, pointerY, 0.08);

        planes.forEach((plane, index) => {
          let opacity = 0;
          if (index === currentIndex) opacity = currentOpacityTarget;
          if (index === nextIndex) opacity = Math.max(opacity, nextOpacityTarget);
          plane.material.opacity = opacity;

          const copyElement = copyElements[index];
          const entryElement = entryElements[index];
          if (copyElement) {
            copyElement.style.opacity = String(opacity);
            copyElement.style.transform = reducedMotion
              ? "none"
              : `translate3d(0, ${(1 - opacity) * 28}px, 0)`;
            copyElement.setAttribute("aria-hidden", opacity <= 0.01 ? "true" : "false");
          }
          if (entryElement) {
            entryElement.style.opacity = String(opacity);
            entryElement.style.transform = reducedMotion
              ? "none"
              : `translate3d(0, ${(1 - opacity) * 18}px, 0)`;
            entryElement.style.pointerEvents = opacity > 0.45 ? "auto" : "none";
            entryElement.tabIndex = opacity > 0.45 ? 0 : -1;
            entryElement.setAttribute("aria-hidden", opacity <= 0.01 ? "true" : "false");
          }

          const depthInfluence = 1 + index * 0.05;
          const influence = plane.material.opacity * depthInfluence;
          plane.position.x = (plane.userData.baseX as number) * (plane.userData.spread as number) + pointerCurrentX * 0.16 * influence;
          plane.position.y = pointerCurrentY * 0.08 * influence + clamp(velocity / 1.5, -1, 1) * 0.05;

          const breath = reducedMotion ? 0 : clamp(Math.abs(velocity) / 1.5, 0, 1) * influence;
          plane.rotation.x = -pointerCurrentY * 0.045 * breath;
          plane.rotation.y = pointerCurrentX * 0.045 * breath;
          const baseScale = window.innerWidth <= 768 ? 0.65 : 1;
          const pulse = 1 + 0.03 * breath;
          const aspect = plane.userData.aspectRatio as number;
          plane.scale.set(baseScale * aspect * pulse, baseScale * pulse, 1);
        });

        const currentMood = moods[currentIndex % moods.length];
        const nextMood = moods[nextIndex % moods.length];
        backgroundMaterial.uniforms.uBackgroundColor.value
          .set(currentMood.background)
          .lerp(nextBackgroundColor.set(nextMood.background), blend);
        backgroundMaterial.uniforms.uBlob1Color.value
          .set(currentMood.blob1)
          .lerp(nextBlob1Color.set(nextMood.blob1), blend);
        backgroundMaterial.uniforms.uBlob2Color.value
          .set(currentMood.blob2)
          .lerp(nextBlob2Color.set(nextMood.blob2), blend);
        const depthProgress = lastPlaneIndex > 0 ? normalizedDepth / lastPlaneIndex : 0;
        const velocityIntensity = clamp(Math.abs(velocity) / 1.5, 0, 1);
        backgroundMaterial.uniforms.uBlobRadius.value = 0.65 + depthProgress * 0.08;
        backgroundMaterial.uniforms.uBlobRadiusSecondary.value = (0.65 + depthProgress * 0.08) * 0.78;
        backgroundMaterial.uniforms.uBlobStrength.value = 0.9 + velocityIntensity * 0.1;
        backgroundMaterial.uniforms.uVelocityIntensity.value = velocityIntensity;
        backgroundMaterial.uniforms.uTime.value = time;

        updateTrail(currentProgress);
        if (trailMesh) {
          const edgeDistance = Math.min(currentProgress + 0.1, 1 - currentProgress);
          const edgeVisibility = THREE.MathUtils.smoothstep(edgeDistance, 0.04, 0.2);
          (trailMesh.material as THREE.MeshBasicMaterial).opacity = 0.51 * Math.max(edgeVisibility, currentProgress < 0.01 ? 0.55 : 0);
        }

        renderer.clear(true, true, true);
        renderer.render(backgroundScene, backgroundCamera);
        renderer.clearDepth();
        renderer.render(scene, camera);
      };

      animationFrame = window.requestAnimationFrame(animate);
    };

    void preload().catch((error) => {
      console.error("Depth gallery initialization failed", error);
      setFailed(true);
    });

    window.addEventListener("scroll", updateTargetProgress, { passive: true });
    window.addEventListener("resize", resize);
    rootElement.addEventListener("pointermove", onPointerMove, { passive: true });
    rootElement.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateTargetProgress);
      window.removeEventListener("resize", resize);
      rootElement.removeEventListener("pointermove", onPointerMove);
      rootElement.removeEventListener("pointerleave", onPointerLeave);
      planes.forEach((plane) => plane.material.dispose());
      textures.forEach((texture) => texture.dispose());
      trailMesh?.geometry.dispose();
      if (trailMesh) (trailMesh.material as THREE.Material).dispose();
      planeGeometry.dispose();
      backgroundMesh.geometry.dispose();
      backgroundMaterial.dispose();
      scene.clear();
      backgroundScene.clear();
      renderer.dispose();
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <section
      ref={root}
      className="depth-gallery"
      style={{ height: `${Math.max(items.length + 1, 6) * 100}dvh` } as CSSProperties}
      aria-label="Atmospheric depth visual gallery"
    >
      <div className="depth-gallery-sticky">
        <canvas ref={canvas} className="depth-gallery-canvas" aria-hidden="true" />

        <header className="depth-gallery-frame reveal">
          <p>Visual archive / Atmospheric depth</p>
          <p>Scroll to travel through the collection</p>
        </header>

        {items.map((item, index) => {
          const mood = moods[index % moods.length];
          return (
            <div
              className={`depth-gallery-label depth-gallery-label-${index % 2 === 0 ? "right" : "left"}`}
              data-depth-gallery-copy={index}
              aria-hidden={index !== 0}
              key={`copy-${item.slug}`}
              style={{
                color: mood.text,
                opacity: index === 0 ? 1 : 0,
                transform: `translate3d(0, ${index === 0 ? 0 : 28}px, 0)`,
              }}
            >
              <p>{String(index + 1).padStart(2, "0")}</p>
              <strong>{item.title}</strong>
              <small>{item.summary}</small>
              <time>{item.year}</time>
              <span style={{ backgroundColor: mood.accent }} aria-hidden="true" />
            </div>
          );
        })}

        {items.map((item, index) => {
          const mood = moods[index % moods.length];
          return (
            <a
              className="depth-gallery-entry"
              data-depth-gallery-entry={index}
              href={`/visual-archive/${item.slug}`}
              aria-label={`Open ${item.title} visual project`}
              aria-hidden={index !== 0}
              key={`entry-${item.slug}`}
              tabIndex={index === 0 ? 0 : -1}
              style={{
                color: mood.text,
                opacity: index === 0 ? 1 : 0,
                pointerEvents: index === 0 ? "auto" : "none",
                transform: `translate3d(0, ${index === 0 ? 0 : 18}px, 0)`,
              }}
            >
              <span>Check details</span>
            </a>
          );
        })}

        {!ready && !failed ? (
          <div className="depth-gallery-loader" role="status" aria-label="Loading visual gallery">
            <span />
          </div>
        ) : null}

        {failed ? (
          <div className="depth-gallery-fallback">
            <p>The interactive gallery needs WebGL.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

import * as THREE from "three";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { Physics, useSphere } from "@react-three/cannon";
import {
  Sky,
  Environment,
  Effects as EffectComposer,
  useTexture,
} from "@react-three/drei";
import { SSAOPass } from "three-stdlib";
import React from "react";

extend({ SSAOPass });

const rfs = THREE.MathUtils.randFloatSpread;
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const baubleMaterial = new THREE.MeshStandardMaterial({
  color: "red",
  roughness: 0,
  envMapIntensity: 0.2,
  emissive: "#370037",
});

function AppNew() {
  return (
  <Canvas
    shadows
    dpr={[1, 2]}
    camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 40 }}
  >
    <ambientLight intensity={0.25} />
    <spotLight
      intensity={1}
      angle={0.2}
      penumbra={1}
      position={[30, 30, 30]}
      castShadow
      shadow-mapSize={[512, 512]}
    />
    <directionalLight intensity={5} position={[-10, -10, -10]} color="purple" />
    <Physics gravity={[0, 2, 0]} iterations={10}>
      {/* <Pointer /> */}
      <Clump />
      <Button/>
    </Physics>
    <Environment files="/adamsbridge.hdr" />
    <Effects />
    <Sky />
  </Canvas>
  )
}

function Clump({
  mat = new THREE.Matrix4(),
  vec = new THREE.Vector3(),
  ...props
}) {
  const texture = useTexture("/cross.jpg");
  const [ref, api] = useSphere(() => ({
    args: [1],
    mass: 1,
    angularDamping: 0.1,
    linearDamping: 0.65,
    position: [rfs(20), rfs(20), rfs(20)],
  }));
  useFrame((state) => {
    for (let i = 0; i < 40; i++) {
      // Get current whereabouts of the instanced sphere
      ref.current.getMatrixAt(i, mat);
      // Normalize the position and multiply by a negative force.
      // This is enough to drive it towards the center-point.
      api
        .at(i)
        .applyForce(
          vec
            .setFromMatrixPosition(mat)
            .normalize()
            .multiplyScalar(-20)
            .toArray(),
          [0, 0, 0]
        );
    }
  });
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[null, null, 40]}
      geometry={sphereGeometry}
      material={baubleMaterial}
      material-map={texture}
    />
  );
}

function Pointer() {
  const viewport = useThree((state) => state.viewport);
  const [, api] = useSphere(() => ({
    type: "Kinematic",
    args: [3],
    position: [0, 0, 0],
  }));
  return useFrame((state) =>{
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      0
    )
  });
}

function Button(){
  const [ref, api] = useSphere(() => ({
    type: "Kinematic",
    args: [3],
    position: [0, 0, 0],
  }));
  const[clicked, setClicked] = React.useState(false)
  return (
    <mesh
      ref={ref}
      onClick={() => {
        setClicked(!clicked)
        if(clicked){
          api.position.set(0, 2, 0);
        }else{
          api.position.set(0, -2, 0);

        }
      }}
    >
      <sphereGeometry args={[1]} />
      <meshStandardMaterial color="red" roughness="0" envMapIntensity="0.2" emissive="#370037" />
    </mesh>
  );
}

function Effects(props) {
  const { scene, camera } = useThree();
  return (
    <EffectComposer {...props}>
      <sSAOPass
        args={[scene, camera, 100, 100]}
        kernelRadius={1.2}
        kernelSize={0}
      />
    </EffectComposer>
  );
}


export default AppNew;
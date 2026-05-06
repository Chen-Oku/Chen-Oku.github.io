---
title: "VFX Power-Ups in Unity"
description: "Third-person Unity project focused on interactive power-ups with custom shaders and synchronized particle effects."
date: "2026-04-25"
status: "Completed"
video: "/assets/images/projects/VFXPowerUps/PowerUps.mp4"
slug: "VFX-Powerups"
demoUrl: ""
repoUrl: "https://github.com/Chen-Oku/Checkpoint4"
category: "Personal"
tags:
  - Unity
  - C#
  - VFX
  - Shader Graph
  - URP
---

# VFX Power-Ups in Unity

> *"Visual communication is key in fast-paced gameplay. Players should know exactly what power they are getting before they even touch it."*

In this Technical Art project, I developed a modular **Power-Up VFX System** featuring three distinct abilities: Speed, Shield, and Cosmic Power. The core design philosophy was "what you see is what you get"—the collectible items themselves display a miniature version of the visual effects that will be applied to the player's character upon collection.

## Overview

### My Role & The Challenge
Acting as the **VFX Artist** and **Technical Artist**, my goal was to create visually striking, performant effects that clearly communicated their gameplay function. 

The challenge was blending multiple rendering techniques—scrolling textures in Shader Graph, fluid dynamics in particle systems, and mesh renderers—into cohesive prefabs that could be easily instantiated and parented to the player through C# logic.

## Visual Showcase: The 3 Power-Ups

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
  <figure class="m-0">
    <img src="/assets/images/projects/VFXPowerUps/ElectricVFX.gif" alt="Electric Speed Power-Up with lightning bolts and star flashes" class="rounded-lg shadow-md w-full h-auto object-cover aspect-square">
    <figcaption class="text-sm text-center mt-2 text-gray-500 italic">1. Voltaic Sprint: Lightning aura and star-shaped flashes.</figcaption>
  </figure>
  
  <figure class="m-0">
    <img src="/assets/images/projects/VFXPowerUps/WaterVFX.gif" alt="Aquatic Shield Power-Up with dynamic falling water drops" class="rounded-lg shadow-md w-full h-auto object-cover aspect-square">
    <figcaption class="text-sm text-center mt-2 text-gray-500 italic">2. Aquatic Aegis: Protective shield with gravity-affected water droplets.</figcaption>
  </figure>

  <figure class="m-0">
    <img src="/assets/images/projects/VFXPowerUps/CosmicVFX.gif" alt="Cosmic Black Hole Power-Up with scrolling textures and orbital rings" class="rounded-lg shadow-md w-full h-auto object-cover aspect-square">
    <figcaption class="text-sm text-center mt-2 text-gray-500 italic">3. Event Horizon: Scrolling cosmic shader overlay and orbital rings.</figcaption>
  </figure>
</div>

## Technical Deep Dive

### 1. The Cosmic Black Hole: Shader Graph & Overlays
For the "Black Hole" ability, I wanted to completely transform the player's silhouette. Instead of relying solely on particles, I created a custom Shader Graph that applies a scrolling cosmic texture over the player's mesh.

* **Scrolling Textures:** By animating the UV coordinates over time, the cosmos appears to be moving constantly, creating the illusion of a portal or void inside the player.
* **Orbital Elements:** I combined this shader with 3D ring meshes at the player's feet and a particle system emitting stars that get pulled towards the center.

```csharp
// 📄 Script: CosmicShaderController.cs
// 🎯 Logic: [AQUÍ PODEMOS PONER CÓMO APLICAS EL SHADER AL JUGADOR O EL TIMER DEL POWER UP]

// [INSERTA TU CÓDIGO AQUÍ]
```

#### 2 Aquatic Aegis: Particle Physics & Fluid Dynamics

The water shield required a tactile feel. I designed a particle system where water bursts surround the player, but the key feature is the droplet behavior.

* **Dynamic Gravity:** I utilized Unity's particle collision and gravity modifier modules to ensure that as the water bursts upwards, heavy droplets fall back down and react dynamically to the ground plane, mimicking real fluid mass.

#### 3 Voltaic Sprint: Trails & High-Frequency Particles

To communicate "Speed," the electric power-up relies on sharp, high-frequency particle emission and persistent visual tracking.

* **Blue Trail Renderer:** The player leaves a distinct blue trail behind them while moving, providing immediate feedback of their enhanced speed.

* **Lightning Emission:** Randomized lightning bolts and star bursts were configured with very short lifetimes and burst emissions to create a chaotic, energetic aura.

#### Integration System
All power-ups share a unified C# interface. When the player enters the trigger collider of the collectible, the system reads the power-up type, instantiates the corresponding VFX prefab as a child of the player, applies any specific material overrides (like the Cosmic shader), and starts a duration timer. Once the timer expires, the effects are cleanly destroyed or faded out.

## Try it out

## Repository

Source code and project files are available in GitHub:
<div class="flex flex-wrap gap-4 mt-6 mb-8">
  <a href="https://github.com/Chen-Oku/Checkpoint4" target="_blank" class="px-6 py-3 bg-cyan-800 text-white font-bold rounded-lg hover:bg-zinc-700 transition-colors no-underline">
    💻 View Source on GitHub
  </a>
</div>


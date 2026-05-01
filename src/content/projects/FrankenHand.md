---
title: "Frankenhand (Demo)- A 2D/3D Puzzle Platformer"
description: "A narrative platformer where a severed hand defies its creator. I acted as Development Team Lead, Technical Artist, and UI Designer."
date: "2025-06-15"
status: "Completed"
image: "/assets/images/projects/FrankenHand/FrankenHand.jpg"
slug: "FrankenHand"
demoUrl: "https://chenoku.itch.io/frankenhand"
repoUrl: "https://github.com/Chen-Oku/FrankenHand"
tags:
  - Unity
  - Technical Art
  - Team Lead
  - C#
  - UI/UX
---

# FrankenHand

>*"A severed hand, a life instinct and a destiny that defies creation."* 

**FrankenHand** is a gothic, colorful thriller platformer inspired by the classic Frankenstein tale, but with a twist: the spotlight is on a forgotten, severed limb. After his creature's break out from Dr. Frankenstein's lab, a piece is left behind… a severed hand, scared but with a clear decision.

<figure class="my-8">
  <img src="/assets/images/projects/FrankenHand/FrankenHand3.jpg" alt="FrankenHand gameplay screenshot showing the 2D hand character in a 3D gothic environment" class="w-4/5 mx-auto rounded-lg shadow-lg">
  <figcaption class="text-sm text-center mt-2 text-gray-500 italic">FrankenHand in action: 2D protagonist navigating through 3D gothic environments.</figcaption>
</figure>

## Overview

Describe the goal of the project, who it was for, and what problem it solved.

### My Role & The Challenge

In this project, I wore multiple hats as the **Development Team Lead**, **Technical Artist**, and **UI Designer**. 

The core challenge that defined our game was our art direction: the animation is made out entirely in 2D whereas the environment itself is 3D. This inverse approach to classic gaming required building a unique technical pipeline from scratch.

### Technical Deep Dive

#### 1. Technical Art: Dynamic Outline System & Lighting
To ensure our 2D protagonist remained visible within the dense, 3D gothic environments, I developed a custom outline system. Rather than relying solely on a basic shader, I wrote a C# controller that dynamically adjusts the rendering depth (_ZTest) properties of the materials in real-time.

```csharp
// Managing different rendering depth modes
switch (outlineMode)
{
    case Mode.OutlineVisible:
        outlineMaskMaterial.SetFloat("_ZTest", (float)UnityEngine.Rendering.CompareFunction.Always);
        outlineFillMaterial.SetFloat("_ZTest", (float)UnityEngine.Rendering.CompareFunction.LessEqual);
        outlineFillMaterial.SetFloat("_OutlineWidth", outlineWidth);
        break;

    case Mode.OutlineAndSilhouette:
        outlineMaskMaterial.SetFloat("_ZTest", (float)UnityEngine.Rendering.CompareFunction.LessEqual);
        outlineFillMaterial.SetFloat("_ZTest", (float)UnityEngine.Rendering.CompareFunction.Always);
        outlineFillMaterial.SetFloat("_OutlineWidth", outlineWidth);
        break;
}
```

<figure class="my-8">
  <img src="/assets/images/projects/FrankenHand/HiddingHand.gif" alt="Dynamic outline system demonstration showing the hand character becoming visible and invisible with the custom shader" class="w-3/5 mx-auto rounded-lg shadow-lg">
  <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Dynamic Outline System: Real-time depth adjustments for 2D character visibility.</figcaption>
</figure>

This approach allowed us to create distinct rendering states giving the player perfect spatial awareness. I complemented this technical solution with a lighting strategy that contrasts warm general lighting with cold tones, naturally attracting the player's eye to elements of interest.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <figure class="m-0">
    <img src="/assets/images/projects/FrankenHand/FrankenHand4.jpg" alt="Frankenhand Cold Ambient Lighting" class="rounded-lg shadow-md w-full h-auto object-cover aspect-video">
    <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Setting the Mood: Cold cyan tones for a gothic atmosphere.</figcaption>
  </figure>
  <figure class="m-0">
    <img src="/assets/images/projects/FrankenHand/FrankenHand5.jpg" alt="Frankenhand Warm Focal Lighting" class="rounded-lg shadow-md w-full h-auto object-cover aspect-video">
    <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Guiding the Player: Fuchsia tones highlight key focal points.</figcaption>
  </figure>
</div>

#### 2. Gameplay Programming: Architecture & Systems

##### Modular 2D-in-3D Controller
Building a 2D character in a 3D world requires precise control over visuals and physics. I designed a modular character controller architecture where movement, animations, and interactions are decoupled into separate scripts, managed by a central `PlayerController`.  

For the movement mechanics, I implemented modern platforming features like Coyote Time and directional dashing. One of the unique challenges was ensuring the 2D sprite felt natural while traversing the Z-axis. I solved this by constantly interpolating the sprite's transform to face the target movement direction seamlessly.

```csharp
// Smoothly rotating the 2D sprite in 3D space
if (targetDirection.sqrMagnitude > 0.01f)
{
    // Calculate the target rotation based on the 3D movement vector
    Quaternion targetFlip = Quaternion.LookRotation(targetDirection);
    
    // Smoothly interpolate the sprite's rotation to prevent snappy, robotic turns
    spriteVisualTransform.localRotation = Quaternion.Slerp(
        spriteVisualTransform.localRotation,
        targetFlip,
        10f * Time.deltaTime 
    );
}
```

#### Environmental Hazards & Enemy AI
Beyond the core controller, I led the development of several mechanics to bring the gothic environment to life and create a tense puzzle-platforming experience:

* **Dynamic Platforming:** I programmed the logic for towers of books that crumble upon landing, forcing the player to act quickly and chain double jumps.
* **Hazard Systems:** I developed a warning system where falling bottles project a shadow on the ground before impact, allowing the player to dodge in time.
* **Enemy States:** I created paralyzing mechanics for the cockroaches; if they get too close, the hand freezes temporarily, hindering movement.

<figure class="my-8">
  <img src="/assets/images/projects/FrankenHand/FallingBottle.gif" alt="Hazard system in action showing a bottle falling with shadow projection warning" class="w-3/5 mx-auto rounded-lg shadow-lg">
  <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Environmental Hazards: Shadow projection system warning players of falling dangers.</figcaption>
</figure>

#### 3. UI/UX Design
As the UI Designer, I created a completely 2D user interface. A major part of the narrative relies on finding notes from Dr. Frankenstein. I programmed a pop-up system for these diary fragments that allows players to uncover the lore seamlessly without interrupting fast-paced moments, such as the final escape sequence from the cat.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <figure class="m-0">
    <img src="/assets/images/projects/FrankenHand/MainMenu.gif" alt="Animated 2D purple book opening to reveal the Frankenhand main menu" class="rounded-lg shadow-md w-full h-auto object-cover aspect-video">
    <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Diegetic Main Menu: Interactive 2D book setting the narrative tone.</figcaption>
  </figure>

  <figure class="m-0">
    <img src="/assets/images/projects/FrankenHand/FHInventory.jpg" alt="2D illustrated book interface displaying an inventory grid, a collected key, and lore text" class="rounded-lg shadow-md w-full h-auto object-cover aspect-video">
    <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Inventory Hub: Custom 2D interface to review items and lore.</figcaption>
  </figure>

  <figure class="m-0">
    <img src="/assets/images/projects/FrankenHand/Notes.gif" alt="Gameplay animation of a 2D parchment note popping up smoothly on screen" class="rounded-lg shadow-md w-full h-auto object-cover aspect-video">
    <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Non-Intrusive Lore: Pop-ups reveal the story without breaking flow.</figcaption>
  </figure>

  <figure class="m-0">
    <img src="/assets/images/projects/FrankenHand/FHInteract.jpg" alt="Severed hand character next to a highlighted book with a UI prompt reading Press J to Push" class="rounded-lg shadow-md w-full h-auto object-cover aspect-video">
    <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Contextual UI Prompts: Clean button prompts for interactable objects.</figcaption>
  </figure>
</div>

### Leadership & Soft Skills

Working on FrankenHand was a deeply collaborative experience. The art team pitched the 2D-in-3D concept without knowing exactly how it would work, and there wasn't a predefined path. 

Artists and developers joined forces, and as the Development Lead, I helped build the workflow to make it happen.

### Try it out
<div class="flex flex-wrap gap-4 mt-6 mb-8">
  <a href="https://chenoku.itch.io/frankenhand" target="_blank" class="px-6 py-3 bg-purple-800 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors no-underline">
    🎮 Play the Demo on Itch.io
  </a>
  <a href="https://github.com/Chen-Oku/FrankenHand" target="_blank" class="px-6 py-3 bg-cyan-800 text-white font-bold rounded-lg hover:bg-zinc-700 transition-colors no-underline">
    💻 View Source on GitHub
  </a>
  <a href="https://canva.link/md3tk76gaz508z0" target="_blank" class="px-6 py-3 bg-purple-800 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors no-underline">
    📊 Check out our Pitch Deck
  </a>
</div>

---
title: "Frankenhand (Demo)- A 2D/3D Puzzle Platformer"
description: "A narrative platformer where a severed hand defies its creator. I acted as Development Team Lead, Technical Artist, and UI Designer."
date: "2025-06-15"
status: "Completed"
image: "/assets/images/projects/FrankenHand/FrankenHand.png"
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

*"A severed hand, a life instinct and a destiny that defies creation."* 

**FrankenHand** is a gothic, colorful thriller platformer inspired by the classic Frankenstein tale, but with a twist: the spotlight is on a forgotten, severed limb. After his creature’s break out from Dr. Frankenstein's lab, a piece is left behind… a severed hand, scared but with a clear decision.

![Captura ING](/assets/images/projects/FrankenHand/FrankenHand3.jpg)

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

![Captura Outline Hidding Hand](/assets/images/projects/FrankenHand/HiddingHand.gif)

This approach allowed us to create distinct rendering states giving the player perfect spatial awareness. I complemented this technical solution with a lighting strategy that contrasts warm general lighting with cold tones, naturally attracting the player's eye to elements of interest.

<figure>
  <img src="/assets/images/projects/FrankenHand/FrankenHand4.jpg" alt="Frankenhand Cold Ambient Lighting">
  <figcaption>*A nocturnal setting where warm light sources pierce the darkness, establishing a tense, gothic atmosphere.*</figcaption>
</figure>


<figure>
  <img src="/assets/images/projects/FrankenHand/FrankenHand5.jpg" alt="Frankenhand Warm Focal Lighting">
  <figcaption>*Fuchsia tones are strategically used to highlight key focal points and interactive elements, while volumetric fog enhances the environmental ambiance.*</figcaption>
</figure>

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

![Captura botella al caer](/assets/images/projects/FrankenHand/FallingBottle.gif)

#### 3. UI/UX Design
As the UI Designer, I created a completely 2D user interface. A major part of the narrative relies on finding notes from Dr. Frankenstein. I programmed a pop-up system for these diary fragments that allows players to uncover the lore seamlessly without interrupting fast-paced moments, such as the final escape sequence from the cat.

### Leadership & Soft Skills

Working on FrankenHand was a deeply collaborative experience. The art team pitched the 2D-in-3D concept without knowing exactly how it would work, and there wasn’t a predefined path. 

Artists and developers joined forces, and as the Development Lead, I helped build the workflow to make it happen.

### Try it out
* [**View Source Code on GitHub**](https://github.com/Chen-Oku/FrankenHand)
* [**Play the Demo from Itch.io**](https://chenoku.itch.io/frankenhand)
* [**Check out our Pitch Deck**](https://www.canva.com/design/DAGpjDjwRWo/BJMhdu7qZ4bPBcFqv9V1nQ/edit)
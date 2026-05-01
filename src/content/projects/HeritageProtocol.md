---
title: "HeritageProtocol (Demo)- Sci-Fi Exploration & Puzzle Game"
description: "A sci-fi puzzle exploration game. I served as Development Lead, Technical Artist, and Gameplay Programmer, focusing on advanced custom shaders and interaction systems."
date: "2025-12-25"
status: "Completed"
image: "/assets/images/projects/HeritageProtocol/HeritageProtocol.jpg"
slug: "HeritageProtocol"
demoUrl: "https://chenoku.itch.io/heritageprotocol"
repoUrl: "https://github.com/Chen-Oku/HeritageProtocol/tree/M-Branch"
tags:
  - Unity
  - Technical Art
  - Team Lead
  - C#
  - UI/UX
---

# HeritageProtocol

>Uncover the secrets of the past through the lens of advanced technology. **Heritage Protocol** is a sci-fi exploration and puzzle game that challenges players to uncover hidden truths within an ancient, abandoned facility. By using advanced tech tools, players interact with the environment to reveal concealed messages, solve spatial puzzles, and piece together a forgotten history.

<figure class="my-8">
  <video 
    controls 
    playsinline 
    poster="/assets/images/projects/HeritageProtocol/HeritageMainMenu.jpg" 
    aria-label="Official gameplay trailer for Heritage Protocol" 
    class="w-full rounded-lg shadow-lg"
  >
    <source src="/assets/images/projects/HeritageProtocol/TrailerHeritageProtocol.mp4" type="video/mp4">
    Your browser does not support the video tag. This is the official gameplay trailer for Heritage Protocol.
  </video>
  
  <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Heritage Protocol - Official Gameplay Trailer</figcaption>
</figure>

## Overview


### My Role & The Challenge

In this project, I stepped into the role of **Development Team Lead**, while heavily focusing on **Technical Art** and **Gameplay Programming**.

The main challenge was visual communication: the game required a distinct stylized look and complex visual feedback to indicate interactable objects, hidden secrets and story progression. To achieve this, I built a robust library of custom shaders using Unity’s Shader Graph and integrated them seamlessly with C# gameplay systems.

### Technical Deep Dive

#### 1. Technical Art: Advanced Custom Shaders
As a Technical Artist, I was responsible for defining the visual signature of the interactive elements. I developed several custom shaders from scratch, including Toon shading with halftone patterns, holographic fences, and glitch effects.

One of our core features was the **"Reveal" Mechanic**: a puzzle involving a "dirty" surface that, when illuminated by a specific light source, revealed its true, clean texture underneath.

```csharp
// Surface Reveal Mechanic, Raycasting to UV coordinates and painting the texture mask
Ray ray = _camera.ScreenPointToRay(screenPosition);
if (Physics.Raycast(ray, out RaycastHit hit))
{
    // 1. Get UV coordinates from the raycast hit
    Vector2 uv = hit.textureCoord;

    // 2. Map UVs to pixel coordinates on our downscaled mask for performance
    int px = Mathf.RoundToInt(uv.x * (_maskWidth - 1));
    int py = Mathf.RoundToInt(uv.y * (_maskHeight - 1));

    // 3. PaintAt() Logic: Apply a circular brush falloff to modify the mask's pixels
    float dist = Mathf.Sqrt(dx * dx + dy * dy);
    float t = 1f - (dist / brushRadius); // 1 at center -> 0 at edge
    float delta = Mathf.Clamp01(t * _brushStrength);

    // Uniformly subtract color to "clean" the mask smoothly
    _pixels[idx].r = (byte)Mathf.RoundToInt(_pixels[idx].r * (1f - delta));
    _pixels[idx].g = (byte)Mathf.RoundToInt(_pixels[idx].g * (1f - delta));
    _pixels[idx].b = (byte)Mathf.RoundToInt(_pixels[idx].b * (1f - delta));
    
    _maskDirty = true; // Flags the texture to Apply() in batches
}
```

#### The Shader Graph Implementation
The C# script passes this dynamically generated mask _DarkTex to a custom Shader Graph I developed. The shader uses the mask's values to interpolate between the dirt material and the clean surface seamlessly.

<figure class="my-8">
  <img src="/assets/images/projects/HeritageProtocol/HeritageSurfaceReveal.gif" alt="Surface reveal mechanic demonstration showing the dirt surface being cleaned by light" class="w-3/5 mx-auto rounded-lg shadow-lg">
  <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Surface Reveal Mechanic: Players use light to uncover hidden information.</figcaption>
</figure>

<figure class="my-8">
  <img src="/assets/images/projects/HeritageProtocol/ShaderDirty.jpg" alt="Shader graph for dirt material" class="w-3/5 mx-auto rounded-lg shadow-lg">
  <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Shader Graph for Dirt Material: Custom shader for the surface reveal mechanic.</figcaption>
</figure>

#### 2. Gameplay Programming: Events & Systems

##### Proximity-Based Fading Statues
A key mission required players to inspect four mysterious statues. To make this encounter feel eerie and supernatural, I programmed a proximity system where the statues gradually dissolve and fade away as the player approaches them, eventually triggering the next quest phase.

**The C# Logic: Performance & Decoupled Systems**
Animating shader properties on multiple objects can quickly degrade performance if not handled correctly. Instead of modifying instance materials directly (which breaks draw-call batching), I utilized `MaterialPropertyBlock` to update the dissolve float seamlessly. 

Additionally, I implemented an event-driven architecture using C# `Actions`. This allowed the statues to broadcast their dissolved state without tightly coupling them to the Mission Manager.

```csharp
// SculptureDisolve
// Performant shader animation and event-driven quest updates

private void SetDissolveValue(float value)
{
    // Using MaterialPropertyBlock prevents material instancing, saving memory and draw calls
    foreach (var rend in targetRenderers)
    {
        var mpb = new MaterialPropertyBlock();
        rend.GetPropertyBlock(mpb);
        mpb.SetFloat(propID, value); 
        rend.SetPropertyBlock(mpb);
    }
}

private IEnumerator HideAfterDelay(float seconds)
{
    yield return new WaitForSeconds(seconds);
    targetChild.SetActive(false);

    if (!hasDissolved)
    {
        hasDissolved = true;
        // Broadcast completion to decoupled systems (like the UI or Quest Manager)
        OnSculptureDissolved?.Invoke(this);
    }
}
```
#### The Shader Graph Setup
The visual aspect of the fade was built in Shader Graph. It takes the _Dissolve float from the C# script and subtracts it from a generated Simple Noise node. This result is fed into the material's Alpha Clip threshold, while also generating a glowing emissive edge along the clipping border to enhance the sci-fi aesthetic.

<figure class="my-8">
  <img src="/assets/images/projects/HeritageProtocol/HeritageSculptureDissolve.gif" alt="Dissolve effect demonstration showing statues fading away" class="w-3/5 mx-auto rounded-lg shadow-lg">
  <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Sculpture Dissolve Effect: Sci-fi aesthetic with glowing edge and clipping border.</figcaption>
</figure>

<figure class="my-8">
  <img src="/assets/images/projects/HeritageProtocol/ShaderDissolve.jpg" alt="Shader graph for dissolve effect" class="w-3/5 mx-auto rounded-lg shadow-lg">
  <figcaption class="text-sm text-center mt-2 text-gray-500 italic">Shader Graph for Dissolve Effect: Custom shader for the sculpture dissolve mechanic.</figcaption>
</figure>

#### Additional Systems Engineered
* **Beyond the shaders**: I engineered the underlying logic for the game's core progression systems:

* **Dynamic Minimap**: Implemented a real-time minimap UI that tracks the player's proximity to objectives and hidden items.

* **Teleportation Network**: Created a modular teleporter system to handle player traversal across the facility.

* **Cinematics Integration**: Scripted the logic to trigger and transition smoothly between gameplay and the intro/outro cinematics.


#### 3. Mission UI & Minimap
To guide the player without overwhelming the screen, I developed a clean, sci-fi-inspired UI. The interface includes a functional minimap positioned below the active mission objectives, providing real-time proximity alerts to search items and clear interactable prompts.

#### Leadership & Project Management
Managing the pipeline between the 3D modeling team, animators, and programmers required strict organization. By establishing clear documentation (GDDs), utilizing shared Google Drive hubs, and maintaining open communication, we ensured that the art assets seamlessly integrated with the technical constraints of my custom shaders and scripts.


### Try it out
<div class="flex flex-wrap gap-4 mt-6 mb-8">
  <a href="https://chenoku.itch.io/HeritageProtocol" target="_blank" class="px-6 py-3 bg-[#54abb2] text-white font-bold rounded-lg hover:bg-[#66cfd8] transition-colors no-underline">
    🎮 Play the Demo on Itch.io
  </a>
  <a href="https://github.com/Chen-Oku/HeritageProtocol/tree/M-Branch" target="_blank" class="px-6 py-3 bg-cyan-800 text-white font-bold rounded-lg hover:bg-zinc-700 transition-colors no-underline">
    💻 View Source on GitHub
  </a>
  <a href="https://canva.link/f7k451wh9u8k06c" target="_blank" class="px-6 py-3 bg-[#54abb2] text-white font-bold rounded-lg hover:bg-[#66cfd8] transition-colors no-underline">
    📊 Check out our Pitch Deck
  </a>
</div>

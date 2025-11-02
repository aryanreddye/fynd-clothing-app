# AR Models Directory

This directory contains the 3D model files (`.glb` format) for the AR Try-On feature.

## File Naming Convention

Each model file should match its corresponding image filename:
- Image: `img1.png` → Model: `img1.glb`
- Image: `img2.jpg` → Model: `img2.glb`
- Image: `img1.5.jpg` → Model: `img1.5.glb`

## Supported Formats

- `.glb` (glTF Binary) - Recommended format for model-viewer
- `.gltf` (glTF JSON) - Also supported

## Current Products

The following images in `/images/` directory need corresponding models:

1. `img1.png` → `img1.glb`
2. `img2.jpg` → `img2.glb`
3. `img3.jpg` → `img3.glb`
4. `img4.jpg` → `img4.glb`
5. `img5.jpg` → `img5.glb`
6. `img6.jpg` → `img6.glb`
7. `img7.jpg` → `img7.glb`
8. `img8.jpg` → `img8.glb`
9. `img9.jpg` → `img9.glb`
10. `img10.jpg` → `img10.glb`
11. `img11.jpg` → `img11.glb`
12. `img12.jpg` → `img12.glb`
13. `img13.jpg` → `img13.glb`
14. `img14.jpg` → `img14.glb`
15. `img15.jpg` → `img15.glb`
16. `img1.1.png` → `img1.1.glb`
17. `img1.2.png` → `img1.2.glb`
18. `img1.3.png` → `img1.3.glb`
19. `img1.4.png` → `img1.4.glb`
20. `img1.5.jpg` → `img1.5.glb`
21. `img1.6.png` → `img1.6.glb`
22. `img1.7.jpg` → `img1.7.glb`
23. `img1.8.png` → `img1.8.glb`

## Model Requirements

- File size: Keep models under 10MB for optimal performance
- Texture resolution: Recommended 2048x2048 or lower
- Polygon count: Optimize for mobile devices (keep under 50K triangles)
- Scale: Models should be sized appropriately for AR viewing

## Notes

- Place your `.glb` files directly in this directory
- The AR viewer will automatically load models based on the image filename
- If a model doesn't exist, the AR viewer will show an error message


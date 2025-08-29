- [x] generate the scene
- [x] import the model
- [x] add camera, lighting, helpers, onresize function
- [x] tweak camera, clean up code
- [ ] test baking procedural material

procedural materials:
visualize everything in solid view using "Texture" option to see grid texture created earlier as image texture
- [ ] create new UV map for baking -> **higlight it when creating all the seams**
    - [ ] UV unwrap with min. seams possible -> think of everything as a cube, cylinder/ring
    - [ ] turn on UV stretch in overlays to see and minimize stretch (distortion/stretch is fine for uniform colors)
    - [ ] try smart UV project 
objects having similar geometries can copy UV maps from the well unwrapped one (e.g. subdivided geometry)  
- [ ] create image texture (4K, full white, no alpha if nothing transparent, 32-bit float) and save as Radiance HDR
- [ ] ...

- [ ] add other lights to get similar lighting as blender
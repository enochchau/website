---
title: Projector Buddy
slug: projector-buddy
date: June 2020
---

# Projector Buddy

## California Plug Load Center: March 2019 - June 2020

- [**calplug**](http://calplug.org/)
- [**calit2**](https://www.calit2.uci.edu/)

Projector Buddy is an advanced energy system that controls a projectors
electricity usage based on human presence in the room. Human activity is
determined through light, sound, and motion. In order to preserve the projectors
internal electronics and bulb, a soft shutdown is initiated using an IR blaster.

My primary contribution was firmware development. I implemented freeRTOS
firmware, updated the control algorithm, and created IR Receiver and IR Emitter
functionality.

![topdown view](/images/projectorBuddy/topV2.webp)

![side view](/images/projectorBuddy/side.webp)

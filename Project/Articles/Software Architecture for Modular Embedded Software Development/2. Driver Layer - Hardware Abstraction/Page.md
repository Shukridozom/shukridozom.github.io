# 2. Driver Layer Hardware Abstraction

This layer is responsible about isolating the other layers (component - application) from the hardware / microcontroller, and this works by providing fixed APIs / ISRs signatures for them to consume instead of directly accessing the microcontroller .So when we change the microcontoller, we don't need to change or reimplement theses layers, instead, we reimpleement only the driver layer for that new microcontroller

To design this layer we need to understand / define the level of the interaction with the hardware, for bare-metal/RTOS microcontrollers, there are two main interactions with them

1. Software touches the perhipheral (from software to hardware)
2. CPU sends interrupts which will be handeled by the ISRs (from hardware to software)

![Architecture Layers](assets/Interaction_with_microcontrollers.png)

So, to acheive the hardware abstraction, we Implement APIs for direct hardware register access and CPU interrupt handling (ISRs).And to acheive this we use **C Programming Language** for acheiving maximum performance

Every driver / module unit will be consisting of

- Header files
  - Every driver should have a header file that exposes the dirver APIs / ISRs declarations.
  - These APIs can be functions, macros, or inline functions.
  - This file represents the interface for other layers
  - It is also optional to arrage related things in spearated header files (for example, gathering the APIs in one header file, and the ISRs inside another one)
- Source files ( .c files )
  - These files will contain the actual implmentation for the driver APIs / ISRs
  - You need to provide a "weak" attribute for the ISRs default implementation, so when the developer implements its callback in their application, they doesn't get a linker error (multiple definition for a single function)

The driver layer implementation can be done in one of two ways:

### 1. Directly access hardware registers and define interrupt vector handlers

This will give the best performance, as you avoid any functions call overhead, however, this will slow the development as you have to go on for the low level development. You may choose this approach for critical drivers where performance is very critical

### 2. Wrap existing hardware-abstraction APIs and ISR callbacks provided by the underlying library

- This way is better for accelerating the development and relying on existing drviers libraries (you wrap the library APIs by your driver's APIs, and your driver ISRs with by the ISRs / Callbacks of the library).
- This approach have two extra benefits as well
  - you can rely on macros provided by the library to implement a single driver for multiple microcontrollers (from the same family for example)
  - you can benefit from code-generation tools that abstracts you from configuring the peripheral, (for exmaple, stm32cubemx for stm32 microcontrollers)
- howeve, while this approach accelerates the development, it will affect the performance a little bit due to the extra function calls, so it is a trade off.

---
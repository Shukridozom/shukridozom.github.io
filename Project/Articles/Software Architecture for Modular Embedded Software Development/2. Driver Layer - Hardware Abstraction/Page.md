# 2. Driver Layer: Hardware Abstraction

This layer isolates the component and application layers from the hardware and microcontroller. It does that by exposing fixed APIs and ISR signatures for those layers to use, instead of letting them access the microcontroller directly. When you change the microcontroller, you do not need to change or reimplement the upper layers—you reimplement only the driver layer for the new device.

To design this layer, define how software interacts with the hardware. On bare-metal and RTOS-based microcontrollers, there are two main interactions:

1. Software touches the peripheral (software to hardware)
2. The CPU raises interrupts that ISRs handle (hardware to software)

![Architecture Layers](assets/Interaction_with_microcontrollers.png)

To achieve hardware abstraction, implement APIs for direct hardware register access and for CPU interrupt handling (ISRs). Use **C** for this layer so you can get maximum performance.

Every driver module consists of:

- **Header files**
  - Each driver should expose its API and ISR declarations in a header.
  - These APIs can be functions, macros, or inline functions.
  - This file is the interface for the other layers.
  - You can optionally split related declarations across headers—for example, APIs in one file and ISRs in another.
- **Source files (`.c` files)**
  - These files contain the actual implementation of the driver APIs and ISRs.
  - Give ISR default implementations the `weak` attribute so that when a developer provides a callback in the application, the linker does not report a multiple-definition error.

You can implement the driver layer in one of two ways:

### 1. Access hardware registers directly and define interrupt vector handlers

This gives the best performance because you avoid extra function-call overhead. The trade-off is slower development, since you work at a low level. Prefer this approach for critical drivers where performance matters most.

### 2. Wrap existing hardware-abstraction APIs and ISR callbacks from an underlying library

This approach speeds up development by relying on existing driver libraries. You wrap the library APIs with your driver’s APIs, and map your driver ISRs to the library’s ISRs or callbacks.

It also has two extra benefits:

- You can use macros from the library to implement a single driver for multiple microcontrollers (for example, devices in the same family).
- You can use code-generation tools that configure peripherals for you (for example, STM32CubeMX for STM32 devices).

The cost is a small performance hit from the extra function calls. That is the trade-off: faster development versus slightly lower performance.

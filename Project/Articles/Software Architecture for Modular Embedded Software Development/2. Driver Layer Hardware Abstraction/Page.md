# 2. Driver Layer Hardware Abstraction

- Implement APIs for direct hardware register access and CPU interrupt handling (ISRs).
- Implement drivers in one of two ways:
    - Directly access hardware registers and define interrupt vector handlers.
    - Wrap existing hardware abstraction APIs and ISR callbacks provided by the underlying library.

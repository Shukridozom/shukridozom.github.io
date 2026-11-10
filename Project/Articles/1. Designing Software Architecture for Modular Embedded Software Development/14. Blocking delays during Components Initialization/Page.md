# 14. Blocking delays during Components Initialization

Because interrupts are disabled during initialization, any blocking delays required before initializing components (e.g., allowing the I2C peripheral time to become ready before starting transmission) must be implemented using one of the following approaches:
- **CPU Cycle Counting:** Use CPU cycle counting to implement blocking delays without relying on timer interrupts. This approach is suitable when all interrupts are disabled.
- **General-Purpose Timer:** Keep a general-purpose timer interrupt enabled while disabling all other interrupts, and use that timer to implement the required blocking delays. This approach allows time-based delays without enabling unrelated interrupts that could access uninitialized objects.

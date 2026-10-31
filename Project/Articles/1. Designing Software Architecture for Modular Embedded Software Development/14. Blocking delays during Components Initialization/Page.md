# 14. Blocking delays during Components Initialization

Because interrupts are disabled during initialization, any blocking delays required before initializing components (e.g., allowing the I2C peripheral time to become ready before starting transmission) must not depend on timer interrupts. Instead, these delays should be implemented using CPU cycle counting.

# 5. Preventing ISRs from Accessing Uninitialized Objects

- **Problem:** ISR callbacks may execute before the objects they depend on are initialized.
- **Solution:** Disable all interrupts, or at least all relevant interrupts, before initializing the singleton, and re-enable them only after initialization is complete.

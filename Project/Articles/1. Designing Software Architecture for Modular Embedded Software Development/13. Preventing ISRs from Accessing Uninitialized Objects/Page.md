# 13. Preventing ISRs from Accessing Uninitialized Objects

- **Problem:** ISR callbacks may execute before the objects they depend on are initialized.
- **Solution:** Disable all interrupts, or at least all relevant interrupts, before initializing the singleton, and re-enable them only after initialization is complete.s
- **Note:** However, some components may require blocking delays during initialization. As discussed in the next article, this may require keeping a general-purpose timer interrupt enabled while disabling other interrupts.

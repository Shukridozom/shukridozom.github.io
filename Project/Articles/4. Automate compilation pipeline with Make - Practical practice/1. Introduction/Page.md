# 1. Introduction

In this series of articles, we’ll explore how to automate the compilation pipeline using **Make**, starting with the fundamentals and gradually moving toward a practical implementation.

![Compilation Pipeline](assets/compilation-process.png)

We’ll cover the following topics:

- **Understanding the compilation pipeline**

   We’ll go through the main compilation phases: preprocessing, compilation, assembling, and linking. For each phase, we’ll explain how it works, what its input and output are, and how it contributes to generating the final executable.

- **Interacting with the toolchain**

   First, we’ll interact with the individual toolchain tools to understand how each one works and what its input and output are. Then, we’ll move on to using the compiler driver, which coordinates these tools and triggers the required compilation phases behind the scenes.

   Through this process, we’ll establish the overall build flow: each source or assembly file is processed into an object file, then all object files are linked together with the linker script to generate the final executable.

- **Automating the build process with Make**

   Once we understand how the compilation pipeline works and how to interact with the toolchain, we’ll explore how **Make** can automate the entire build process. This will eliminate the need to compile source files manually and allow us to manage dependencies and rebuild only what is necessary.

- **Building a practical Make-based build system**

   Finally, we’ll put everything together in a practical example by creating a Make-based build system for an **STM32CubeIDE project**. Our goal is to reproduce the build process and generate exactly the same build output as STM32CubeIDE, but using our own Make-based build system.

By the end of this series, you’ll have a better understanding of what happens behind the scenes during compilation and how to build and manage an embedded project independently of the IDE.
# 12. Deploying Components and Drivers

Explore two approaches for distributing and integrating the output of the Component and Driver layers:
- **Source Code:**
    - Suitable for early development phases where urgent fixes or modifications to the implementation may be required.
    - Offers toolchain flexibility, as the source code is compiled by the developer using the target project's compiler and build environment.
- **Static Libraries:**
    - Provide immutable, precompiled versions of the implementation, preventing direct modification of the original source code.
    - Are tied to the target hardware and compiler toolchain, limiting compatibility with projects using different toolchains or platforms.
    - Require rebuilding the library for incompatible target environments.
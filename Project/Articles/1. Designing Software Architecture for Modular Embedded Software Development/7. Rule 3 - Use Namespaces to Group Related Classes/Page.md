# 7. Rule 3 - Use Namespaces to Group Related Classes

This rule is simple, each component should have a single namespace that groups all the types related to that component.

This namespace contains the component's main class, any sub-classes, and its related data types.

Using namespaces allows us to organize these types under a common scope and avoid naming conflicts between components, without having to introduce unnecessary prefixes or suffixes to class and data type names.

This keeps each component's types grouped together and maintains a consistent naming convention across the architecture.

---

However, this rule is not just about code organization; it is a requirement when integrating multiple components into the same application.

When you add multiple components as dependencies to your project, their source code is pulled into the project and compiled together. If two or more components define types with the same name, such as Status_t, these definitions will conflict and result in compilation errors.

The only workaround in this case would be to modify the source code of the conflicting components to rename their types. However, this goes against one of the main principles of our architecture: components should be independent, reusable, and immutable units. We should be able to pull a component and integrate it into an application without having to modify its source code.

This becomes even more important when distributing components as **static libraries** (as we'll discuss later). In this case, the source code is not available to the application, so modifying conflicting definitions is not even an option.

Therefore, using a dedicated namespace for each component is not just a naming convention; it is essential to ensure that components can be independently developed, packaged, and integrated without introducing naming conflicts or requiring modifications to their source code.
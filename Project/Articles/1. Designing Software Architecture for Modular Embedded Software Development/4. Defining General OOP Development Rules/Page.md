# 4. Defining General OOP Development Rules

In the previous article, we decided to go with the OOP approach to design and develop the units of the Component layer.

However, in the embedded development domain, we can’t just apply any software principles blindly, as we’re dealing with limited resources and interacting with hardware peripherals. Therefore, we should always keep an eye on performance and monitor where objects and variables are allocated.

For this reason, we will establish some consistent rules for developing classes in the Component layer:

1. **Use a single constructor.**
    
    We want to provide a single way to create each object, especially if the component requires hardware access. This helps keep the initialization process consistent and ensures that all required dependencies and hardware resources are properly handled during object creation.
    
2. **Delete copy and move operations.**
    
    If a component is composed of objects that interact with hardware and these objects are passed incorrectly, copies may be created. This means that any hardware-related effects will not be reflected in the wrapper component. To avoid such issues, we will explicitly disable copy and move operations for these classes, ensuring that each object maintains its intended ownership and references.
    
3. **Use namespaces to group related classes.**
    
    Each namespace will contain the component class along with all its additional classes and data types. This will also solve the problem of repeated data type names across different components (when they are all used in the same project), without the need to append awkward prefixes or suffixes to their names. It also provides a clear scope for each component and makes its related definitions easier to organize and maintain.
    
4. **Avoid dynamic memory when creating polymorphic collections.**
    
    If we want to implement polymorphic behavior, we need to make sure that we are not using heap allocation under the hood. This is particularly important in embedded systems, where memory resources are limited and dynamic allocation can introduce runtime overhead and less predictable memory usage. **Furthermore, avoiding the heap ensures we do not violate MISRA C/C++ guidelines regarding dynamic memory management.**
    

We will discuss each rule and the reasoning behind it separately in the following articles.
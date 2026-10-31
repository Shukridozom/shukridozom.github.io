# 8. Rule 4 - Avoid dynamic memory when creating polymorphic collections

If we want to implement polymorphic behavior, we need to make sure that we are not using heap allocation under the hood. This is particularly important in embedded systems, where memory resources are limited and dynamic allocation can introduce runtime overhead and less predictable memory usage. Furthermore, avoiding the heap ensures we do not violate MISRA C/C++ guidelines regarding dynamic memory management.

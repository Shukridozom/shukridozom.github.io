# 9. Rule 2 - Delete Copy and Move Operations

- Explicitly delete copy and move constructors and assignment operators.
- Practical example: An object composed of two limit switch objects is passed by value instead of by reference, resulting in a copy. When a limit switch is activated, the original limit switch object is updated, but the copied object retains its previous state.

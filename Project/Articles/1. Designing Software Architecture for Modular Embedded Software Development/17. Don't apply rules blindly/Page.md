# 17. Don't apply rules blindly

The architecture discussed in these articles introduces a set of guidelines for making embedded software development more modular. It encourages developing components independently and reusing them across different projects.

However, it does not act as a framework that enforces these rules or dictates where and how everything should be implemented. For example, if you need to implement functionality directly at the application level that interacts with the hardware, you can still do that. The architecture does not prevent you from bypassing the layers or restricting how you write your code.

You can still follow the architecture in your application while bypassing certain layers and accessing the hardware directly for specific critical units, if needed for any reason. Similarly, you can choose to use a component directly or, if necessary, implement its logic within the application itself rather than keeping it encapsulated in a separate component.
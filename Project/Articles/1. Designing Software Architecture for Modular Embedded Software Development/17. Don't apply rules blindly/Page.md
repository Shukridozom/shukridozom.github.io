# 6. Monitoring System Objects During Debugging

- Use a pointer to the singleton object to monitor system objects during debugging sessions.
- Avoid exposing objects through global variables, as accessing them may trigger their one-time initialization before the hardware is configured.

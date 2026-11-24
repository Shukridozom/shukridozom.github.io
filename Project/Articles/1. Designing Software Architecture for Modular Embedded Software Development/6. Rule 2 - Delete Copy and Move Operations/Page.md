# 6. Rule 2 - Delete Copy and Move Operations

## **Deleting the Copy Constructor**

Assume we want to create a `LinearActuator` component. This component will be consisting of two `LimitSwitch` objects and one `Motor` object.

Now, when we want to from any component from other components, the right way for doing that is by creating these objects first, then passing them by reference to the wrapper’s class constrcutor.

For example:

```cpp
// The LinearActuator Constructor:
LinearActuator::LinearActuator(LimitSwitch& ls1,
	LimitSwitch& ls2,
	Motor& motor) : 
	ls1(ls1),
	ls2(ls2),
	motor(motor)
	{}

	// Creating the objects:
LimitSwitch ls1(GPIOA_PIN11);
LimitSwitch ls2(GPIOA_PIN12);
Motor motor(CAN_INTERFACE_1);

LinearActuator linearActuator(ls1, ls2, motor);
```

Now, what will happen if we accidentally make the `LinearActuator` constructor receive parameters by value?

This will not result in any compilation error, but it will silently trigger the copy constructor for both `LimitSwitch` and `Motor` components. This means that new copies of these objects will be created inside the wrapper object.

As a result, if you use these objects in your application, their changes will not be reflected inside their corresponding wrapper objects.

```cpp
// The LinearActuator Constructor:
LinearActuator::LinearActuator(LimitSwitch ls1,
	LimitSwitch ls2,
	Motor motor) : 
	ls1(ls1),
	ls2(ls2),
	motor(motor)
	{}

LinearActuator::Loop()
{
	if(ls1.IsActive() || ls2.IsActive())
		motor.Stop();
		
	motor.Move();
}

// Creating the objects:
LimitSwitch ls1(GPIOA_PIN11);
LimitSwitch ls2(GPIOA_PIN12);
Motor motor(CAN_INTERFACE_1);

LinearActuator linearActuator(ls1, ls2, motor);

//Application logic:
ls1.Update();
ls2.Update();

linearActuator.Loop(); // Changes to ls1 and ls2 will not be reflected
                      // in the LinearActuator object.
```

To solve this problem, we will explicitly delete the copy constructor for all components

```cpp
// Inside Component classes:
LimitSwitch(const LimitSwitch&) = delete;
```

---

## **Deleting the Assignment Operators**

Now, let's consider another scenario.

Assume we have already created our `LinearActuator` object, which consists of two `LimitSwitch` objects and one `Motor` object.

During runtime, someone might create another `LimitSwitch` object connected to a different GPIO pin and attempt to assign it to one of the existing limit switches.

For example:

```cpp
// Creating another LimitSwitch object:
LimitSwitch newLs(GPIOA_PIN15);

// Replacing the original LimitSwitch:
linearActuator.ls1 = newLs;
```

This operation invokes the copy assignment operator of the `LimitSwitch` class.

If the assignment operator is available, the internal state and configuration of the original `ls1` object could be replaced with those of `newLs`.

As a result, the `LinearActuator` object will still hold a reference to the same `ls1` object, but that object may now be configured to use a different GPIO pin. This breaks the original hardware configuration and can lead to unexpected behavior.

The same problem can happen when using the move assignment operator:

```cpp
linearActuator.ls1 = std::move(newLs);
```

To prevent these situations, we explicitly delete both the copy and move assignment operators for all components:

```cpp
// Inside Components classes:
LimitSwitch& operator=(const LimitSwitch&) = delete;
LimitSwitch& operator=(LimitSwitch&&) = delete;
```

This ensures that existing components cannot be replaced or have their internal state overwritten through assignment operations.

---

## **Explicitly Deleting All Copy and Move Operations**

Combining the previous rules, we explicitly delete all four operations in every component. These declarations should be placed under the `public` access modifier so that any attempt to copy, move, or reassign a component from outside the class results in a compilation error.

```cpp
public:
    // Explicitly delete copy and move operations

    LimitSwitch(const LimitSwitch&) = delete;
    LimitSwitch& operator=(const LimitSwitch&) = delete;
    LimitSwitch(LimitSwitch&&) = delete;
    LimitSwitch& operator=(LimitSwitch&&) = delete;
```

This ensures that components cannot be copied, moved, or reassigned, preserving their identity and hardware configuration throughout the application lifecycle.

---

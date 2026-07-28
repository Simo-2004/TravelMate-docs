# 3.7 Media Storage

## Purpose

The Media Storage package obtains a photograph from the device and holds it in the application's private storage, yielding the reference by which it is thereafter found. It is the only package addressing the file system directly.

## Dependencies

| Depends on | For |
|------------|-----|
| The file system | Copying and holding the photograph |
| The selection library | Obtaining a photograph from the device gallery |
| The directory facility | Yielding the application's private directory |

The package depends on no other package of the system. It is addressed by Presentation, which reaches it directly for the reason recorded in [SDD 3.2](../../sdd/proposed-architecture/subsystem-decomposition).

## General constraints

| Constraint | Consequence for the interface |
|------------|-------------------------------|
| A photograph is held as a file, and only its reference is yielded | No operation accepts or returns image content. What the rest of the system holds is a reference, as specified in [1.1](../introduction/trade-offs). |
| Selection and storage are specified as separate classes | Storage computes from its arguments and is exercisable without a device; selection addresses the platform and is not. |
| A stored photograph is never replaced | Each is held under a name distinguishing it from those already held. |

The package declares no interface. Substitution is provided by its caller rather than here: a screen requiring a photograph accepts the operation as an optional parameter, as specified in [3.1](./presentation). An interface at this level would duplicate a seam already present at the only point from which the package is addressed.

## `ProfileImageStorage`

**Purpose.** Copies a photograph into the application's private storage and yields its reference.

**Dependencies.** The file system.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Store a photograph | The file to copy, and the private directory | The reference to the stored file | Creates the destination directory where absent, copies the file under a distinguishing name, and yields the reference to the copy |

**Constraints.**

The destination directory is **declared by the class** and is a subdirectory of the private directory supplied. The directory is created where absent, so that the first storage does not require a preceding provision.

The name under which a photograph is held **distinguishes it from those already held**, a photograph being stored in addition to those before it rather than in place of them. The reference yielded is that of the copy, never that of the file supplied, so that a subsequent alteration of the original does not alter what the system holds.

The extension of the file supplied is preserved, the stored file being read by the same means as the original.

The private directory is **supplied rather than resolved**. The class therefore computes from its arguments alone and is exercisable against an ordinary directory, the resolution of the private directory being the one part requiring a device.

## `ProfileImagePicker`

**Purpose.** Obtains a photograph from the device gallery and stores it, yielding its reference.

**Dependencies.** The selection library, the directory facility, and `ProfileImageStorage`.

| Operation | Requires | Returns | Behaviour |
|-----------|----------|---------|-----------|
| Select and store a photograph | — | The reference to the stored file, or null | Null where the Traveler declines to select. Otherwise resolves the private directory and delegates the copy. |

**Constraints.**

The class **holds no storage logic**. It obtains a file, resolves the private directory, and delegates to `ProfileImageStorage`. It is an adapter, and the separation confines the requirement of a device to a class holding no decision.

Dimensions and quality are constrained **at selection** rather than after it, by declared bounds applied to the file obtained. A photograph is therefore reduced before it is copied, and the reduced form is what the system holds.

A null result denotes that the Traveler declined to select. It does not denote a failure, and is distinguished from one by the caller: a screen receiving null retains the photograph previously held and reports nothing, as specified in [3.1](./presentation).

## Exceptions

No class of this package raises an exception of its own.

An exception raised by the file system or by the selection library — a file that cannot be read, a gallery that cannot be reached, a permission withheld — propagates to the caller unaltered. It is caught by the screen that invoked the operation, which reports it and retains the photograph previously held, satisfying [NFR-R.5](../../rad/proposed-system/non-functional/reliability).

This is the one package whose failures are answered at the interface rather than beneath it. A photograph that cannot be obtained leaves the surrounding task usable, the photograph being one part of a profile rather than a condition of composing one.

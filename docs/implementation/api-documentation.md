# 4.6 API Code Documentation

The reference generated from the documentation comments of the source. It is produced by a tool rather than written, so that it cannot fall out of step with the code it describes.

## Generation

```bash
dart doc
```

The command reads the documentation comments described in [4.2](./coding-standards) and writes a set of linked pages to `doc/api`. It is run again whenever the public interface changes.

## Contents

The reference lists every public class, its operations and its attributes, together with the comment written for each. Private members do not appear, matching the rule of [ODD 1.2](../odd/introduction/interface-guidelines) that only public elements form the contract.

Links between pages are produced from the code itself, so a class can be followed to the interfaces it depends on without searching the source.

## Relation to the specification

The generated reference and [ODD 3](../odd/class-interfaces/) describe the same classes for different purposes, and neither replaces the other.

| Document | States |
|----------|--------|
| [ODD 3](../odd/class-interfaces/) | What the source is required to contain, and why |
| Generated reference | What the source does contain, with exact names and types |

The ODD is the contract. The generated reference is the current form of the code, useful while writing against it. A difference between them is a defect in the source, not in the ODD.

## Publication

The generated pages are not kept in the code repository, which ignores the output directory: they can be produced again from the source at any time, so storing them would only risk holding an old copy.

They are published with this documentation instead, where they are served as part of the site and reachable from the sidebar.

[API Reference](/api/index.html)

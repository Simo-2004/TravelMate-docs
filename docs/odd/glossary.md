# 4. Glossary

The terms introduced by this document and not defined elsewhere.

Application-domain terms are defined in the [RAD glossary](../rad/glossary). Architecture terms — subsystem, layer, service, coupling, cohesion, store fallback, seeding, and the components and patterns of the solution domain — are defined in the [SDD glossary](../sdd/glossary). The general terminology of object design — class, interface, operation, attribute, visibility, signature, precondition, postcondition, invariant — is defined in [1.3](./introduction/definitions). None is repeated here.

## Terms of the specification

| Term | Meaning |
|------|---------|
| **Concrete class** | A class providing the operations a declared interface requires. Named after the mechanism it addresses, as fixed by [1.2](./introduction/interface-guidelines). |
| **Interface realization** | The relation between an interface and the concrete class providing its operations. Stated in [3. Class Interfaces](./class-interfaces/) for each package declaring an interface. |
| **Substitutable operation** | An operation a class accepts as an optional parameter, applying the standard one where none is supplied. Permits the class to be exercised without the facility the operation addresses. |
| **Fault** | An unacceptable submitted value, reported as a result rather than by an exception. Distinct from a failure: a fault is a foreseen outcome of an operation that completed. |
| **Documented default** | A fixed value of a class, returned where nothing is held and where what is held cannot be interpreted. Being a value of the class rather than one composed by a caller, every caller obtains the same one. |

## Terms of the specified design

| Term | Meaning |
|------|---------|
| **Publication** | The act by which a class owning state makes a change to it known, without knowledge of what observes it. Performed per value, per key, or not at all, as specified in [3.2](./class-interfaces/application-state). |
| **Pure operation** | An operation computing its result from its arguments alone, holding no state and addressing no storage. The form of every operation of [3.3](./class-interfaces/domain-logic). |
| **Correspondence** | The degree to which an entry answers a query, determining the order of ranked results. Assessed per field, a correspondence at the beginning of a value contributing more than one within it. |
| **Single-record table** | A table constrained to hold at most one record, each insertion supplying a fixed identifier and replacing any record already bearing it. |
| **Built-in catalogue** | Content the system supplies, declared as fixed values of a class. Written to storage on a first run and read from storage thereafter. |
| **Encrypted form** | The result of an encryption, comprising the nonce applied joined to the encrypted value and its authentication tag. Decryption requires the form and the key alone. |

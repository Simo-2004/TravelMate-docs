# 3.6 Security

> **Status: placeholder.**

To be written: the classes of the Security package — the cipher, the credential-hashing class and the value it returns, the key provider, and the key-store interface this package declares together with its implementation over the operating system's facility.

This is the package in which exceptions carry the most weight, since a decryption that fails is the mechanism by which alteration is detected. Each entry is to state the conditions under which its operations raise rather than return, consistent with [SDD 3.5](../../sdd/proposed-architecture/access-control) and with the limitation recorded in [SDD 3.7](../../sdd/proposed-architecture/boundary-conditions).

Source: `core/security/`.

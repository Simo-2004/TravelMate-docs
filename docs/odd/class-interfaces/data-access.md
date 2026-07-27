# 3.5 Data Access

> **Status: placeholder.**

To be written: the classes of the Data Access package — the data-access interfaces for the profile, the account, the conversations and the trip catalogue, their implementations over the database engine, and the class owning the shared connection.

Each interface is to be specified before its implementation, since it is the interface that Persistence depends on. Every operation is expressed in terms of rows rather than domain objects, and the entries are to preserve that boundary.

Source: `core/database/`.

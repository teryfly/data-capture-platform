# ktrtree Module

Manages the ETL transformation tree: a navigable hierarchy of Kettle/Pentaho jobs where
folder nodes organise the tree and leaf nodes store the actual `.ktr` XML content.

## Data Model

Two tables, two entities:

| Entity | Table | Role |
|---|---|---|
| `Tree` | `tb_tree` | Node in the hierarchy (folder or leaf) |
| `KettleXML` | `tb_ktr_xml` | Kettle XML payload attached to a leaf node |

`Tree` fields of note:
- `pid` — parent node id; root nodes have a null/empty pid
- `nodeType` — `"1"` = folder/category, `"2"` = leaf/table (drives icon selection)
- `treeType` — discriminator that scopes a tree (allows multiple independent trees)
- `serialNum` — display order within a parent; auto-assigned as max(serialNum)+1

`KettleXML` links back via `treeId` (FK to `Tree.id`). The `xml` column is `LONGVARCHAR`
(SQL Server `text`/`nvarchar(max)`); always use the `ResultMapWithBLOBs` result map when
the XML content is needed — `BaseResultMap` excludes it.

## API Surface

`TreeController` — base path `/tree`:
- `POST /tree/insertNode` — add a node; service enforces no duplicate names under same parent
- `POST /tree/updateNode` — rename/reparent a node (status cannot be updated this way)
- `GET  /tree/{id}` — fetch a single node
- `DELETE /tree/{id}` — soft-delete node (sets `status=0`); does NOT cascade to children or KettleXML rows
- `GET  /tree/load` — full flat list of active nodes; client builds the zTree hierarchy
- `POST /tree/loadPath` — accepts a `Set<String>` of node ids, returns `Set<TreePath>` with absolute paths and leaf XML

`KettleXMLController` — base path `/tree/leaf`:
- `POST /tree/leaf/save` — upsert: inserts if treeId is new, updates XML if treeId already exists
- `GET  /tree/leaf/{treeId}` — fetch XML by tree node id (not KettleXML's own id)

## XML Mapper Location

Mappers live outside this package tree:
```
src/main/resources/mybatis-mappers/
    KettleXMLMapper.xml
    TreeMapper.xml
```

## Domain Conventions

- All ids are `String` (NVARCHAR), not auto-increment integers — callers must supply UUIDs.
- Soft deletes only: `status=1` is active, `status=0` is deleted. All queries filter `status=1`.
- `loadTree` returns the entire flat list at once; tree assembly is done client-side via zTree.
- Sibling uniqueness (`getSameNameCount`) is enforced by `treeType` + `pid` + `nodeName`.

## Gotchas

- Deleting a `Tree` node via `DELETE /tree/{id}` only soft-deletes that node — child nodes
  and associated `KettleXML` rows are NOT automatically soft-deleted; callers must walk
  children and delete leaf content separately.
- `KettleXMLController.getContent` returns the raw `KettleXML` object (not a `SuccessTip`
  wrapper) on success; only the 400 error path uses a wrapper — keep that asymmetry in mind
  when writing client code.
- The `updateKettleXML` mapper statement exists but is commented out at the controller level;
  the `save` endpoint always goes through `insertKettleXML` which internally checks
  `getSameTreeIdCount` to decide insert vs update.
- `loadPath` (`POST /tree/loadPath`) returns a `Set`, so duplicate `TreePath` objects are
  silently de-duplicated — `TreePath` must have correct `equals`/`hashCode` for this to work.

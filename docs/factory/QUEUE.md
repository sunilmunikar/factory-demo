# Factory queue snapshot

The operational queue lives in GitHub issue labels. This file is a reviewable snapshot
written by `factory-triage` and reported by `/factory`; implementation routines query
GitHub directly.

An unmerged update to this file must never block a later routine from seeing work. Durable
run evidence lives in one file per run under `docs/factory/runs/`.

**Dispositions**

| Disposition | Next stage |
|---|---|
| `ready-to-implement` | factory-implement picks it up |
| `ready-to-spec` | human runs factory-spec |
| `needs-info` | parked, question is on the issue |
| `wait-to-implement` | parked, blocker named below |
| `awaiting-review` | PR open, human owns it |
| `done` | merged by a human |

The corresponding live labels use the `factory:` prefix, for example
`factory:ready-to-implement` and `factory:awaiting-review`. The live issue also carries a
`factory-handoff:v1` comment with the fields needed by implementation.

---

Snapshot as of triage run `2026-11-17T181653Z-triage-all`.

## FQ-2: slugify drops letters that have no Unicode decomposition (ß, Æ, Ł)
- disposition: ready-to-implement
- source: https://github.com/sunilmunikar/factory-demo/issues/2
- last_triaged: 2026-11-17
- repro: confirmed (`slugify("Straße")` returns `"stra-e"`, `"Æsir saga"` returns `"sir-saga"`, `"Łódź"` returns `"odz"`)
- files_expected: src/slugify.ts, test/slugify-transliteration.test.ts
- load_bearing: false
- gate_level: full
- done_when: a new `test/slugify-transliteration.test.ts` asserts `Straße`→`strasse`, `Æsir saga`→`aesir-saga`, `Łódź`→`lodz`; it fails on `main` and passes after the change; `test/slugify.test.ts` is unmodified; `gates.sh full` reports GREEN
- confidence: high
- notes: tests must go in a new file because `TESTS_ARE_LOAD_BEARING` forbids editing `test/slugify.test.ts` in an unattended run.

## FQ-3: Add a maxLength option to slugify
- disposition: ready-to-spec
- source: https://github.com/sunilmunikar/factory-demo/issues/3
- last_triaged: 2026-11-17
- repro: not-attempted (feature request)
- files_expected: src/slugify.ts, src/index.ts, new test file
- load_bearing: false
- gate_level: full
- done_when: to be decided in factory-spec
- confidence: high
- notes: NEEDS_SPEC on two counts: user-visible feature and an exported signature change. Open questions are on the issue.

## FQ-4: Add a README with usage examples
- disposition: ready-to-spec
- source: https://github.com/sunilmunikar/factory-demo/issues/4
- last_triaged: 2026-11-17
- repro: not-attempted (documentation request)
- files_expected: README.md
- load_bearing: false
- gate_level: fast
- done_when: to be decided; likely "README.md exists, its examples match real `slugify` output, `gates.sh fast` is GREEN"
- confidence: medium
- notes: charter gap. AUTOMATABLE covers README "corrections", not new documentation. Broaden the charter and this re-triages as ready-to-implement.

---

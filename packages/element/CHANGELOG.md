# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.1.3](https://github.com/the-nexim/nanolib/compare/@nexim/element@1.1.2...@nexim/element@1.1.3) (2025-01-09)

**Note:** Version bump only for package @nexim/element

## [1.1.2](https://github.com/the-nexim/nanolib/compare/@nexim/element@1.1.1...@nexim/element@1.1.2) (2025-01-06)

### Code Refactoring

* use new @nexim/typescript-config api ([6d656b4](https://github.com/the-nexim/nanolib/commit/6d656b483f27d556e59bdcec1220511c5c819cc8)) by @njfamirm

## [1.1.1](https://github.com/the-nexim/nanolib/compare/@nexim/element@1.1.0...@nexim/element@1.1.1) (2025-01-05)

### Bug Fixes

* **element:** build for browser platform ([02b4573](https://github.com/the-nexim/nanolib/commit/02b45737e00d22d56c729bc4e5b80aa72edaf007)) by @njfamirm

## [1.1.0](https://github.com/the-nexim/nanolib/compare/@nexim/element@1.0.6...@nexim/element@1.1.0) (2024-12-24)

### Features

* **service-worker:** add service worker utilities and logging support ([#18](https://github.com/the-nexim/nanolib/issues/18)) ([d428086](https://github.com/the-nexim/nanolib/commit/d428086dd98fbb5dfd077d14de4de8dd29ed78dc)) by @

### Code Refactoring

* migrate scripts to use wireit for improved build process ([#23](https://github.com/the-nexim/nanolib/issues/23)) ([3376d29](https://github.com/the-nexim/nanolib/commit/3376d2944332f3f28a91eba6b63a8fa981faf774)) by @arashagp

## [1.0.6](https://github.com/the-nexim/nanolib/compare/@nexim/element@1.0.5...@nexim/element@1.0.6) (2024-12-10)

**Note:** Version bump only for package @nexim/element

## [1.0.5](https://github.com/the-nexim/nanolib/compare/@nexim/element@1.0.4...@nexim/element@1.0.5) (2024-12-07)

### Bug Fixes

* **element:** deps ([1fa8618](https://github.com/the-nexim/nanolib/commit/1fa8618cd45978361adfd7be2dcce5a50c530dc6)) by @njfamirm

## [1.0.4](https://github.com/the-nexim/nanolib/compare/@nexim/element@1.0.3...@nexim/element@1.0.4) (2024-12-07)

### Bug Fixes

* **element/logging:** use interface for mixin type ([24de303](https://github.com/the-nexim/nanolib/commit/24de30357ff0690cd200c7171b87a56fc299ddef)) by @njfamirm
* **element:** handle typescript limitation about protected mixin property ([ad2adea](https://github.com/the-nexim/nanolib/commit/ad2adeac619dc355834878ccdd96aa933802d8c1)) by @njfamirm

### Code Refactoring

* **element/light-dom:** remove additional type set ([3011ba4](https://github.com/the-nexim/nanolib/commit/3011ba41fac47b80064bc62fbbbd2f1885abd308)) by @njfamirm
* **element:** use alwatr's class type and remove constructor type ([b3b5e91](https://github.com/the-nexim/nanolib/commit/b3b5e9147a14435c44a4458bbfbaefef9fa2267a)) by @njfamirm

### Miscellaneous Chores

* **element:** docuemnt typo ([0172cd7](https://github.com/the-nexim/nanolib/commit/0172cd77d5a04b4c32c626334c9ea8d4cada07db)) by @njfamirm
* **element:** move lit to dev dependency ([ae226ee](https://github.com/the-nexim/nanolib/commit/ae226eed51bde38b272e1977907dc83c92645481)) by @njfamirm

## [1.0.3](https://github.com/the-nexim/nanolib/compare/@nexim/element@1.0.2...@nexim/element@1.0.3) (2024-12-07)

### Bug Fixes

* **element:** add lit to deps ([228a64c](https://github.com/the-nexim/nanolib/commit/228a64ca718ffc62ecff873841a8f6f3636806f2)) by @

## [1.0.2](https://github.com/the-nexim/nanolib/compare/@nexim/element@1.0.1...@nexim/element@1.0.2) (2024-12-07)

### Bug Fixes

* **element:** default mixin type ([#12](https://github.com/the-nexim/nanolib/issues/12)) ([ec0966d](https://github.com/the-nexim/nanolib/commit/ec0966d28e4172eec4879bbc273c1b9fd50ab800)) by @arashagp

## [1.0.1](https://github.com/the-nexim/nanolib/compare/@nexim/element@1.0.0...@nexim/element@1.0.1) (2024-12-07)

### Bug Fixes

* **element/logging-mixin:** remove extra field in type and make some part private ([9774abb](https://github.com/the-nexim/nanolib/commit/9774abbfbbba8ed539138d8f50127933cdcc791a)) by @njfamirm

### Code Refactoring

* **element/light-dom:** move style utils to class as static property ([7532dc7](https://github.com/the-nexim/nanolib/commit/7532dc738b8d8e66c9ee12c75485dd30ca32a897)) by @njfamirm

### Miscellaneous Chores

* **element/type:** move to root ([433a1c0](https://github.com/the-nexim/nanolib/commit/433a1c057edc8ae797f75db4bcb3d1c846a033bc)) by @njfamirm
* **element:** exclude test files from package distribution ([d308a17](https://github.com/the-nexim/nanolib/commit/d308a1724e12b1a5738352f5b8cd9bae0c7e225a)) by @njfamirm
* **element:** move lit to the devDependency because use as type ([fd5f879](https://github.com/the-nexim/nanolib/commit/fd5f879d964b710ee76b8f7a59375d7f708991d0)) by @njfamirm
* **element:** remove base element ([94047d4](https://github.com/the-nexim/nanolib/commit/94047d45e15df99d03605b82a4708cc735fe99ed)) by @njfamirm

## 1.0.0 (2024-12-04)

### Features

* **element:** base package ([c6a2329](https://github.com/the-nexim/nanolib/commit/c6a23295b78b5fdde7f7535a5f4f5ec304857c98)) by @njfamirm

### Miscellaneous Chores

* customize based nexim ([c389d8c](https://github.com/the-nexim/nanolib/commit/c389d8c404d48f6d7fd5f03be2de0b23f313e027)) by @njfamirm
* **element:** add description for package.json ([#10](https://github.com/the-nexim/nanolib/issues/10)) ([925e9b6](https://github.com/the-nexim/nanolib/commit/925e9b6cc0067fdf61620419e3c8305da303674e)) by @arashagp
* reset versions ([31a80f6](https://github.com/the-nexim/nanolib/commit/31a80f6df1e12aa3491eda0951450ee0cd147328)) by @njfamirm

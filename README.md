<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [@poppinss/chokidar-ts](#poppinsschokidar-ts)
  - [Change log](#change-log)
  - [Contributing](#contributing)
  - [Authors & License](#authors--license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# @poppinss/chokidar-ts

[![circleci-image]][circleci-url]
[![npm-image]][npm-url]
![](https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript)


flow
```
Is typescript file
  -> must end with `.ts` or `.d.ts`
  YES
    -> Is source file
      -> is part of includes
      -> not part of excludes
    YES
      -> compile file using typescript
    NO
      -> NOOP
  NO
    -> Proxy event to consumer and let them decide how to handle


Optimizations
  -> first match for absolute paths
  -> then look for pattern match
  -> 
```

## Change log

The change log can be found in the [CHANGELOG.md](CHANGELOG.md) file.

## Contributing

Everyone is welcome to contribute. Please take a moment to review the [contributing guidelines](CONTRIBUTING.md)

## Authors & License
[Harminder virk](https://github.com/Harminder virk) and [contributors](https://github.com/null/null/graphs/contributors).

MIT License, see the included [MIT](LICENSE.md) file.

[circleci-image]: https://img.shields.io/circleci/project/github/null/null/master.svg?style=for-the-badge&logo=circleci
[circleci-url]: https://circleci.com/gh/null/null "circleci"

[npm-image]: https://img.shields.io/npm/v/@poppinss/chokidar-ts.svg?style=for-the-badge&logo=npm
[npm-url]: https://npmjs.org/package/@poppinss/chokidar-ts "npm"

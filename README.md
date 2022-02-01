# ☑️ Config Checker

<!--Badges-->

 [![Package Quality](https://packagequality.com/shield/configchecker.svg)](https://packagequality.com/#?package=configchecker)
 [![License](https://img.shields.io/github/license/hejny/configchecker.svg?style=flat)](https://raw.githubusercontent.com/hejny/configchecker/master/LICENSE)
 [![NPM Version](https://badge.fury.io/js/@hejny%2Fconfigchecker.svg)](https://www.npmjs.com/package/@hejny/configchecker)
 [![Known Vulnerabilities](https://snyk.io/test/github/hejny/configchecker/badge.svg)](https://snyk.io/test/github/hejny/configchecker)
 [![Issues](https://img.shields.io/github/issues/hejny/configchecker.svg?style=flat)](https://github.com/hejny/configchecker/issues)

<!--/Badges-->

A very simple and effective way to check config, before it's used in runtime with nice fluent API. Here is the full **[documentation](https://hejny.github.io/configchecker/)**.

## Install

Install from [NPM](https://www.npmjs.com/package/configchecker)

```bash
npm i configchecker
```

## 💡 Motivation

When you use some ENV value do you really know what it contains or if it is really defined?

```typescript
export const { TESTING_MAIL } = process.env;
```

This will be OK until your server tries to send some email. Maybe it drops the whole server or just don't do nothing and you will be figuring out why the hell server is working but it doesn't send any emails.

I have this problem many many times.

And because I am a TypeScript lover it is fully using all advantages of static typing.

## Usage

I load the config from some environment Object:

```typescript
import { ConfigChecker } from 'configchecker';

const config = ConfigChecker.from(process.env);
```

And then I can read variabiles from it:

```typescript
config.get('TESTING_MAIL').value;
```

I can enforce them:

```typescript
config.get('TESTING_MAIL').required().value;
```

I can convert them to certain types:

```typescript
config.get('...').number().value;
config.get('...').boolean().value;
config.get('...').json().value;
config.get('...').list().value;
config.get('...').date().value;
config.get('...').url().value;
```

### Full sample 1

```typescript
import { ConfigChecker } from 'configchecker';
const config = ConfigChecker.from(process.env);

export const PORT = config
    .get('PORT')
    .number()
    .required().value;
export const TESTING_MAIL = config.get('TESTING_MAIL').value;
```

### Full sample 2

This sample is working same like sample 1 but unfortunately it is not using full TypeScript potential.

```typescript
import { ConfigChecker } from 'configchecker';
const config = ConfigChecker.from(process.env);

export default {
    ...config
        .get('PORT')
        .number()
        .required().object,
    ...config.get('TESTING_MAIL').object,
};
```

<!--
TODO: To all projects:
+ donation address


# Contributing

I am open to your pull requests, feedback, suggestions, and donations. Contact to me is on my [personal page](https://www.pavolhejny.com)
-->

## Authors

-   [Pavol Hejný](https://github.com/hejny)
-   [David Pohan](https://github.com/pohy)

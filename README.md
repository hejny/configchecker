# Config Checker

A very simple and effective way to check config, before it's used in runtime with nice fluent API.

# Install

Install from [NPM](https://www.npmjs.com/package/configchecker)

```bash
npm i configchecker
```

# Story

When you use some ENV value do you really know what it contains or if it is really defined?

```typescript
export const { TESTING_MAIL } = process.env;
```

This will be OK until your server tryis to send some email. Maybe it drop whole server or just dont do nothing and you will be figuring out why the hell server is working but it dont send any emails.

I have this problem many many times.

And because I am a TypeScript lover it is fully using all advantages of static typing.

# Usage


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

## Full sample 1

```typescript
import { ConfigChecker } from 'configchecker';
const config = ConfigChecker.from(process.env);

export const PORT = config.get('PORT').number().required().value;
export const TESTING_MAIL = config.get('TESTING_MAIL').value;
```

## Full sample 2

This sample is working same as sample 1 but unfortunatelly it is not using full TypeScript potencial.

```typescript
import { ConfigChecker } from 'configchecker';
const config = ConfigChecker.from(process.env);

export default {
    ...config.get('PORT').number().required().object,
    ...config.get('TESTING_MAIL').object
}
```


# Contributing

I am opened to your pull requests, feedback, suggestions and donations :) . Contact to me are on my [personal page](https://www.pavolhejny.com)




# Authors

- [Pavol Hejný](https://github.com/hejny)
- [David Pohan](https://github.com/pohy)


# Thanks

To boilerplate was used [my-awesome-greeter](https://github.com/caki0915/my-awesome-greeter).

# caretaker
Clean parameters and define defaults.

[![Build Status](https://secure.travis-ci.org/twentyrogersc/caretaker.png)](http://travis-ci.org/twentyrogersc/caretaker)

## Installation

```javascript
npm install caretaker
```

```javascript
var caretaker = require('caretaker')
var cleaned = caretaker.clean(valid, params)
```

## Options

Valid is an object containing keys with an options object. Each parameter is parsed by either ```opt.type``` field or ```typeof opt.default``` (supports string, number, boolean, or 'default'). If a parameter is undefined, ```opt.default``` will be used, otherwise not included in the cleaned object. Also available are ```opt.required``` and ```opt.match``` for strings.

The ```caretaker.clean()``` function returns an cleaned object with a status. If ```cleaned.status === 'ok'```, ```cleaned.params``` contains the resulting parameters. Otherwise ```cleaned.errors``` will contain errors genereated by either ```opts.required```, ```opts.match``` or a non-parsing value.

```javascript
var valid = {
  num: { default: 10 },
  str: { type: 'string', match: /^([a-z]{1,})$/ },
  boo: { type: 'boolean', required: true }
}

var cleaned = caretaker.clean(valid, { str: 'a', boo: 1 })
// cleaned = { status: 'ok', params: { num: 10, str: 'a', boo: true } }

cleaned = caretaker.clean(valid, { str: '9' })
// cleaned = { status: 'error', errors: { str: 'is not allowed', boo: 'is required' } }
```
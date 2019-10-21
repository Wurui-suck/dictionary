function defaultToString(item) {
    if (item === null) {
        return 'null'
    }
    if (item === undefined) {
        return 'undefined'
    }
    if (typeof item === 'string' || item instanceof String) {
        return `${item}`
    }
    else {
        return item.toString()
    }
}

class ValuePair {
    constructor(key, value) {
        this.key = key
        this.value = value
    }
    toString() {
        return `[#${this.key}:${this.value}]`
    }
}

class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn
        this.table = {}
    }
    hasKey(key) {
        return this.table[this.toStrFn(key)] !== null
    }
    set(key, value) {
        if (key !== null && value !== null) {
            this.table[this.toStrFn(key)] = new ValuePair(key, value)
            return true
        }
        return false
    }
    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)]
            return true
        }
        return false
    }
    get(key) {
        const valuePair = this.table[this.toStrFn(key)]
        return valuePair === undefined ? undefined : valuePair.value
    }
    keyValues() {
        return Object.values(this.table)
    }
    keys() {
        return this.keyValues().map(items => {
            return items.key
        })
    }
    values() {
        return this.keyValues().map(items => items.value)
    }
    forEach(fn) {
        const keyValues = this.keyValues()
        for (let i = 0; i < keyValues.length; i++) {
            fn(keyValues[i].key, keyValues[i].value)
        }
    }
    size() {
        return Object.keys(this.table).length
    }
    isEmpty() {
        return this.size() === 0
    }
    clear() {
        this.table = {}
    }
}

let dictionary = new Dictionary
dictionary.set('age', 18)
dictionary.set('name', 'zejia')


console.log(dictionary.get('name'))
console.log(dictionary.size())
console.log(dictionary.keyValues())



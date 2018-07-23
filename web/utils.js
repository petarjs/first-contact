class Storage {
    static get (key) {
        return JSON.parse(localStorage[key] || 'null')
    }

    static set (key, value) {
        localStorage[key] = JSON.stringify(value)
    }
}

function getUser(publicAddress) {
    return Storage.get(publicAddress)
}

function saveUser(user) {
    Storage.set(user.publicAddress, user)
}

function isUserLoggedIn (publicAddress) {
    return getUser(publicAddress) !== null
}

class InfoMessage {
    constructor (selector) {
        this.element = document.querySelector(selector)
        this.timeout = 3000
    }

    clear () {
        this.element.innerHTML = ''
    }

    message (type, message) {
        return `<div class="alert alert-${type}">${message}</div>`
    }

    success (message) {
        this.element.innerHTML = this.message('success', message)
        setTimeout(() => this.clear(), this.timeout)
    }

    error (message) {
        this.element.innerHTML = this.message('error', message)
        setTimeout(() => this.clear(), this.timeout)
    }

    info (message) {
        this.element.innerHTML = this.message('info', message)
        setTimeout(() => this.clear(), this.timeout)
    }
    
    warning (message) {
        this.element.innerHTML = this.message('warning', message)
        setTimeout(() => this.clear(), this.timeout)
    }
}

class Loader {
    static createLoader() {
        let loader = document.createElement('span')
        loader.classList.add('loading')
        return loader
    }

    static start (el) {
        let element

        if (typeof el === 'string') {
            element = document.querySelector(selector)
        } else {
            element = el
        }

        element.append(this.createLoader())
    }

    static stop (el) {
        let loader

        if (typeof el === 'string') {
            loader = document.querySelector(`${selector} .loading`)
        } else {
            loader = el.querySelector('.loading')
        }

        loader.remove()
    }
}

function cleanBytes32String (text) {
    return text.replace(/[\x00-\x1F\x7F-\x9F]/g, '')
}